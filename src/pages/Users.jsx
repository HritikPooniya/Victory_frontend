import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [rfps, setrfps] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/quotations")
      .then((res) => setrfps(res.data.quotations))
      .catch((err) => console.log(err));
  }, []);

  console.log({ rfps });

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">RFP Quotes</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">RFP Quotes</li>
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
                        <h4 className="card-title">RFP Quotes</h4>
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
                          <th>Item Name</th>
                          <th>Vendor Id</th>
                          <th>Vendor Price</th>
                          <th>Quantity</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rfps?.map((rfp, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{rfp.rfpDetail.itemname}</td>
                            <td>{rfp.vendorDetails.firstname}</td>
                            <td>{rfp.price}</td>
                            <td>{rfp.quantity}</td>
                            <td>{rfp.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <div className="row pt-3">
                  <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info" role="status" aria-live="polite">
                      Showing 1 to 5 of 5 entries
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7 dataTables_wrapper">
                    <div className="dataTables_paginate paging_simple_numbers">
                      <ul className="pagination">
                        <li className="paginate_button page-item previous disabled">
                          <a href="#" className="page-link">Previous</a>
                        </li>
                        <li className="paginate_button page-item active">
                          <a href="#" className="page-link">1</a>
                        </li>
                        <li className="paginate_button page-item next disabled">
                          <a href="#" className="page-link">Next</a>
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

export default Users;
