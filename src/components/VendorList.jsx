import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get('https://velocity-backend-8kea.onrender.com/vendors')
      .then(res => {
        setVendors(res.data.users);
      })
      .catch(err => {
        console.error('Error fetching vendors:', err);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Vendors</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr style={{background:'#27333a',color:'#ffffff'}}>
                <th>S. No.</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>{index + 1}</td>
                  <td>{vendor.firstname}</td>
                  <td>{vendor.lastname}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.mobile}</td>
                  <td>
                    <span className={`badge badge-pill badge-${vendor.status === 'Active' ? 'success' : 'danger'}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className='text-center'>
                    {/* <a href={`/editvendor/${vendor._id}`} className="text-primary mr-2" title="Edit">
                      <i className="mdi mdi-pencil"></i>
                    </a> */}
                    <div className={`${vendor.status !== 'Active' ? 'text-success' : 'text-danger'}`}
                    onClick={() => {
                      axios
                        .patch(
                          `https://velocity-backend-8kea.onrender.com/updateVendorStatus/${vendor._id}`
                        )
                        .then((res) => {
                          setVendors((prevVendor) =>
                            prevVendor.map((item) =>
                              item._id === vendor._id
                                ? { ...item, status: item.status === "Active" ? "Deactive" : "Active" }
                                : item
                            )
                          );
                        })
                        .catch((err) => console.log("Err", err));
                    
                    }}>
                      <i className="mdi mdi-circle-off-outline"></i>
                      </div>
                  </td>
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
  );
};

export default VendorList;
