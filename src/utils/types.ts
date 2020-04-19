export interface IBlog {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IFilteredTag {
  id: number;
  tag: string;
  author: string;
  title: string;
  content: string;
  time: string;
}
