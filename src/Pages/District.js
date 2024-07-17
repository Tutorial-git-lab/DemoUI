import axios from "axios";
import React, { useEffect, useState } from "react";

const District = () => {
  const [id, setId] = useState();
  const [user, setUser] = useState();
  const [districtName, setDistrictName] = useState();
  const [stateId, setStateId] = useState();
  const [countryId, setCountryId] = useState();
  const [btnChange, setBtnChange] = useState();

  useEffect(() => {
    axios
      .get("https://localhost:7272/api/District/GetAllDistricts")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, []);

  const AddDistrict = (e) => {
    if (btnChange === "Submit") {
      axios
        .post("https://localhost:7272/api/District/AddDistrict", {
          id,
          districtName,
          stateId,
          countryId,
        })
        .then((result) => {
          console.log(result);
          alert("data added");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put("https://localhost:7272/api/District/UpdateDistrict", {
          id,
          districtName,
          stateId,
          countryId,
        })
        .then((result) => {
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
      .delete("https://localhost:7272/api/District/DeleteDistrict?Id=" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EditData = (dataEdit) => {
    setId(dataEdit.id);
    setDistrictName(dataEdit.districtName);
    setStateId(dataEdit.stateId);
    setCountryId(dataEdit.countryId);
    setBtnChange("saveChange");
  };
  return (
    <>
      <div className="container justify-content-center w-50 vh-100 mt-5">
        <form
          className=" border border-warning w-50 vh-auto my-3 ms-5 me-5"
          onSubmit={AddDistrict}
        >
          <div className=" text-center bg-danger my-0 mx-0">
            <h5 className="text-white">Manage District</h5>
          </div>
          <div className="mb-3 text-center my-3 me-3">
            <label htmlFor="district" className="form-label col-4 text-end">
              <strong>District:</strong>
            </label>
            <input
              type="text"
              class="col-7"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter State"
            />
            <div className="mb-3 text-center my-3 me-3">
              <label htmlFor="state" className="form-label col-4 text-end">
                <strong>State:</strong>
              </label>
              <select
                name="select"
                id="select123"
                className="col-7"
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
              >
                <option value="0">select</option>
                <option value="0">Madhya Pradesh</option>
                <option value="1">Maharashtra</option>
                <option value="2">Panjab</option>
                <option value="3">Hariyana</option>
                <option value="4">Chhatishgarh</option>
              </select>
            </div>
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
              Add District
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
                <th>District Name</th>
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
                      <td>{val.districtName}</td>
                      <td>{val.stateId}</td>
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
      ;
    </>
  );
};
export default District;
