import React from "react";
import VendorList from "../components/VendorList";

const Vendors = () => {
  return (
    <div className="d-flex mx-2">
      <div className="main-content">
        <h4 className="mb-4">Vendors List</h4>
        <VendorList />
      </div>
    </div>
  );
};

export default Vendors;
