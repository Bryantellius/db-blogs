import * as mysql from "mysql";
import config from "../config";

// Table query imports
import Blogs from "./queries/blogs";
import Tags from "./queries/tags";
import Users from "./queries/users";
import Tokens from "./queries/tokens";

export const Connection = mysql.createPool(config.mysql);

export default { Blogs, Tags, Users, Tokens };
