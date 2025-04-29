import axios from "axios";
import React, { useEffect, useState } from "react";
import validators from "../utils/validators";

const VendorQuotes = () => {
  const [rfps, setRfps] = useState();
  const [showQuote, setShowQuote] = useState(true);
  const [id, setId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://velocity-backend-8kea.onrender.com/rfpsForVendor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRfps(res.data.filteredRFPs))
      .catch((err) => console.log(err));
  }, []);

  console.log({ rfps });

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    totalPrice: "",
    description: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    newErrors.totalPrice = validators.validateRequired(
      formData.totalPrice,
      "Total Price"
    );

    newErrors.description = validators.validateRequired(
      formData.description,
      "Description"
    );

    newErrors.quantity = validators.validateRequired(
      formData.quantity,
      "Quantity"
    );

    newErrors.price = validators.validateRequired(formData.price, " Price");

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      const newformData = new FormData();

      newformData.append("price", formData.price);
      newformData.append("rfpId", id);
      newformData.append("totalPrice", formData.totalPrice);
      newformData.append("description", formData.description);
      newformData.append("quantity", formData.quantity);
      const token = localStorage.getItem("token");

      //   console.log("Submitting form: ", formData);
      axios
        .post("https://velocity-backend-8kea.onrender.com/submitQuotation", newformData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(
          (res) => console.log(res.data),
          axios
            .patch(`https://velocity-backend-8kea.onrender.com/appliedRfp/${id}`)
            .then((res) => console.log("Status Updated"))
            .catch((err) => console.log("Err", err)),
          setShowQuote(true)
        )
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="main-content mt-0">
      {showQuote ? (
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-10">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 font-size-18">RFP List</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/dashboard">Home</a>
                      </li>
                      <li className="breadcrumb-item active">RFP List</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10">
                <div className="card">
                  <div className="card-body">
                    <div className="TableHeader">
                      <div className="row">
                        <div className="col-lg-3">
                          <h4 className="card-title">RFP</h4>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table
                        className="table mb-0 listingData dt-responsive"
                        id="datatable"
                      >
                        <thead>
                          <tr>
                            <th>RFP No.</th>
                            <th>RFP Title</th>
                            <th>RFP Last Date</th>
                            <th>Min Amount</th>
                            <th>Max Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rfps?.map((rfp, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{rfp.itemname}</td>
                              <td>
                                {new Date(rfp.date).toISOString().split("T")[0]}
                              </td>
                              <td>{rfp.min}</td>
                              <td>{rfp.max}</td>
                              <td>
                                {" "}
                                <span
                                  className={`badge badge-pill ${
                                    rfp.status === "open"
                                      ? "badge-success"
                                      : "badge-danger"
                                  }`}
                                >
                                  {rfp.status}
                                </span>
                              </td>
                              <td>
                                {" "}
                                <span
                                  className={` ${
                                    rfp.status === "open"
                                      ? "text-success"
                                      : "text-danger"
                                  }`}
                                  onClick={() => {
                                    rfp.status === "open" &&
                                      setShowQuote(false);
                                    setId(rfp._id);
                                  }}
                                >
                                  {rfp.status === "open"
                                    ? "Apply"
                                    : rfp.status === "close"
                                    ? "Closed"
                                    : "Applied"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* 
                    <div className="row pt-3">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to 5 of 5 entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7 dataTables_wrapper">
                        <div className="dataTables_paginate paging_simple_numbers">
                          <ul className="pagination">
                            <li className="paginate_button page-item previous disabled">
                              <a href="#" className="page-link">
                                Previous
                              </a>
                            </li>
                            <li className="paginate_button page-item active">
                              <a href="#" className="page-link">
                                1
                              </a>
                            </li>
                            <li className="paginate_button page-item next disabled">
                              <a href="#" className="page-link">
                                Next
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-content">
          <div className="row">
            <div className="col-9">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-14">RFP Create</h4>
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
              <div className="form-group col-5">
                <label>Vendor Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-danger">{errors.price}</p>}
              </div>

              <div className="form-group col-4">
                <label>Total Cost*</label>
                <input
                  type="number"
                  className="form-control"
                  id="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleChange}
                />
                {errors.totalPrice && (
                  <p className="text-danger">{errors.totalPrice}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-5">
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
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit Quote
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VendorQuotes;
