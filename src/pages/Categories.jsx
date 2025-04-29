import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getData = () => {
    axios
      .get("https://velocity-backend-8kea.onrender.com/getCategories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
      });
  };

  useEffect(() => {
    getData();
  }, [categories]);

  return (
    <div className="main-content mt-0">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Category List</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Category List</li>
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
                        <h4 className="card-title">Category</h4>
                      </div>
                      <div className="col-lg-9 text-right">
                        <a
                          href="addCategories"
                          className="btn btn-sm btn-success"
                        >
                          <i className="mdi mdi-plus"></i> Add Categories
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table
                      className="table mb-0 listingData dt-responsive"
                      id="datatable"
                    >
                      <thead>
                        <tr style={{ background: "#27333a", color: "#ffffff" }}>
                          <th>S. No.</th>
                          <th>Category name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((vendor, index) => (
                          <tr key={vendor._id}>
                            <td>{index + 1}</td>
                            <td>{vendor.name}</td>
                            <td>
                              {" "}
                              <span
                                className={`badge badge-pill ${
                                  vendor.status === "Active"
                                    ? "badge-success"
                                    : "badge-danger"
                                }`}
                              >
                                {vendor.status}
                              </span>
                            </td>
                            <td>
                              {" "}
                              <span
                                className={` ${
                                  vendor.status !== "Active"
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                                onClick={() => {
                                  axios
                                    .patch(
                                      `https://velocity-backend-8kea.onrender.com/categoryStatus/${vendor._id}`
                                    )
                                    .then(
                                      (res) => console.log("Status Updated")
                                      // getData()
                                    )
                                    .catch((err) => console.log("Err", err));
                                }}
                              >
                                {vendor.status === "Active"
                                  ? "Deactivate"
                                  : "Activate"}
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
    </div>
  );
};

export default Categories;
