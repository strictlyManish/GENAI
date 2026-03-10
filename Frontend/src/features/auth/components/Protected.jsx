import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default Protected;