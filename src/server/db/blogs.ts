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

export const update = async (id: string, body: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query("UPDATE Blogs SET content = ? WHERE id = ?", [body, id]);
  });
};

export const remove = async (id: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query("DELETE FROM Blogs WHERE id = ?", [id]);
  });
};

export default {
  all,
  one,
  add,
  update,
  remove,
};
