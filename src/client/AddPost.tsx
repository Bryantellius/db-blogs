import React, { useState, useEffect } from "react";

const AddPost: React.FC<IAddProps> = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-dark shadow my-3 py-3">
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addTitle">Enter Title:</label>
        <input id="addTitle" className="form-group" type="text" />
      </div>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addContent">Enter Content:</label>
        <textarea className="form-control" id="addContent"></textarea>
      </div>
      <button className="btn btn-outline-dark" onClick={() => history.back()}>
        Post
      </button>
    </div>
  );
};

interface IAddProps {}

export default AddPost;
