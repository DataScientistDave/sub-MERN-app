// Need to import these otherwise typescript complains
import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

// The client will send the jwt token in this kinda form (Bearer JWT). The token is already stored in the client through the login and signup routes.
// The middleware will verify this JWT token. Middleware checks the token before sending to the protected routes.
// Then it will pass the user email onto the next function and then send back user as payload. Ensures we are logged in

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // authorization is the key
  let token = req.header("authorization");
  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }

  // gets the token and not the bearer word
  token = token.split(" ")[1];

  try {
    // verify token with footer. Returns the email as string
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };
    // set the user email as req.user. Need to create @types/express/index.d.ts file otherwise typescript complains
    req.user = user.email;
    // execute the next function
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }
};
