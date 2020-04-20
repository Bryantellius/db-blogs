import React, { useState } from "react";

// Functional Component responsible for post new blogs via API POST
// page format is a simple form
const AddBlog: React.FC<IAddProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const post = () => {
    let blog = {
      title,
      content,
      authorid: 1,
      tagid: parseInt(document.getElementsByTagName("select")[0].value),
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
