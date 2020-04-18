import { Connection } from "./index";

export const all = async () => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(
      "SELECT b.id, a.name as author, b.title, b.content, b._created as date FROM Blogs b JOIN Authors a ON a.id = b.authorid",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const one = async (id: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(
      "SELECT b.id, a.name as author, b.title, b.content, b._created as date FROM Blogs b JOIN Authors a ON a.id = b.authorid WHERE b.id = ?",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const add = async (body: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query("INSERT INTO Blogs SET ?", [body]);
  });
};

export default {
  all,
  one,
  add,
};
