import axios from "axios";
import React, { useState } from "react";
const Login = ({ onLogin, setShow }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    //Add Logic Here..
    try {
      const response = await axios.post(
        "https://localhost:7033/api/Login",
        { userId, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const accessToken = response.data;
      localStorage.setItem("accessToken", accessToken);

      setShow(true);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <>
      <div className="container justify-content-center w-50 vh-100 mt-5">
        <form
          className=" border border-warning w-50 vh-auto my-3 ms-5 me-5"
          onSubmit={handleLogin}
        >
          <div className=" text-center bg-danger my-0 mx-0">
            <h5 className="text-white">Login Form</h5>
          </div>
          <div class="mb-3 text-center my-3">
            <label htmlFor="userId" className="form-label col-4 text-end">
              <strong>UserId:</strong>
            </label>
            <input
              type="email"
              class="col-7"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="mb-3 text-center my-2">
            <label htmlFor="mobileNumber" className="form-label col-4 text-end">
              <strong>password:</strong>
            </label>
            <input
              type="password"
              class="col-7"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-center mb-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
          <div className="text-center mb-3">
            <a href="/">Forgot Password</a>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
