import React from "react";

export default function Home() {
  return (
    <>
      <div className="container justify-content-center w-50 vh-100 mt-5">
        <form className=" border border-warning w-50 vh-auto my-3 ms-5 me-5">
          <div className=" text-center bg-danger my-0 mx-0">
            <h5 className="text-white">Login Form</h5>
          </div>
          <div class="mb-3 text-center my-3">
            <label htmlFor="email" className="form-label col-4 text-end">
              <strong>UserName:</strong>
            </label>
            <input
              type="email"
              class="col-7"
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
              id="exampleInputPassword1"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-center mb-2">
            <button type="button" className="btn btn-success">
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
}
