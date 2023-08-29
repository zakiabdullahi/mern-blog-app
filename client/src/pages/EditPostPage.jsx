import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, []);

  const updatePost = async (e) => {
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    data.set("id", id);
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      navigate("/");
    }
  };
  return (
    <form onSubmit={updatePost}>
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

      <button style={{ marginTop: "10px" }}>Edit Post</button>
    </form>
  );
};

export default EditPostPage;
