import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LogIn from "./pages/logIn";
import VendorRegister from "./pages/vendorRegister";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RFPList from "./pages/RFPList";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Vendors from "./pages/Vendors";
import AddCategory from "./pages/AddCategory";
import Context from "./components/Context";
import AddRFP from "./pages/AddRFP";
import VendorQuotes from "./pages/VendorQuotes";
import PrivateRoute from "./utils/PrivateRoute";

const AppLayout = () => {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/VendorRegister"];
  const shouldHideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className={`app-container ${shouldHideLayout ? "auth-layout" : ""}`}>
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/VendorRegister" element={<VendorRegister />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "vendor"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/vendors"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Vendors />
              </PrivateRoute>
            }
          />

          <Route
            path="/vendors"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Vendors />
              </PrivateRoute>
            }
          />

          <Route
            path="/rfp"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <RFPList />
              </PrivateRoute>
            }
          />

          <Route
            path="/quotes"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Users />
              </PrivateRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Categories />
              </PrivateRoute>
            }
          />

          <Route
            path="/addCategories"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddCategory />
              </PrivateRoute>
            }
          />

          <Route
            path="/rfp/addrfp"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddRFP />
              </PrivateRoute>
            }
          />

          <Route
            path="vendorQuotes"
            element={
              <PrivateRoute allowedRoles={["vendor"]}>
                <VendorQuotes />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Context>
        <AppLayout />
      </Context>
    </Router>
  );
}

export default App;
