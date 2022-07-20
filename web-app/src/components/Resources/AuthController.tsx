import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const AuthController = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/signin");
      } else {
        navigate("/");
      }
    }
  }, [loading, user]);

  return <></>;
};

export default AuthController;
