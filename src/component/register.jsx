import { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
// import Register '../views/register' ;
const api = axios.create({
  baseURL: "https://healthease-production.up.railway.app/",
});
export default function Register(props) {
  const [name, setname] = useState(""); // hooks
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [address, setAddress] = useState("");
  const [patName, setPatName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setShowSuccess(false);

    navigate("/login");
  };

  const handleCloseError = () => {
    setError("");
  };

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Patient");
    navigate("/");
  };

  const handleChange = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/addpatient/", {
        name,
        password,
        email,
        age,
        address,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (e) {
      setError(e.response.data);
      setAddress("");
      setAge("");
      setEmail("");
      setPassword("");
      setname("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${"https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61803.jpg?w=826&t=st=1689248610~exp=1689249210~hmac=d38a0329dbc7197350b799728f48bb304df3eb39ff2277c11687a5f723c1b4cc"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3 ">
        <div class="container-fluid">
          <a class="navbar-brand mt-2" href="/">
            <h3>HealthEase</h3>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-start"
            id="navbarNavAltMarkup"
          >
            <div className="d-flex">
              <div class="navbar-nav">
                <Link class="nav-link" aria-disabled="true" to="/">
                  Home
                </Link>
                <Link class="nav-link" aria-disabled="true" to="/doctors">
                  All Doctors
                </Link>
              </div>
            </div>
          </div>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="d-flex">
              <div class="navbar-nav ml-auto">
                {patName ? (
                  <>
                    <a class="nav-link" aria-disabled="true">
                      {patName}
                    </a>
                    <a class="nav-link" href="/" onClick={handleLogout}>
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                    <a class="nav-link" href="/register">
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={containerStyle}
      >
        <div className="card shadow" style={cardStyle}>
          <p className="lead">Sign up! Here 🤗</p>

          <div className="card-body">
            <form onSubmit={handleChange}>
              <div className="">
                <label htmlFor="name" className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label class="form-label " for="age">
                Age
              </label>
              <input
                type="text"
                class="form-control"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={1}
                required
              ></input>

              <div className="mb-3 mt-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>

                <textarea
                  className="form-control"
                  id="address"
                  rows="1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-flex justify-content-evenly">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ height: "38px", marginTop: "7px" }}
                >
                  Submit
                </button>

                <NavLink className="nav-link" to="/login">
                  <button type="button" className="btn btn-secondary">
                    Login
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Successful</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Your registration was successful. Redirecting to the login page...
          </p>
        </Modal.Body>
      </Modal>
      <Modal show={error !== ""} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Message: {error.errorMessage}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
const containerStyle = {
  height: "87vh",
};

const cardStyle = {
  width: "400px",

  padding: "20px",

  backgroundColor: "#fff",
};
