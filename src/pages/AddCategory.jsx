import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (name === "") {
      newErrors.name = "Name is required";
    }

    setError(newErrors);
    console.log(error);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }
    const newformData = new FormData();

    newformData.append("name", name);

    await axios
      .post("http://localhost:5003/addCategory", newformData)
      .then((response) => {
        console.log("register successful:", response.data);
        navigate("/categories");
      })
      .catch((error) => {
        alert(error.response?.data.error);
        console.error(
          "Register failed:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Add Cateogy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {error.name && (
                        <p className="text-danger">{error.name}</p>
                      )}
                    </div>

                    <div className="mt-3">
                      <button
                        className="btn btn-primary btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Add Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
