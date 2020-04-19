import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ITag, IFilteredTag } from "../utils/types";
import { JsxEmit, updateJsxElement } from "typescript";

const Tags: React.FC<ITagProps> = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [filteredTags, setFilteredTags] = useState<IFilteredTag[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);

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
              {tag.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface ITagProps {}

export default Tags;
