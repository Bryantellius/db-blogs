import React from "react";
import News from "./News";
import Tags from "./Tags";

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
        <div className="col-md-4 border border-dark">
          <div className="d-flex justify-content-around align-items-center bg-dark p-2">
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
          <div className="alert alert-dark text-center">Latest Posts</div>
          <div className="d-flex justify-content-around align-items-center w-75 border mx-auto">
            <h1>Posts</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IMainProps {}

export default Main;
