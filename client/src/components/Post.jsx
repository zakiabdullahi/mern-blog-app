/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format, formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
        {/* <p>{content.replace("<p>", "").replace("</p>", "")}</p> */}
      </div>
    </div>
  );
};

export default Post;
