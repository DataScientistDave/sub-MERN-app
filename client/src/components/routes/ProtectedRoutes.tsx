import { UserContext } from "../../context";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Spinner....</div>;
  // If data then use outlet else navigate to landing page
  // Outlet is the child of this route in app.tsx
  return state.data ? <Outlet /> : <Navigate to="/" />;
};
