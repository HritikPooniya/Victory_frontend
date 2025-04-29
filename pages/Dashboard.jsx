// Dashboard.js
import React from "react";
// import { useAppContext } from '../components/Context';

const Dashboard = () => {
  return (
    <div className="main-content mt-0">
      <div className="page-content">
        <div>
          <div className="row">
            <div className="col-8">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Dashboard</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <div>Welcome to RFP System.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
