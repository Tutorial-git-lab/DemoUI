import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [btnChange, setBtnChange] = useState("Submit");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    axios
      .get("https://localhost:7272/api/Country/GetAllCountries")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addCountry = (e) => {
    e.preventDefault();
    if (btnChange === "Submit") {
      axios
        .post("https://localhost:7272/api/Country/AddCountry", {
          countryName: countryName,
        })
        .then((result) => {
          console.log(result);
          alert("Country added successfully");
          fetchCountries(); // Refresh country list
          setCountryName("");
        })
        .catch((error) => {
          console.error("Error adding country:", error);
        });
    } else {
      axios
        .put("https://localhost:7272/api/Country/UpdateCountry", {
          id: id,
          countryName: countryName,
        })
        .then((result) => {
          console.log(result);
          alert("Country updated successfully");
          fetchCountries(); // Refresh country list
          setCountryName("");
          setBtnChange("Submit");
        })
        .catch((error) => {
          console.error("Error updating country:", error);
        });
    }
  };

  const deleteCountry = (id) => {
    axios
      .delete(`https://localhost:7272/api/Country/DeleteCountry?Id=${id}`)
      .then((result) => {
        console.log(result);
        alert("Country deleted successfully");
        fetchCountries(); // Refresh country list
      })
      .catch((error) => {
        console.error("Error deleting country:", error);
      });
  };

  const editCountry = (dataEdit) => {
    setId(dataEdit.id);
    setCountryName(dataEdit.countryName);
    setBtnChange("saveChange");
  };

  return (
    <div className="container justify-content-center w-50 vh-100 mt-5">
      <form
        className="border border-warning w-50 vh-auto my-3 ms-5 me-5"
        onSubmit={addCountry}
      >
        <div className="text-center bg-danger my-0 mx-0">
          <h5 className="text-white">Manage Country</h5>
        </div>
        <div className="mb-3 text-center my-3">
          <label htmlFor="countryName" className="form-label col-4 text-end">
            <strong>Country:</strong>
          </label>
          <input
            type="text"
            className="col-7"
            id="countryName"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="Enter country"
            required
          />
        </div>

        <div className="text-center mb-2">
          <button type="submit" className="btn btn-success">
            {btnChange === "Submit" ? "Add Country" : "Save Changes"}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.countryName}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => editCountry(val)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCountry(val.id)}
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

export default Country;
