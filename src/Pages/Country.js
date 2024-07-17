import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [countryName, setCountryName] = useState("");
  const [btnChange, setBtnChange] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7272/api/Country/GetAllCountries")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, []);

  const AddCountry = (e) => {
    if (btnChange === "Submit") {
      axios
        .post("https://localhost:7272/api/Country/AddCountry", {
          id,
          countryName,
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
        .put("https://localhost:7272/api/Country/UpdateCountry", {
          id,
          countryName,
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
      .delete("https://localhost:7272/api/Country/DeleteCountry?Id=" + id)
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
    setCountryName(dataEdit.countryName);
    setBtnChange("saveChange");
  };
  return (
    <>
      <div className="container justify-content-center w-50 vh-100 mt-5">
        <form
          className=" border border-warning w-50 vh-auto my-3 ms-5 me-5"
          onSubmit={AddCountry}
        >
          <div className=" text-center bg-danger my-0 mx-0">
            <h5 className="text-white">Manage Country</h5>
          </div>
          <div class="mb-3 text-center my-3">
            <label htmlFor="email" className="form-label col-4 text-end">
              <strong>Country:</strong>
            </label>
            <input
              type="email"
              class="col-7"
              id="exampleInputEmail1"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter country"
            />
          </div>

          <div className="text-center mb-2">
            <button type="button" className="btn btn-success">
              Add Country
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
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(user) &&
                user.map((val) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.countryName}</td>

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
export default Country;
