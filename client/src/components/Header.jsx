import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  // const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        // console.log(data);
        setUserInfo(data);
      });
    });
  }, []);
  // console.log(userName);
  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/login");
  };

  const userName = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userName && (
          <>
            <Link to="/create">Create New Post</Link>
            <a href="#" onClick={logout}>
              Logout({userName})
            </a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
