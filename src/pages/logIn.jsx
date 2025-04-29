import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../components/Context";
import validators from "../utils/validators";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { logIn, setLogin } = useAppContext();

  const role = localStorage.getItem("role");
  useEffect(() => {
    if (role) {
      navigate("/dashboard");
    }
  }, [navigate,role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newformData = new FormData();

    const newErrors = {};

    newErrors.email = validators.validateEmail(email, "email");
    newErrors.password = validators.validateRequired(password, "Password");

    setErrors(newErrors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    newformData.append("email", email);
    newformData.append("password", password);

    await axios
      .post("http://localhost:5003/login", newformData)
      .then((response) => {
        console.log("register successful:", response.data);
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem("role", response?.data.role || "user");
        setLogin(!logIn);
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.response?.data.message);

        console.error(
          "Register failed:",
          error.response?.data || error.message
        );
      });
  };

  console.log({ logIn });

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Sign in to continue</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {errors.email && (
                        <p className="text-danger">{errors.email}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="userpassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="userpassword"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {errors.password && (
                        <p className="text-danger">{errors.password}</p>
                      )}
                    </div>

                    <div className="mt-3">
                      <button
                        className="btn btn-primary btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                  <div className="mt-3 d-flex justify-content-end">
                    <a href="/VendorRegister">Register as Vendor</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
