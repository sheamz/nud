import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function LoginGoogle() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);


  useEffect(() => {
    if (cookies.user_token) {
      navigate("/nud-hub/loginhome");
    }
  }, []);


  const handleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post("http://localhost/nud-hub/API/google.php", { token: credential });
      const { user, isNewUser } = res.data;

      if(res.status === 201){
        setCookie("user_token", res.data.data, {
          path: "/",
          expires: res.data.expires_at,
          secure: true,
          sameSite: "strict",
        });
        navigate("/nud-hub/loginhome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed", error);
  };

  return (
    <GoogleLogin
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      width={323}
    />
  );
}