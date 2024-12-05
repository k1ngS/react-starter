import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

/**
 * Handles the login route.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the login route.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  res.send("login route");
}

/**
 * Handles the logout route for the application.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the logout route.
 */
export const logout = async (req, res) => {
  res.send("logout route");
}