declare namespace Express {
  // Getting request type from express and setting user type as string
  export interface Request {
    user: string;
  }
}
