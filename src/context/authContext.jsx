import { useContext, useMemo } from "react";
import { Children, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback(async (data) => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json);
      localStorage.setItem("user", JSON.stringify(json));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const register = useCallback(async (data) => {
    try {
      const { confirmPassword, ...rest } = data;
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json);
      localStorage.setItem("user", JSON.stringify(json));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const logout = useCallback(async () => {}, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
