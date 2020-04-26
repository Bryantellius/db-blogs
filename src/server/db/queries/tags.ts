import { Connection } from "../index";

// Returns array list of each tag name
export const all = async () => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(`SELECT * FROM tags`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Returns array with blogs matching a tagid
export const filter = async (id: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(`CALL spFilterBlogs(?)`, [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Searches Blogs and inserts any new blog into blogtags with corresponding tagid
export const fill = async (body: any) => {
  return new Promise<Array<any>>((resolve, reject) => {
    if (body.tagid === 1) {
      Connection.query(
        "CALL spFillBlogTags(1, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 2) {
      Connection.query(
        "CALL spFillBlogTags(2, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 3) {
      Connection.query(
        "CALL spFillBlogTags(3, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 4) {
      Connection.query(
        "CALL spFillBlogTags(4, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 5) {
      Connection.query(
        "CALL spFillBlogTags(5, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 6) {
      Connection.query(
        "CALL spFillBlogTags(6, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 7) {
      Connection.query(
        "CALL spFillBlogTags(7, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
    if (body.tagid === 8) {
      Connection.query(
        "CALL spFillBlogTags(8, ?)",
        [body.content],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    }
  });
};

// Returns all tags associated with a blog
export const tagsPerBlog = async (id: string) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query("CALL spBlogTags(?)", [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export default {
  all,
  filter,
  fill,
  tagsPerBlog,
};
