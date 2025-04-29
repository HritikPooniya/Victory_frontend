import axios from "axios";
import React, { useEffect, useState } from "react";

const RFPList = () => {
  const [rfps, setRfps] = useState();

  const getRfps = () => {
    axios
      .get("http://localhost:5003/rfps")
      .then((res) => setRfps(res.data.rfps))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRfps();
  }, []);

  return (
    <div className="main-content">
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
                      <div className="col-lg-9 text-right">
                        <a
                          href="/rfp/addrfp"
                          className="btn btn-sm btn-success"
                        >
                          <i className="mdi mdi-plus"></i> Add RFP
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
                                  rfp.status !== "open"
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                                onClick={() => {
                                  axios
                                    .patch(
                                      `http://localhost:5003/updateRFPStatus/${rfp._id}`
                                    )
                                    .then((res) => {
                                      setRfps((prevRfps) =>
                                        prevRfps.map((item) =>
                                          item._id === rfp._id
                                            ? {
                                                ...item,
                                                status:
                                                  item.status === "open"
                                                    ? "closed"
                                                    : "open",
                                              }
                                            : item
                                        )
                                      );
                                    })
                                    .catch((err) => console.log("Err", err));
                                }}
                              >
                                {rfp.status === "open" ? "Close" : "Open"}
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

export default RFPList;
