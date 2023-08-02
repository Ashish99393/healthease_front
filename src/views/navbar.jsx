import { useEffect, useState} from "react"
import {Link,useNavigate } from "react-router-dom";
export default function Navbar() {
    const [patName, setPatName] = useState("");
    const navigate=useNavigate();
    const [patId, setPatId] = useState("");
    useEffect(() => {
        const pat = JSON.parse(localStorage.getItem("Patient"));
        if (pat) {
            setPatName(pat.name);
            setPatId(pat.patientId);
        }
    }, []);
    const handleLogout=()=>{
        localStorage.removeItem("Patient");
        navigate("/");
    }
    const handleAny= () => {

        navigate(`/appointment/patient/${patId}`);

    }
    return (
        
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
                            <a class="nav-link" aria-disabled="true" onClick={handleAny}>
                            Booking History
                        </a>
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
    );
}
