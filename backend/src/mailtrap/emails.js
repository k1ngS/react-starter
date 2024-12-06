import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification"
    })

    console.log(`Email sent successfully: ${response}`);
  } catch (err) {
    console.error(`Error sending verification email: ${err.message}`);
    throw new Error(`Error sending verification email: ${err.message}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "54194060-c8b4-4608-b639-3399b3b196de",
      template_variables: {
        "company_info_name": "React Starter Template",
        "name": name
      }
    })
    
    console.log(`Welcome email sent successfully: ${response}`);
  } catch (error) {
    console.error(`Error sending welcome email: ${error.message}`);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
}