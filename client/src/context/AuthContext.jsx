import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = cookies.get("token");
        if (token) {
          const { data } = await api.get("/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // const login = async (email, password) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.post("/login", { email, password });
  //     cookies.set("token", data.refreshToken, { path: "/" });
  //     setUser({
  //       id: data.id,
  //       name: data.name,
  //       email: data.email,
  //     });
  //     setIsAuth(true);
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password });

      if (data.error) {
        setError(data.error);
      } else if (data.ok) {
        cookies.set("token", data.refreshToken, { path: "/" });
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
        });
        setIsAuth(true);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again."); // Muestra un error genérico
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
      cookies.remove("token");
      setUser(null);
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuth, loading, login, logout, Error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
