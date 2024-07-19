import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const data = await api.get("/user");
          setUser(data.data.name);
          setIsAuth(true);
        } catch (error) {
          console.error("Error fetching user", error);
          setUser(null);
          setIsAuth(false);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setIsAuth(false);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/login", values);
      setUser(response.data.user);
      setIsAuth(true);
      Cookies.set("token", response.data.token, {});
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
