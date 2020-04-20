import { Connection } from "./index";

// Gets all blogs
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

// Gets blog based on id
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

// Inserts blog
export const add = async (body: any) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(
      "INSERT INTO Blogs SET title = ?, content = ?, authorid = ?",
      [body.title, body.content, body.authorid],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

// Updates blog based on id with body
export const update = async (id: string, body: any) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(
      "UPDATE Blogs SET content = ?, title = ? WHERE id = ?",
      [body.content, body.title, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

// Deletes blog based on id
export const remove = async (id: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query("DELETE FROM Blogs WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export default {
  all,
  one,
  add,
  update,
  remove,
};
