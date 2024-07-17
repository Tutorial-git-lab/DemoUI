import axios from "axios";
import React, { useEffect, useState } from "react";

const State = () => {
  const [id, setId] = useState();
  const [user, setUser] = useState();
  const [stateName, setStateName] = useState();
  const [countryId, setCountryId] = useState();
  const [btnchange, setBtnchange] = useState();

  useEffect(() => {
    axios
      .get("https://localhost:7053/api/State/GetAllStates")
      .then((response) => {
        console.log(response.data); // Log the response data
        setUser(response.data); // Set the state with the array data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const AddState = (e) => {
    if (btnchange === "submit") {
      axios
        .post("https://localhost:7053/api/State/AddState", {
          id,
          stateName,
          countryId,
        })
        .then((result) => {
          console.log(result);
          alert("Data Added");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put("https://localhost:7053/api/State/UpdateState", {
          id,
          stateName,
          countryId,
        })
        .then((result) => {
          alert("Data Added");
          console.log(result);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    debugger;
    e.preventDefault();
  };

  const DeleteData = (id) => {
    axios
      .delete("https://localhost:7053/api/State/DeleteState?Id=" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const EditData = (dataEdit) => {
    setId(dataEdit.id);
    setStateName(dataEdit.stateName);
    setCountryId(dataEdit.countryId);

    setBtnchange("saveChange");
  };
  return (
    <>
      <div className="container justify-content-center w-50 vh-100 mt-5">
        <form
          className=" border border-warning w-50 vh-auto my-3 ms-5 me-5"
          onSubmit={AddState}
        >
          <div className=" text-center bg-danger my-0 mx-0">
            <h5 className="text-white">Manage State</h5>
          </div>
          <div className="mb-3 text-center my-3 me-3">
            <label htmlFor="state" className="form-label col-4 text-end">
              <strong>State:</strong>
            </label>
            <input
              type="text"
              class="col-7"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter State"
            />
            <div className="mb-3 text-center my-3 me-3">
              <label htmlFor="country" className="form-label col-4 text-end">
                <strong>Country:</strong>
              </label>
              <select
                name="select"
                id="select123"
                className="col-7"
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
              >
                <option value="0">select</option>
                <option value="0">India</option>
                <option value="1">United State</option>
                <option value="2">Australia</option>
                <option value="3">Bhutan</option>
                <option value="4">Nepal</option>
              </select>
            </div>
          </div>

          <div className="text-center mb-2">
            <button type="button" className="btn btn-success">
              Add State
            </button>
          </div>
          <div className="text-center mb-3">
            <a href="/">Back to Home</a>
          </div>
        </form>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>State Name</th>
                <th>Country Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(user) &&
                user.map((val) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.stateName}</td>
                      <td>{val.countryId}</td>

                      <td>
                        <button
                          className="bg-primary rounded-3 mb-1"
                          onClick={(e) => EditData(val)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-primary rounded-3"
                          onClick={() => DeleteData(val.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default State;
