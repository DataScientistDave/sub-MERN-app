import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";

const router = express.Router();

router.post(
  "/signup",
  // Using express validator to check if email or password are valid and provides error message
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").isLength({ min: 5 }).withMessage("The password is invalid"),
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      // Creates an array of objects with the error messages
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });

      // Also returns data as null
      return res.json({ errors, data: null });
    }

    // Grabs the email and password from the request body
    const { email, password } = req.body;

    // Uses mongooses findOne method to see if email is already in use
    const user = await User.findOne({ email });

    // Returns error message with null data
    if (user) {
      return res.json({
        errors: [
          {
            msg: "Email already in use",
          },
        ],
        data: null,
      });
    }

    // Hashes the password with bcrypt and adds 10 salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // creates the custimer in stripe
    const customer = await stripe.customers.create(
      { email },
      { apiKey: process.env.STRIPE_SECRET_KEY }
    );

    // Creates a user in the db and can be seen in the collections
    const newUser = await User.create({
      email,
      password: hashedPassword,
      stripeCustomerId: customer.id,
    });

    // Creates a JWT token
    const token = await JWT.sign(
      // Body which is the payload
      { email: newUser.email },
      // The footer which is some jibberish string
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    );

    // Return as JSON
    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          stripeCustomerId: customer.id,
        },
      },
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Finds the email
  const user = await User.findOne({ email });

  // If email doesn't exist when logging in then return error
  if (!user) {
    return res.json({
      errors: [
        {
          msg: "Invalids credentials",
        },
      ],
      data: null,
    });
  }

  // Compares hash codes of passwords
  const isMatch = await bcrypt.compare(password, user.password);

  // If they don't match then return error message
  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: "Invalids credentials",
        },
      ],
      data: null,
    });
  }

  // Create JWT token
  const token = await JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000,
    }
  );

  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

// Will go to checkAuth middleware first before rest of async function. This is a protected route. Only can hit this route if logged in.
router.get("/me", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });
  return res.json({
    errors: [],
    data: {
      user: {
        id: user._id,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
      },
    },
  });
});

export default router;
