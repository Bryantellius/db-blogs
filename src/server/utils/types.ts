export type Error = {
  status?: number;
  message?: string;
};

export interface IBlog {
  id: number;
  title: string;
  content: string;
  authorid: number;
  _created: Date;
}

export interface IAuthor {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  _created: Date;
  role: string;
}
