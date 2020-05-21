import React from "react";
import News from "../components/News";
import Tags from "../components/Tags";
import Blogs from "./Blogs";

// Functional Component that hosts that renders news/tags and blogs components
const Main: React.FC<IMainProps> = () => {
  // Function that toggles between showing news cards and tags list
  const toggleNewsNav = () => {
    if (document.getElementById("tagsNav").style.display === "block") {
      document.getElementById("tagsNav").style.display = "none";
      document.getElementById("newsNav").style.display = "block";
    }
  };
  // Second function that aids in toggle feature
  const toggleTagsNav = () => {
    if ((document.getElementById("newsNav").style.display = "block")) {
      document.getElementById("newsNav").style.display = "none";
      document.getElementById("tagsNav").style.display = "block";
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="alert alert-dark w-100 text-muted">Hello World!</div>
      <div className="row shadow w-100">
        <div className="col-md-4 d-flex flex-column justify-content-start">
          <div className="btn-group bg-dark p-2">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={toggleNewsNav}
            >
              News
            </button>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={toggleTagsNav}
            >
              Topics
            </button>
          </div>
          <News />
          <Tags />
        </div>
        <div className="col-md-8">
          <div className="alert alert-dark text-center shadow-sm">
            <h4>Latest Posts</h4>
          </div>
          <div className="p-2">
            <Blogs />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IMainProps {}

export default Main;
