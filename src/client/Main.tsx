import React from "react";
import News from "./News";
import Tags from "./Tags";
import Blogs from "./Blogs";

const Main: React.FC<IMainProps> = () => {
  const toggleNewsNav = () => {
    if (document.getElementById("tagsNav").style.display === "block") {
      document.getElementById("tagsNav").style.display = "none";
      document.getElementById("newsNav").style.display = "block";
    }
  };

  const toggleTagsNav = () => {
    if ((document.getElementById("newsNav").style.display = "block")) {
      document.getElementById("newsNav").style.display = "none";
      document.getElementById("tagsNav").style.display = "block";
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="alert alert-dark w-100 text-muted">Hello World!</div>
      <div className="row border border dark shadow w-100">
        <div className="col-md-4 border border-dark d-flex flex-column justify-content-start">
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
        <div className="col-md-8 border border-dark">
          <div className="alert alert-dark text-center shadow-sm">
            <h4>Latest Posts</h4>
          </div>
          <div className="d-flex flex-wrap justify-content-around p-2">
            <Blogs />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IMainProps {}

export default Main;