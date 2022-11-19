import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_API_ENDPOINT } from "../services/AppConst";
import LocalStorageService from "../services/LocalStorageService";

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const accessToken = LocalStorageService.getItem("accessToken");

        if (accessToken) {
          await axios
            .get(BACKEND_API_ENDPOINT + "users/token/" + accessToken)
            .then((res) => {
              if (res.status === 200) {
                setUser(res.data.user);
              } else {
                LocalStorageService.removeItem("accessToken");
                setUser(null);
              }
            });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        LocalStorageService.removeItem("accessToken");
        setUser(null);
      }
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};
