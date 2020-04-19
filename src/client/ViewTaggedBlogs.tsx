import React, { useState, useEffect } from "react";
import { IFilteredTag } from "../utils/types";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

const ViewTaggedBlogs: React.FC<ITaggedBlogProps> = (props) => {
  const [filteredBlogs, setFilteredBlogs] = useState<IFilteredTag[]>([]);

  const getFilteredBlogs = async () => {
    let res = await fetch(`/api/tags/filter/${props.match.params.id}`);
    let blogs = await res.json();
    setFilteredBlogs(blogs);
  };

  useEffect(() => {
    getFilteredBlogs();
  }, [props.match.params.id]);

  return (
    <>
      <button
        className="btn btn-outline-dark m-3"
        onClick={() => history.back()}
      >
        Back
      </button>
      <div className="d-flex flex-column justify-content-start align-items-center">
        <h1>Filtered Blogs</h1>
        <table className="table w-50">
          {filteredBlogs.map((blog) => {
            if (filteredBlogs.length === 0) {
              return (
                <tbody>
                  <td>
                    <p className="text-center p-2">
                      Sorry, there are no blogs under {blog.tag} :(
                    </p>
                  </td>
                </tbody>
              );
            } else {
              return (
                <tbody key={`${blog.id}-${blog.title}`}>
                  <tr>
                    <td>
                      <p className="bg-dark text-light rounded p-2 text-center">
                        {blog.tag}
                      </p>
                    </td>
                    <td>
                      <NavLink
                        to={`/blog/${blog.id}`}
                        className="nav-link text-dark"
                      >
                        <h5>
                          {blog.title} by{" "}
                          <span className="text-muted">{blog.author}</span>
                        </h5>
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
        </table>
      </div>
    </>
  );
};

interface ITaggedBlogProps extends RouteComponentProps<{ id: string }> {}

export default ViewTaggedBlogs;
