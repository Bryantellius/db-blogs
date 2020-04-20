import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IBlog, ITag } from "../utils/types";
import { RouteComponentProps } from "react-router-dom";

const ViewBlog: React.FC<IViewProps> = (props) => {
  const [blog, setBlog] = useState<IBlog[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const getBlog = async () => {
    let res = await fetch(`/api/blogs/${props.match.params.id}`);
    let blog = await res.json();
    setBlog(blog);
  };

  const getTags = async () => {
    let res = await fetch(`/api/tags/forBlogs/${props.match.params.id}`);
    let tags = await res.json();
    setTags(tags[0]);
  };

  useEffect(() => {
    getBlog();
    getTags();
  }, [props.match.params.id]);

  return (
    <>
      <button
        className="btn btn-outline-dark m-3"
        onClick={() => history.back()}
      >
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
            <div className="my-3">
              {tags.map((tag) => (
                <NavLink to={`/view-tags/blogs/${tag.id}`}>
                  <span className="badge badge-dark p-2 mx-1">{tag.name}</span>
                </NavLink>
              ))}
            </div>
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
