/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const createPost = async (e) => {
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    // console.log(files);
    // console.log(data);

    const response = await fetch("https://blog-api-vhtu.onrender.com/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    console.log(await response.json());

    if (response.ok) {
      navigate("/");
    }
  };
  console.log(content);
  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        // value={files}
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <Editor value={content} onChange={setContent} />

      <button style={{ marginTop: "10px" }}>Create Post</button>
    </form>
  );
};

export default CreatePostPage;
