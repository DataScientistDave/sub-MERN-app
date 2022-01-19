import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Context is another way to do state management.

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

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");
  // Set all request headers to have token
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get("http://localhost:5000/auth/me");

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({ data: null, loading: false, error: null });
    }
  }, [token]);

  // UserProvider is a function that returns UserContext.Provider
  // Every context object comes with a provider component that allows conuming component to subscribe to context changes
  // The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
