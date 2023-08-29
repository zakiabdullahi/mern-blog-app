import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://blog-api-vhtu.onrender.com/register",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    if (response.status === 200) {
      alert("register success");
    } else {
      alert("register failed");
    }
  };
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
