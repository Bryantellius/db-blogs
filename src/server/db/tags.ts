import { Connection } from "./index";

export const all = async () => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(`SELECT * FROM tags`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const filter = async (id: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(`CALL spBlogTags(?)`, [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export default {
  all,
  filter,
};
