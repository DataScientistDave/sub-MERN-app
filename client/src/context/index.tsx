import { createContext, useState } from "react";

interface User {
  data: {
    id: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  // types are defined ie., user and react setstateaction which is the type of useState hook that has the above data
  [User, React.Dispatch<React.SetStateAction<User>>]
  // Need to define the initial values for the context, empty function to update state
>([{ data: null, loading: true, error: null }, () => {}]);
