import React, { useState, useEffect } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { IBlog, ITag } from "../utils/types";
import { apiService } from "../utils/apiService";
import moment from 'moment';

// Functional Component that fetches blog and associated tags and render as a main view page
const ViewBlog: React.FC<IViewProps> = (props) => {
  const [blog, setBlog] = useState<IBlog>(null);
  const [tags, setTags] = useState<ITag[]>([]);

  const getBlog = async () => {
    let blog = await apiService(`/api/blogs/${props.match.params.id}`);
    setBlog(blog);
  };

  const getTags = async () => {
    let tags = await apiService(`/api/tags/forBlogs/${props.match.params.id}`);
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
      <div id="mainBlog" className="border-left border-right p-3 mx-auto w-75">
        <h1>{blog?.title}</h1>
        <div className="my-3">
          {tags.map((tag) => (
            <NavLink
              to={`/view-tags/blogs/${tag.id}`}
              key={`${tag.id}-${tag.name}`}
            >
              <span className="badge badge-dark p-2 mx-1">{tag.name}</span>
            </NavLink>
          ))}
        </div>
        <h6 className="text-muted">By {blog?.author}</h6>
          <span className="date">{moment(blog?.date).format("MMM Do YYYY")}</span>
        <hr></hr>
        <p>{blog?.content}</p>
        <hr></hr>
        <div id="editBtn">
          <NavLink to={`/blog/edit/${blog?.id}`}>
            <button className="btn btn-outline-dark">?</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

interface IViewProps extends RouteComponentProps<{ id: string }> {}

export default ViewBlog;
