import { Connection } from "../index";

const findOne = async (id: number, token: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(
      `SELECT * FROM accesstokens WHERE id = ? AND token = ?`,
      [id, token],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

const insert = async (userid: number) => {
  return new Promise<{ insertId: number }>((resolve, reject) => {
    Connection.query(
      `INSERT INTO accesstokens SET userid = ?`,
      [userid],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

const update = async (id: number, token: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(
      `UPDATE accesstokens SET token = ? WHERE id = ?`,
      [token, id],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

export default {
  findOne,
  insert,
  update,
};
