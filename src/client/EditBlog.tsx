import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

const EditBlog: React.FC<IEditProps> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const getBlog = async () => {
    let res = await fetch(`/api/blogs/${props.match.params.id}`);
    let blog = await res.json();

    setTitle(blog[0].title);
    setContent(blog[0].content);
  };

  useEffect(() => {
    getBlog();
  }, [props.match.params.id]);

  const update = async () => {
    let editedBlog = {
      title,
      content,
    };
    await fetch(`/api/blogs/${props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBlog),
    });
    history.back();
  };

  const remove = async () => {
    await fetch(`/api/blogs/${props.match.params.id}`, {
      method: "DELETE",
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
          defaultValue={title}
          onChange={(e: any) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addContent">Edit Content:</label>
        <textarea
          className="form-control"
          id="addContent"
          defaultValue={content}
          onChange={(e: any) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="d-flex justify-content-around w-100">
        <button className="btn btn-outline-dark" onClick={update}>
          Update
        </button>
        <button className="btn btn-outline-dark" onClick={remove}>
          Delete
        </button>
      </div>
    </div>
  );
};

interface IEditProps extends RouteComponentProps<{ id: string }> {}

export default EditBlog;
