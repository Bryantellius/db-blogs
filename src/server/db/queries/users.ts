import { Connection } from "../index";
import { IAuthor } from "../../utils/types";

const findOneByEmail = async (email: string) => {
  return new Promise<IAuthor[]>((resolve, reject) => {
    Connection.query(
      `SELECT * FROM authors WHERE email = ? LIMIT 1`,
      [email],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

const findOneById = async (id: number) => {
  return new Promise<IAuthor[]>((resolve, reject) => {
    Connection.query(
      `SELECT * FROM authors WHERE id = ? LIMIT 1`,
      [id],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

export default {
  findOneByEmail,
  findOneById,
};
