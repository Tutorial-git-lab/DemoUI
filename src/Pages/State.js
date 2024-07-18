import axios from "axios";
import React, { useEffect, useState } from "react";

const State = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState([]);
  const [stateName, setStateName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [btnChange, setBtnChange] = useState("submit");

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    axios
      .get("https://localhost:7053/api/State/GetAllStates")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const AddState = (e) => {
    e.preventDefault();
    if (btnChange === "submit") {
      axios
        .post("https://localhost:7053/api/State/AddState", {
          stateName,
          countryId,
        })
        .then((result) => {
          console.log(result);
          alert("State added successfully");
          fetchStates();
          setStateName("");
          setCountryId("");
        })
        .catch((error) => {
          console.error("Error adding state:", error);
        });
    } else {
      axios
        .put("https://localhost:7053/api/State/UpdateState", {
          id,
          stateName,
          countryId,
        })
        .then((result) => {
          console.log(result);
          alert("State updated successfully");
          fetchStates();
          setStateName("");
          setCountryId("");
          setBtnChange("submit");
        })
        .catch((error) => {
          console.error("Error updating state:", error);
        });
    }
  };

  const DeleteData = (id) => {
    axios
      .delete(`https://localhost:7053/api/State/DeleteState?Id=${id}`)
      .then((res) => {
        console.log(res);
        alert("State deleted successfully");
        fetchStates();
      })
      .catch((error) => {
        console.error("Error deleting state:", error);
      });
  };

  const EditData = (dataEdit) => {
    setId(dataEdit.id);
    setStateName(dataEdit.stateName);
    setCountryId(dataEdit.countryId);
    setBtnChange("saveChange");
  };

  return (
    <div className="container justify-content-center w-50 vh-100 mt-5">
      <form
        className="border border-warning w-50 vh-auto my-3 ms-5 me-5"
        onSubmit={AddState}
      >
        <div className="text-center bg-danger my-0 mx-0">
          <h5 className="text-white">Manage State</h5>
        </div>
        <div className="mb-3 text-center my-3 me-3">
          <label htmlFor="state" className="form-label col-4 text-end">
            <strong>State:</strong>
          </label>
          <input
            type="text"
            className="col-7"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            id="state"
            placeholder="Enter State"
            required
          />
        </div>
        <div className="mb-3 text-center my-3 me-3">
          <label htmlFor="country" className="form-label col-4 text-end">
            <strong>Country:</strong>
          </label>
          <select
            className="col-7"
            id="country"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            <option value="0">India</option>
            <option value="1">United States</option>
            <option value="2">Australia</option>
            <option value="3">Bhutan</option>
            <option value="4">Nepal</option>
          </select>
        </div>
        <div className="text-center mb-2">
          <button type="submit" className="btn btn-success">
            {btnChange === "submit" ? "Add State" : "Save Changes"}
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
              <th>Country Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(user) &&
              user.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.stateName}</td>
                  <td>{val.countryId}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => EditData(val)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => DeleteData(val.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default State;
