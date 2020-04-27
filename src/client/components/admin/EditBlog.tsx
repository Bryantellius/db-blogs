import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { apiService, User } from "../../utils/apiService";

// Functional Component responsible for updating blog via API PUT request, deleting blog via API DELETE request
// page format is a simple form
const EditBlog: React.FC<IEditProps> = (props) => {
  const history = useHistory();

  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const getBlog = async () => {
    let blog = await apiService(`/api/blogs/${props.match.params.id}`);
    setTitle(blog.title);
    setContent(blog.content);
  };

  React.useEffect(() => {
    if (!User || !User.userid || User.role !== "admin") {
      history.push("/login");
    } else {
      getBlog();
    }
  }, [props.match.params.id]);

  const update = async () => {
    let editedBlog = {
      title,
      content,
    };
    await apiService(`/api/blogs/${props.match.params.id}`, "PUT", editedBlog);
    history.push("/");
  };

  const remove = async () => {
    await apiService(`/api/blogs/${props.match.params.id}`, "DELETE", {});
    history.push("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-dark shadow my-3 py-3">
      <h1>Edit Blog</h1>
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
          rows={5}
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
