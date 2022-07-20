import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        toast.error(error.message);
        navigate("/");
      });
  }, []);

  return <></>;
};

export default Signout;
