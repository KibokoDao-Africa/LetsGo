// pages/api/users.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../Database/Models/Users";
import sgMail from "@sendgrid/mail";
import { getUserFromToken } from "../../middleware/auth";
import { generateHumanReadableString } from "../../middleware/generateHumanReadableString";
import dotenv from 'dotenv';
dotenv.config();

const sengrid_config = process.env.SENDGRID_API_KEY || "SG.0Z9Z3ZQ1QZ"

sgMail.setApiKey(sengrid_config);

export default async function handler(req:any, res:any) {
  if (req.method === "POST" && req.body.action === "register") {
    try {
      let { email, password, walletAddress } = req.body;

      // Check if the user is already registered by email
      const existingUserByEmail = await User.findOne({ email });

      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      // Check if the user is already registered by walletAddress
      const existingUserByWallet = await User.findOne({ walletAddress });

      if (existingUserByWallet) {
        return res
          .status(400)
          .json({ message: "Wallet address is already registered" });
      }

      // Hash the password or use the walletAddress as the password
      let hashedPassword;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      } else if (walletAddress) {
        // Use walletAddress as the password
        hashedPassword = walletAddress;
      } else {
        return res
          .status(400)
          .json({
            message: "Either email and password or walletAddress is required",
          });
      }

      // Generate random values for firstName, lastName, and dob if not provided
      const firstName = req.body.firstName || generateHumanReadableString(5); // Change default values as needed
      const lastName = req.body.lastName || generateHumanReadableString(6);
      if (!email) {
        email = generateHumanReadableString(10) + "@gmail.com";
      }
      const dob = req.body.dob || new Date(1990, 0, 15); // Default date of birth

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dob,
        walletAddress,
      });

      await newUser.save();

      // You can also generate and return a JWT token for authentication if needed
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
      });

      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    } catch (error) {
      console.error("Failed to register user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  } else if (req.method === "POST" && req.body.action === "login") {
    try {
      const { email, password, walletAddress } = req.body;

      let user;

      // Check if the user provided an email or walletAddress
      if (email) {
        user = await User.findOne({ email });
      } else if (walletAddress) {
        user = await User.findOne({ walletAddress });
      } else {
        return res
          .status(400)
          .json({ message: "Email or walletAddress is required" });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // If a password is provided, compare it with the hashed password in the database
      if (password) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }

      // Generate a JWT token upon successful login
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
      });

      // Return the user details along with the token
      res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.error("Failed to login user:", error);
      res.status(500).json({ message: "Failed to login user" });
    }
  } else if (req.method === "POST" && req.body.action === "add-wallet-address") {
    try {
      // Check if the user is authenticated
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await getUserFromToken(token);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid token", accessToken: token });
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Get the wallet address from the request body
      const { walletAddress } = req.body;

      // Update the user's profile with the wallet address
      user.walletAddress = walletAddress;
      await user.save();

      res
        .status(200)
        .json({ message: "Wallet address added successfully", user });
    } catch (error) {
      console.error("Failed to add wallet address:", error);
      res.status(500).json({ message: "Failed to add wallet address" });
    }
  } else if (req.method === "POST" && req.body.action === "request-reset-code") {
    try {
      const { email } = req.body;

      // Find the user by their email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a 4-digit random code
      const resetCode = Math.floor(1000 + Math.random() * 9000);

      // Save the reset code and its expiration time in the user document
      user.resetCode = resetCode;
      user.resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      await user.save();

      // Send the reset code to the user's email using SendGrid
      const msg = {
        to: user.email,
        from: "collinskoechck34@gmail.com", // Replace with your email address
        subject: "Password Reset Code",
        text: `Your password reset code is: ${resetCode}`,
      };

      await sgMail.send(msg);

      res.status(200).json({ message: "Reset code sent successfully" });
    } catch (error) {
      console.error("Failed to request reset code:", error);
      res.status(500).json({ message: "Failed to request reset code" });
    }
  } else if (req.method === "POST" && req.body.action === "reset-password") {
    try {
      const { email, resetCode, newPassword, confirmPassword } = req.body;

      // Find the user by their email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the reset code is valid and not expired
      if (
        user.resetCode !== resetCode ||
        (user.resetCodeExpires && user.resetCodeExpires < new Date())
      ) {
        return res.status(400).json({ message: "Invalid or expired reset code" });
      }

      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the new password and update it in the database
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;

      // Clear the reset code and its expiration time
      user.resetCode = undefined;
      user.resetCodeExpires = undefined;

      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Failed to reset password:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  } else if (req.method === "PUT" && req.body.action === "update-details") {
    try {
      // Check if the user is authenticated
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await getUserFromToken(token);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid token", accessToken: token });
      }

      // Update user details based on the request data
      const { firstName, lastName, email, dob } = req.body;

      if (firstName) {
        user.firstName = firstName;
      }

      if (lastName) {
        user.lastName = lastName;
      }

      if (email) {
        user.email = email;
      }

      if (dob) {
        user.dob = dob;
      }

      // Save the updated user details to the database
      await user.save();

      res
        .status(200)
        .json({ message: "User details updated successfully", user });
    } catch (error) {
      console.error("Failed to update user details:", error);
      res.status(500).json({ message: "Failed to update user details" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
