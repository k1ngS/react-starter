import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

/**
 * Sign up a new user by processing the registration details.
 * @param req - The request object containing the registration details in the body.
 * @param res - The response object used to send back the desired HTTP response.
 */
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    if (!email || !password || !name) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({ 
      success: true, 
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    })

    if(!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    
    await sendWelcomeEmail(user.email, user.name);

    res.json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    console.error("Error verifying email: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Handles the login route.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the login route.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.error("Error logging in: ", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Handles the logout route for the application.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the logout route.
 */
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}