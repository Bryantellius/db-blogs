import fetch from "isomorphic-fetch";

export let AccessToken: string = localStorage.getItem(`token`) || null;
export let User: any = {
  userid: localStorage.getItem("userid") || null,
  role: localStorage.getItem("role") || null,
};

export const apiService = async <T = any>(
  url: string,
  method: string = "GET",
  body?: {},
  token?: string
) => {
  let headers: any = {
    "Content-Type": "application/json",
  };

  if (AccessToken) {
    headers["Authorization"] = `Bearer ${AccessToken}`;
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    if (res.ok) {
      return <T>await res.json();
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const setToken = (
  token: string,
  user: {} = { userid: undefined, role: "guest" }
) => {
  AccessToken = token;
  User = user;

  localStorage.setItem("token", AccessToken);
  localStorage.setItem("userid", User.userid);
  localStorage.setItem("role", User.role);
};
