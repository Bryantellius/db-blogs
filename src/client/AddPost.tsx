import React, { useState } from "react";

const AddPost: React.FC<IAddProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const post = () => {
    let blog = {
      title,
      content,
      authorid: 1,
    };
    fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    history.back();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-dark shadow my-3 py-3">
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addTitle">Enter Title:</label>
        <input
          id="addTitle"
          className="form-control"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addContent">Enter Content:</label>
        <textarea
          className="form-control"
          id="addContent"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-outline-dark" onClick={post}>
        Post
      </button>
    </div>
  );
};

interface IAddProps {}

export default AddPost;
