import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/app.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  console.log({ role });
  return (
    <div className="sidebar">
      <div className="logo">Velocity</div>
      <ul className="sidebar-menu">
        {role === "admin" ? (
          <>
            {" "}
            <li>
              <NavLink to="/dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/vendors">Vendors</NavLink>
            </li>
            <li>
              <NavLink to="/rfp">RFP Lists</NavLink>
            </li>
            <li>
              <NavLink to="/quotes">RFP Quotes</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
          </>
        ) : (
          <>
           <li>
              <NavLink to="/dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/vendorQuotes" end>
                RFP For Quotes
              </NavLink>
            </li></>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
