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
    <main className="container">
      <div className="border-dark shadow mt-3 p-3">
        <h3 className="text-center border-bottom border-info p-2 w-50 mx-auto mb-2">
          Sign In
        </h3>
        <div className="form-group d-flex flex-column w-50 mx-auto">
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
        <button
          className="btn btn-outline-dark d-block w-25 mx-auto"
          onClick={login}
        >
          Login
        </button>
      </div>
    </main>
  );
};

interface ILoginProps {}

export default Login;
