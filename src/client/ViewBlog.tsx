import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IBlog } from "../utils/types";
import { RouteComponentProps } from "react-router-dom";

const ViewBlog: React.FC<IViewProps> = (props) => {
  const [blog, setBlog] = useState<IBlog[]>([]);

  const getBlog = async () => {
    let res = await fetch(`/api/blogs/${props.match.params.id}`);
    let blog = await res.json();
    setBlog(blog);
  };

  useEffect(() => {
    getBlog();
  }, [props.match.params.id]);

  return (
    <>
      <button className="btn btn-outline-dark m-3" onClick={() => history.back()}>
        Back
      </button>
      {blog.map((blog) => {
        return (
          <div
            id="mainBlog"
            className="border-left border-right p-3 mx-auto w-75"
            key={`${blog.id}-${blog.author}-${blog.date}`}
          >
            <h1>{blog.title}</h1>
            <h6 className="text-muted">By {blog.author}</h6>
            <span className="date">Written {blog.date.slice(5, 10)}</span>
            <hr></hr>
            <p>{blog.content}</p>
            <hr></hr>
            <div id="editBtn">
              <NavLink to={`/blog/edit/${blog.id}`}>
                <button className="btn btn-outline-dark">?</button>
              </NavLink>
            </div>
          </div>
        );
      })}
    </>
  );
};

interface IViewProps extends RouteComponentProps<{ id: string }> {}

export default ViewBlog;
