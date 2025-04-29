import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validators from "../utils/validators";

const VendorRegister = () => {
  const navigate = useNavigate();

  const [category, setCategories] = useState();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    revenue: "",
    noofemployees: "",
    gstno: "",
    panno: "",
    phoneno: "",
    categories: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    if ((id === "revenue" || id === "noofemployees") && value < 0) {
      alert("Please enter a valid number");
      return;
    }
    if (id === "gstno" || id === "panno") {
      setFormData({ ...formData, [id]: value.toUpperCase() });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    const currentCategories = Array.isArray(formData.categories)
      ? formData.categories
      : [];

    let updatedCategories;
    if (currentCategories.includes(selectedCategory)) {
      updatedCategories = currentCategories.filter(
        (category) => category !== selectedCategory
      );
    } else {
      updatedCategories = [...currentCategories, selectedCategory];
    }

    setFormData({
      ...formData,
      categories: updatedCategories,
    });
  };

  const fieldValidators = () => {
    const newErrors = {};

    newErrors.firstname = validators.validateRequired(
      formData.firstname,
      "First name"
    );
    newErrors.lastname = validators.validateRequired(
      formData.lastname,
      "Last name"
    );
    newErrors.email = validators.validateEmail(formData.email);
    newErrors.password = validators.validateRequired(
      formData.password,
      "Password"
    );
    newErrors.confirmpassword = validators.validatePasswordMatch(
      formData.password,
      formData.confirmpassword
    );
    newErrors.revenue = validators.validateRequired(
      formData.revenue,
      "Revenue"
    );
    newErrors.noofemployees = validators.validateRequired(
      formData.noofemployees,
      "Number of employees"
    );
    newErrors.gstno = validators.validateGST(formData.gstno, "GST number");
    newErrors.panno = validators.validatePAN(formData.panno, "PAN number");
    newErrors.phoneno = validators.validatePhone(formData.phoneno);
    newErrors.categories =
      formData.categories.length === 0 ? "Select at least one category" : "";

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v !== "")
    );

    setErrors(filteredErrors);

    return Object.keys(filteredErrors).length === 0;
  };
  useEffect(() => {
    axios
      .get("https://velocity-backend-8kea.onrender.com/getCategories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log("Form Data:", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fieldValidators()) {
      const newformData = new FormData();

      newformData.append("firstname", formData.firstname);
      newformData.append("lastname", formData.lastname);
      newformData.append("email", formData.email);
      newformData.append("password", formData.password);
      newformData.append("revenue", formData.revenue);
      newformData.append("no_of_employees", formData.noofemployees);
      newformData.append("gst_no", formData.gstno);
      newformData.append("pancard_no", formData.panno);
      newformData.append("mobile", formData.phoneno);
      newformData.append("category", formData.categories);

      await axios
        .post("https://velocity-backend-8kea.onrender.com/register", newformData)
        .then((response) => {
          toast.success("Register Succesfull!");
          navigate("/");
          console.log("register successful:", response.data);
        })
        .catch((error) => {
          alert(error.message);
          console.error(
            "Register failed:",
            error.response?.data || error.message
          );
        });
    } else {
      return;
    }
  };

  const [getCategories, setGetCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://velocity-backend-8kea.onrender.com/getCategories")
      .then((res) => {
        setGetCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching Categories:", err);
      });
  }, []);
  console.log({ getCategories });

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 col-lg-6 col-xl-8">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Register as Vendor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-4">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="firstname">First name*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            placeholder="Enter Firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                          />
                          {errors.firstname && (
                            <div className="text-danger">
                              {errors.firstname}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="lastname">Last Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            placeholder="Enter Lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                          />
                          {errors.lastname && (
                            <div className="text-danger">{errors.lastname}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Email*</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="password">Password*</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          {errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="confirmpassword">
                            Confirm Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmpassword"
                            placeholder="Confirm Password"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                          />
                          {errors.confirmpassword && (
                            <div className="text-danger">
                              {errors.confirmpassword}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="revenue">
                            Revenue (Last 3 Years in Lacs)*
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="revenue"
                            placeholder="Enter Revenue"
                            value={formData.revenue}
                            onChange={handleChange}
                          />
                          {errors.revenue && (
                            <div className="text-danger">{errors.revenue}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="noofemployees">
                            No of Employees*
                          </label>
                          <input
                            type="number"
                            min={0}
                            className="form-control"
                            id="noofemployees"
                            placeholder="No of Employees"
                            value={formData.noofemployees}
                            onChange={handleChange}
                          />
                          {errors.noofemployees && (
                            <div className="text-danger">
                              {errors.noofemployees}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="gstno">GST No*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="gstno"
                            placeholder="Enter GST No"
                            value={formData.gstno}
                            onChange={handleChange}
                          />
                          {errors.gstno && (
                            <div className="text-danger">{errors.gstno}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="panno">PAN No*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="panno"
                            placeholder="Enter PAN No"
                            value={formData.panno}
                            onChange={handleChange}
                          />
                          {errors.panno && (
                            <div className="text-danger">{errors.panno}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="phoneno">Phone No*</label>
                          <input
                            type="number"
                            className="form-control"
                            id="phoneno"
                            placeholder="Enter Phone No"
                            value={formData.phoneno}
                            onChange={handleChange}
                          />
                          {errors.phoneno && (
                            <div className="text-danger">{errors.phoneno}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          <label htmlFor="Categories">Categories*</label>

                          <select
                            multiple
                            className="form-control"
                            id="Categories"
                            name="Categories"
                            value={formData.categories}
                            onChange={handleCategoryChange}
                          >
                            {category?.map((val, index) => (
                              <option
                                className="mb-1"
                                value={val.name}
                                key={index}
                              >
                                {val.name}
                              </option>
                            ))}
                          </select>
                          {errors.categories && (
                            <div className="text-danger">
                              {errors.categories}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-2 mt-3 col-12">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </form>

                  <div class="d-flex justify-content-end">
                    <a href="/">Log In</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <p>
                &copy; RFP System <i className="mdi mdi-heart text-danger"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
