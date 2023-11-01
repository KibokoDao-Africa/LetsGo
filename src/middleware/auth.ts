import jwt from "jsonwebtoken";
import User from "../Database/Models/Users"; 


const secret:any  = process.env.JWT_SECRET;
// Middleware to verify the JWT token and attach user details to the request
export async function getUserFromToken(authHeader: string | undefined): Promise<any | null> {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null; // Invalid or missing token
    }
  
    // Extract the token without the "Bearer" prefix
    const token = authHeader.split("Bearer ")[1];
  
    try {
      // Verify the token
      const decoded: any = jwt.verify(token, secret);
  
      // Fetch the user from the database using the userId from the token
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return null; // User not found
      }
  
      // Return the user instance
      return user;
    } catch (error) {
      // Token verification failed
      return null;
    }
  }