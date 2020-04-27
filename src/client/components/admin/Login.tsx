import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiService, setToken } from "../../utils/apiService";

// Functional Component responsible for post new blogs via API POST
// page format is a simple form
const Login: React.FC<ILoginProps> = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    let credential = {
      email,
      password,
    };
    console.log(credential);
    try {
      let res = await apiService("/auth/login", "POST", credential);
      if (res) {
        setToken(res.token, { userid: res.userid, role: res.role });
        if (res.role === "admin") {
          history.push("/admin");
        } else {
          history.push("/");
        }
      } else {
        // checks for correct login
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center border border-dark shadow my-3 py-3">
      <h1>Sign In</h1>
      <div className="form-group d-flex flex-column w-50">
        <label htmlFor="addTitle">Enter Email:</label>
        <input
          id="addEmail"
          className="form-control"
          type="email"
          onChange={(e: any) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="addTitle">Enter Passord:</label>
        <input
          id="addPassword"
          className="form-control"
          type="password"
          onChange={(e: any) => setPassword(e.target.value)}
        ></input>
      </div>
      <button className="btn btn-outline-dark" onClick={login}>
        Login
      </button>
    </div>
  );
};

interface ILoginProps {}

export default Login;
