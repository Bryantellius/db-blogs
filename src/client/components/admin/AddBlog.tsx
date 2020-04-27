import React from "react";
import { apiService, User } from "../../utils/apiService";
import { useHistory } from "react-router-dom";

// Functional Component responsible for post new blogs via API POST
// page format is a simple form
const AddBlog: React.FC<IAddProps> = () => {
  const history = useHistory();

  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (!User || !User.userid || User.role !== "admin") {
      history.push("/login");
    }
  });

  const post = async () => {
    let blog = {
      title,
      content,
      authorid: User.userid,
      tagid: parseInt(document.getElementsByTagName("select")[0].value),
    };
    await apiService("/api/blogs", "POST", blog);
    history.push("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-dark shadow my-3 py-3">
      <h1>Add Blog</h1>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addTitle">Enter Title:</label>
        <input
          id="addTitle"
          className="form-control"
          type="text"
          onChange={(e: any) => setTitle(e.target.value)}
        ></input>
        <label htmlFor="tagSelect">Choose Tag:</label>
        <select id="tagSelect" className="custom-select">
          <option value="0">No Tag</option>
          <option value="1">TMYK</option>
          <option value="2">Books</option>
          <option value="3">LOTR</option>
          <option value="4">Humor Me</option>
          <option value="5">King Killer Chronicles</option>
          <option value="6">Seinfeld</option>
          <option value="7">TV</option>
          <option value="8">Random</option>
        </select>
      </div>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addContent">Enter Content:</label>
        <textarea
          className="form-control"
          id="addContent"
          rows={5}
          onChange={(e: any) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-outline-dark" onClick={post}>
        Post
      </button>
    </div>
  );
};

interface IAddProps {}

export default AddBlog;
