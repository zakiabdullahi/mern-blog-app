import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://blog-api-vhtu.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),

      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
      // setRedirect(true);
      // console.log(await response.json());
      // navigate("/");
    } else {
      alert("wrong credentials ");
    }
  };
  if (redirect) return navigate("/");
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
