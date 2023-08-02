import axios from "axios";
import { useState } from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";
import "../login.css";
import { Navbar, Modal,Button } from "react-bootstrap";
const api = axios.create({
    baseURL: "https://healthease-production.up.railway.app/",
});

export default function Login(props) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [patName, setPatName] = useState("");
    const [showError, setShowError]= useState(false);
    const navigate=useNavigate();
       const handleLogout=()=>{
        localStorage.removeItem("Patient");
        navigate("/");
    }
    const handleCloseError = () => {

        setShowError(false);
    
      };
    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/loginpatient/${username}`, {
                params: { password },
            });
            console.log(response.data);
            localStorage.setItem("Patient", JSON.stringify(response.data));
            navigate("/");
        }
        catch (e) {
            console.log(e.response.data);
            // alert("Worng emailId or password");
            setShowError(true);
        }

    }
    return (
           
        <div style={{ backgroundImage: `url(${"https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61803.jpg?w=826&t=st=1689248610~exp=1689249210~hmac=d38a0329dbc7197350b799728f48bb304df3eb39ff2277c11687a5f723c1b4cc"})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
             <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark " >
            <div class="container-fluid">
                <a class="navbar-brand mt-2" href="/">
                    <h3>
                    HealthEase
                        </h3> 
                        
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
                <div class="collapse navbar-collapse justify-content-start" id="navbarNavAltMarkup">

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
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
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
                className="container d-flex justify-content-center align-items-center "
                style={containerStyle}
            >
                <div className="card shadow" style={cardStyle}>
                    <div className="card-body">
                        <p className="lead">Login 🩺</p>
                        <form onSubmit={handleChange}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                   UserName                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={password}

                                    onChange={(e) => setPassword(e.target.value)}

                                    required

                                />

                            </div>

                            <div className="d-flex justify-content-evenly">
                                <button type="submit" className="btn btn-primary " style={{ height: "40px", marginTop: "6px" }}>

                                    Let's Go!

                                </button>



                                <NavLink className="nav-link" to="/register">

                                    <button type="button" className="btn btn-success">

                                        Sign Up

                                    </button>

                                </NavLink>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
            <Modal show={showError} onHide={handleCloseError}>

        <Modal.Header closeButton>

          <Modal.Title>Login Failed</Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <p>Wrong email or password. Please try again.</p>

        </Modal.Body>

        <Modal.Footer>

          <Button vari      ant="info" onClick={handleCloseError}>

            Close

          </Button>

        </Modal.Footer>

      </Modal>
            
        </div>
    )

};
const containerStyle = {

    height: "89vh",

};




const cardStyle = {

    width: "400px",

    padding: "20px",

    backgroundColor: "#fff",

};