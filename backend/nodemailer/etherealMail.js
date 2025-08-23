import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "../mailtrap/emailTemplates.js";

export const sendVerificationEmailEthereal = async (
  email,
  verificationToken
) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lon47@ethereal.email",
        pass: "vNhY5gmDBZ6dkYTwBz",
      },
    });

    const response = await transporter.sendMail({
      from: "Vasu, <Vasu@ethereal.email>",
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmailEthereal = async (email, name) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lon47@ethereal.email",
        pass: "vNhY5gmDBZ6dkYTwBz",
      },
    });

    const response = await transporter.sendMail({
      from: "Vasu, <Vasu@ethereal.email>",
      to: email,
      subject: "Welcome to our app",
      html: WELCOME_EMAIL_TEMPLATE.replace(
        "{userName}",
        name
      ),
      category: "Welcome Email",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmailEthereal = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lon47@ethereal.email",
        pass: "vNhY5gmDBZ6dkYTwBz",
      },
    });

    const response = await transporter.sendMail({
      from: "Vasu, <Vasu@ethereal.email>",
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmailEthereal = async (email) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lon47@ethereal.email",
        pass: "vNhY5gmDBZ6dkYTwBz",
      },
    });

    const response = await transporter.sendMail({
      from: "Vasu, <Vasu@ethereal.email>",
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset successfully", response);
  } catch (error) {

    console.error(`Error reseting password`, error);

    throw new Error(`Error reseting password: ${error}`);
  }
};