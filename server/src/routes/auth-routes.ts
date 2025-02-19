//old code
// import { Router, Request, Response } from "express";
// import { User } from "../models/User.js"; // Import the User model
// import jwt from "jsonwebtoken"; // Import JSON Web Token library
// import bcrypt from "bcrypt"; // Import bcrypt for password hashing
// import dotenv from "dotenv"; // Ensure environment variables are loaded

// dotenv.config(); // Load environment variables

// const router = Router();

// // ✅ Define JWT Payload Type
// interface JwtPayload {
//   userId: number;
//   username: string;
// }

// // ✅ Login function to authenticate a user
// export const login = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     console.log("Login request body:", req.body);

//     const { email, password } = req.body; // Changed from username to email

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // ✅ Find user in the database by email
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     console.log("Stored user password hash:", user.password);

//     // ✅ Compare provided password with stored hashed password
//     const passwordIsValid = await bcrypt.compare(password, user.password);
//     console.log("Password validation result:", passwordIsValid);

//     if (!passwordIsValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // ✅ Get the JWT secret key
//     const secretKey = process.env.JWT_SECRET || "";
//     if (!secretKey) {
//       return res.status(500).json({ message: "Server configuration error: missing JWT secret" });
//     }

//     // ✅ Generate JWT token including userId
//     const token = jwt.sign(
//       { userId: user.id, username: user.username } as JwtPayload,
//       secretKey,
//       { expiresIn: "1h" }
//     );

//     return res.json({ token, message: "Login successful" });
//   } catch (error: any) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ Signup function to register a new user
// export const signUp = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     console.log("Signup request body:", req.body);

//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Username, email, and password are required" });
//     }

//     // ✅ Check if the user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({ message: "User with this email already exists" });
//     }

//     // ✅ Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Create new user with hashed password
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     console.log("New user created:", newUser);

//     // ✅ Get the JWT secret key
//     const secretKey = process.env.JWT_SECRET || "";
//     if (!secretKey) {
//       return res.status(500).json({ message: "Server configuration error: missing JWT secret" });
//     }

//     // ✅ Generate JWT token including userId
//     const token = jwt.sign(
//       { userId: newUser.id, username: newUser.username } as JwtPayload,
//       secretKey,
//       { expiresIn: "1h" }
//     );

//     return res.status(201).json({ token, message: "Signup successful" });
//   } catch (error: any) {
//     console.error("Signup error:", error);
//     return res.status(400).json({ message: error.message });
//   }
// };

// // ✅ Create a new router instance
// router.post("/login", login);
// router.post("/signup", signUp);

// export default router;


import { Router, Request, Response } from 'express';
// import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing
import { User } from '../models/User.js';
// import { log } from 'console';
// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  // Extract username and password from request body
  // Find the user in the database by username
  console.log(req.body);
  
  const user = await User.findOne({
    where: { username },
  });
  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed 1' });
  }
  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed 2' });
  }
  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';
  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    console.log(newUser);
      // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });  // Send the token as a JSON response
    // res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
// Create a new router instance
const router = Router();
// POST /login - Login a user
router.post('/login', login);  // Define the login route
// POST /users - Create a new user
router.post('/signup', signUp);
export default router;  // Export the router instance