import { Router, Request, Response } from 'express';
import { User } from '../models/User.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare password with the stored hash
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Get the JWT secret key
    const secretKey = process.env.JWT_SECRET || "";

    // Generate JWT token including userId
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error: any) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Signup function to register a new user
export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    // Get JWT secret key
    const secretKey = process.env.JWT_SECRET || "";

    // Generate JWT token including userId
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post("/login", login);

// POST /signup - Create a new user
router.post("/signup", signUp);

export default router;
