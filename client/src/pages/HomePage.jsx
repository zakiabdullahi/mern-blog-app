import { useEffect, useState } from "react";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-api-vhtu.onrender.com/post").then((res) => {
      res.json().then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} key={post._id} />;
        })}
    </>
  );
};

export default HomePage;
