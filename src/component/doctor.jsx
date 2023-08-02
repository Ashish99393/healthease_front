import axios from "axios";
import "../style.css";
import { useState, useEffect } from "react";
import {
  FaSearch,
} from "react-icons/fa";
import {
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../views/navbar";
import Footer from "../views/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const api = axios.create({
  baseURL: "https://healthease-production.up.railway.app/",
});

export default function Doctor(props) {
  const [doctors, setDoctor] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [docId, setDocId] = useState();
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/alldoctors");
        setDoctor(response.data);
        
      } catch (e) {
        console.log(e.response.data);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = async () => {
    if (searchValue.length === 0 ) {
      toast.error(`Please enter Specialization`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await api.get(`/searchspecialization/${searchValue}`);

      setDoctor(response.data);
    } catch (error) {
        
        // if (searchValue.length === 0) {
        //     console.log("error");
        //     return;
        // }
      toast.error(`${searchValue} is not available😢`, {
        position: "top-right",

        autoClose: 3000,

        hideProgressBar: false,

        closeOnClick: true,

        pauseOnHover: true,

        draggable: true,

        progress: undefined,
      });
    }
  };
  return (
    <div>
      <Navbar />
      <h2 className="container justify-content-center d-flex mt-2">
        <span>ALL Doctors</span>{" "}
      </h2>
      <div
        className="container"
        style={{ marginTop: "15px", marginBottom: "15px" }}
      >
        <div
          style={{
            padding: "10px 20px 10px 20px",

            display: "flex",

            alignItems: "center",

            justifyContent: "end",

            borderRadius: "6px",
          }}
        >
          <Form className="d-flex ms-lg-3" style={{ width: "300px" }}>
            <FormControl
              type="text"
              placeholder="Search By Specialization"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />

            <Button variant="outline-light mx-1" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </Form>

          <div className="dropdown"></div>
        </div>
      </div>
      <div className="container  mt-4">
        <div className="row ">
          {doctors.map((doctor) => (
            <div
              class="card d-flex mb-2 shadow my-card"
              style={{ margin: "auto", height: "auto", opacity: "0.65" }}
              key={doctor.docId}
            >
              <div class="card-body d-flex ">
                <img
                  className="rounded img-thumbnail d-block"
                  src="https://img.freepik.com/free-vector/beautiful-young-female-doctor-crossed-arms-cartoon-illustration_56104-483.jpg?w=826&t=st=1689158053~exp=1689158653~hmac=2ab27e6896f7d773b7779142aa4e2a34910f0ea190d4493eb82bd8395f05eaf2"
                  class="card-img-top "
                  style={{ width: "26vh", height: "20vh" }}
                  alt="..."
                />

                <div
                  className=""
                  style={{ margin: "auto", marginLeft: "22px" }}
                >
                  <div className="text-left">
                    <h5 class="card-title">{doctor.name}</h5>
                    <p class="card-text">{doctor.specialization}</p>
                    <p class="card-text">{doctor.availableDays}</p>
                  </div>
                </div>
                <div class="d-flex align-item-center">
                  <button
                    type="submit"
                    class="btn btn-success"
                    onClick={() => navigate(`doctor/${doctor.docId}`)}
                    style={{
                      height: "auto",
                      margin: "auto",
                      backgroundColor: "#dc3685",
                    }}
                  >
                    {" "}
                    Book Appointment{" "}
                  </button>
                  {/* <a href="#" class="btn btn-primary" >Book Appointment</a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
