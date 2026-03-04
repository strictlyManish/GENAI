import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../service/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);

      const data = await login({ email, password });
      setUser(data.user);

      return data;
    } catch (error) {
      console.error("Login error:", error);

      throw error.response?.data?.message || "Login failed";
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);

      const data = await register({ username, email, password });
      setUser(data.user);

      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error.response?.data?.message || "Registration failed";
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error.response?.data?.message || "Logout failed";
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const getAndsetUser = async () => {
      const data = await getMe();
      setUser(data);
      setLoading(false);
    };

    getAndsetUser()
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRegister };
};