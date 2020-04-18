import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

const EditBlog: React.FC<IAddProps> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const getBlog = async () => {
      let res = await fetch(`/api/blogs/${props.match.params.id}`);
      let blog = await res.json();
      setTitle(blog.title);
      setContent(blog.content);
    };
    getBlog();
  }, [props.match.params.id]);

  const update = () => {
    let editedBlog = {
      title,
      content,
      authorid: 1,
    };
    fetch(`/api/blogs/${props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBlog),
    });
    history.back();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-dark shadow my-3 py-3">
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addTitle">Edit Title:</label>
        <input
          id="addTitle"
          className="form-control"
          type="text"
          value={title};
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addContent">Edit Content:</label>
        <textarea
          className="form-control"
          id="addContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-outline-dark" onClick={update}>
        Post
      </button>
    </div>
  );
};

interface IAddProps extends RouteComponentProps<{ id: string }> {}

export default EditBlog;
