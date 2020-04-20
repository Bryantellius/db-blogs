import React, { useState, useEffect } from "react";
import { IHeadline } from "../../utils/types";

// Functional Component that fetches news articles and renders as cards
const News: React.FC<INewsProps> = () => {
  const [headlines, setHeadlines] = useState<IHeadline[]>([]);

  const getHeadlines = async () => {
    let res = await fetch(
      `http://newsapi.org/v2/top-headlines?country=us&apiKey=e811d7812c3c469988e86dd711430d8a`
    );
    let data = await res.json();
    let headlines: Array<IHeadline> = data.articles.map((item: any) => {
      return {
        title: item.title,
        source: item.source.name,
        url: item.url,
      };
    });
    setHeadlines(headlines.splice(0, 3));
  };

  useEffect(() => {
    getHeadlines();
  }, []);

  return (
    <div id="newsNav">
      {headlines.map((headline: IHeadline) => {
        return (
          <div
            className="card shadow my-1"
            key={`${headline.source}-${headline.title.slice(0, 5)}`}
          >
            <div className="card-body">
              <h6 className="card-title border-bottom border-top p-1 rounded">
                {headline.title}
              </h6>
              <p className="card-text">
                <u>{headline.source}</u>
              </p>
            </div>
            <div className="card-footer text-center">
              <a href={headline.url} target="_blank">
                <button className="btn btn-sm btn-outline-dark">Read</button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface INewsProps {}

export default News;
