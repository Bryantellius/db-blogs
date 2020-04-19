import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ITag } from "../utils/types";

const Tags: React.FC<ITagProps> = () => {
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    const getTags = async () => {
      let res = await fetch(`/api/tags`);
      let tags = await res.json();
      setTags(tags);
    };
    getTags();
  }, []);

  return (
    <div id="tagsNav" className="my-3">
      <ul className="list-group-flush" id="tagSelectNav">
        {tags.map((tag) => {
          return (
            <li
              key={`${tag.id}-${tag.name}`}
              id={`${tag.id}`}
              className="list-group-item list-group-item-action"
              value={tag.id}
            >
              <NavLink to={`/view-tags/blogs/${tag.id}`} className="nav-link text-dark">{tag.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface ITagProps {}

export default Tags;
