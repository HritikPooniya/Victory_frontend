import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRFPForm } from "../utils/RFPValidatorForm";

const AddRFP = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [vendor, setVendor] = useState();

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemname: "",
    description: "",
    quantity: "",
    min: "",
    max: "",
    date: "",
    vendors: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if ((id === "min" || id === "max" || id === "quantity") && value < 0) {
      alert("Please enter a valid number");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rfpErrors = validateRFPForm(formData);

    setErrors(rfpErrors);
    console.log({ errors });

    const newformData = new FormData();

    newformData.append("itemname", formData.itemname);
    newformData.append("min", formData.min);
    newformData.append("max", formData.max);
    newformData.append("description", formData.description);
    newformData.append("quantity", formData.quantity);
    newformData.append("vendors", formData.vendors);
    newformData.append("date", formData.date);
    newformData.append("Category", selectedCategory);

    if (Object.keys(errors).length === 0) {
      //   console.log("Submitting form: ", formData);
      axios
        .post("http://localhost:5003/createRFP", newformData)
        .then((res) => console.log(res.data), navigate("/rfp"))
        .catch((err) => console.log(err));
    }
  };

  const handleVendorChange = (e) => {
    const selectedCategory = e.target.value;

    const currentCategories = Array.isArray(formData.vendors)
      ? formData.vendors
      : [];

    if (!currentCategories.includes(selectedCategory)) {
      setFormData({
        ...formData,
        vendors: [...currentCategories, selectedCategory],
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5003/getCategories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5003/vendorsByCategory/${selectedCategory}`)
      .then((res) => {
        setVendor(res.data.vendors);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
      });
  }, [selectedCategory]);

  console.log({ vendor });

  return (
    <div className="main-content" style={{ marginLeft: "25%" }}>
      {selectedCategory === "" ? (
        <>
          <div className="row">
            <div className="col-9">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-14">RFP Select Category</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">RFP</li>
                    <li className="breadcrumb-item active">
                      RFP Select Category
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <h6 className="font-size-14 mt-3">Category</h6>

          <select
            className="category"
            name="category"
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((val, index) => {
              return (
                <option value={val.name} key={index}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-9">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-14">RFP Select Category</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">RFP</li>
                    <li className="breadcrumb-item active">RFP Create</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-3">
                <label>Item Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemname"
                  value={formData.itemname}
                  onChange={handleChange}
                />
                {errors.itemname && (
                  <p className="text-danger">{errors.itemname}</p>
                )}
              </div>

              <div className="form-group col-3">
                <label>Item Description*</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="text-danger">{errors.description}</p>
                )}
              </div>

              <div className="form-group col-2">
                <label>Last Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <p className="text-danger">{errors.date}</p>}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-4">
                <label>Minimum Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="min"
                  value={formData.min}
                  onChange={handleChange}
                />
                {errors.min && <p className="text-danger">{errors.min}</p>}
              </div>

              <div className="form-group col-4">
                <label>Maximum Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="max"
                  value={formData.max}
                  onChange={handleChange}
                />
                {errors.max && <p className="text-danger">{errors.max}</p>}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-4">
                <label>Quantity*</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && (
                  <p className="text-danger">{errors.quantity}</p>
                )}
              </div>

              <div className="form-group col-4">
                <label>Vendors*</label>
                <select
                  multiple
                  className="form-control"
                  id="vendors"
                  name="vendors"
                  value={formData.vendors}
                  onChange={handleVendorChange}
                >
                  {vendor
                    ?.filter((val) => val.status === "Active")
                    .map((val, index) => (
                      <option className="my-2" key={index} value={val.email}>
                        {val.firstname} {val.lastname}
                      </option>
                    ))}
                </select>
                {errors.vendors && (
                  <p className="text-danger">{errors.vendors}</p>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit RFP
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddRFP;
