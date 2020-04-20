import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import AddBlog from "../components/AddBlog";
import EditBlog from "../components/EditBlog";
import Main from "./Main";
import ViewBlog from "./ViewBlog";
import ViewTaggedBlogs from "./ViewTaggedBlogs";

// Main Functional Component that renders main page with main content routes
const App: React.FC<IAppProps> = () => {
  return (
    <Router>
      <div className="d-flex justify-content-between p-2 border border-dark shadow">
        <h1 className="text-center">TheBennyFiles</h1>
        <div className="d-flex justify-content-end align-items-center w-25">
          <NavLink
            exact
            to="/"
            className="nav-link text-dark mx-1"
            activeClassName="activeLink"
            id="homeLink"
          >
            Home
          </NavLink>
          <NavLink
            to="/add"
            className="nav-link text-dark mx-1"
            activeClassName="activeLink"
            id="addLink"
          >
            Add Post
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/add" component={AddBlog}></Route>
        <Route path="/blog/edit/:id" component={EditBlog}></Route>
        <Route path="/blog/:id" component={ViewBlog}></Route>
        <Route path="/view-tags/blogs/:id" component={ViewTaggedBlogs}></Route>
      </Switch>
    </Router>
  );
};

export interface IAppProps {}

export interface IAppState {
  name: string;
}

export default App;
