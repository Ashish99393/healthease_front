import axios from "axios";
import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Navbar from "../views/navbar";
import Footer from "../views/footer";
import {
  Modal,
  Button,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const api = axios.create({
  baseURL: "https://healthease-production.up.railway.app/",
});

const SingleDoctor = () => {
  const [reason, setReason] = useState("");
  const [appDate, setAppDate] = useState("");
  const [patId, setPatId] = useState("");
  const [doc, setDoc] = useState(null);
  const [docId, setDocId] = useState("");
  const { doctorId } = useParams();
  const [review, setReview] = useState([]);
  const [comments, setComments] = useState("");
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const pat = JSON.parse(localStorage.getItem("Patient"));
  useEffect(() => {
    if (pat !== null) {
      localStorage.setItem("DocId", JSON.stringify(doctorId));
      setDocId(JSON.parse(localStorage.getItem("DocId")));
      setPatId(pat.patientId);
    }
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctor/${doctorId}`);
        setDoc(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchDoctor();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await api.get(`/getallreview/${doctorId}`);
        setReview(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReview();
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patId) {
      setShowLoginModal(true);
      return;
    }
    if (reason === "" || appDate === "") {
      toast.error(`Please enter a reason and date`, {
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
      await api.post(`/bookappointment`, {
        docId,
        patId,
        appDate,
        reason,
      });
      console.log("Success");
      navigate(`/appointment/patient/${patId}`);
    } catch (error) {
      
      toast.error(`${error.response.data.errorMessage}`, {
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

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!patId) {
      setShowLoginModal(true);
      return;
    }
    if(comments===""){
        toast.error(`Please enter a something`, {
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
      const response = await api.post(`/addreview`, {
        docId,
        patId,
        comments,
      });
      
      setReview([...review, response.data]); // add new review to existing list
      setComments(""); // clear the input field
      toast.success(`Review added 🤗`, {
        position: "top-right",

        autoClose: 3000,

        hideProgressBar: false,

        closeOnClick: true,

        pauseOnHover: true,

        draggable: true,

        progress: undefined,
    });
      
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Navbar />

      {doc && (
        <div className="container d-flex ">
          <div
            className="card align-item-center mt-4 shadow "
            style={{ width: "100%", opacity: "0.90" }}
          >
            <h1 className="text-center m-4"> Appointment</h1>
            <form className="card-body d-flex">
              <img
                className="rounded img-thumbnail d-block"
                src="https://img.freepik.com/free-vector/beautiful-young-female-doctor-crossed-arms-cartoon-illustration_56104-483.jpg?w=826&t=st=1689158053~exp=1689158653~hmac=2ab27e6896f7d773b7779142aa4e2a34910f0ea190d4493eb82bd8395f05eaf2"
                class="card-img-top "
                style={{ width: "38vh", height: "30vh" }}
                alt="..."
              />
              <div className="row mx-3" style={{ width: "45%" }}>
                <h2>{doc.name}</h2>
                <h5>Specialization: {doc.specialization}</h5>
                <h5>
                  Available on days:{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    {doc.availableDays}
                  </span>{" "}
                </h5>
              </div>
              <div className="row" style={{ width: "30%" }}>
                <label htmlFor="reasons">Reason</label>
                <input
                  type="text"
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
                <br />
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name=""
                  id=""
                  onChange={(e) => setAppDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
                <div class="d-flex align-item-center">
                  <button
                    type="submit"
                    class="btn btn-success mt-3"
                    onClick={handleSubmit}
                    style={{ height: "auto", margin: "auto" }}
                  >
                    Book Appointment
                  </button>
                  {/* <a href="#" class="btn btn-primary" >Book Appointment</a> */}
                </div>
              </div>
              {/*  */}
            </form>
          </div>
        </div>
      )}
      <div className="container mt-3">
        <div className="card align-item-center" style={{ width: "100%" }}>
          {/* <h1 className="text-center">Review</h1> */}
          <div id="carouselExampleCaptions" class="carousel">
            <div class="carousel-indicators">
              {review.map((reviewItem, index) => (
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  key={index}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {review.map((reviewItem, index) => (
                <div
                  key={index}
                  className={
                    index === 0 ? "carousel-item active" : "carousel-item"
                  }
                >
                  <img
                    src="https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?w=900&t=st=1689243122~exp=1689243722~hmac=bc4bdf2e4017e62eb30a05c2fd099d0c2837e58d6b9fe5a745da703533788aa9"
                    className="d-block w-100"
                    style={{ height: "40vh" }}
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h1 className="text-center mb-5" style={{ color: "black" }}>
                      Review
                    </h1>
                    <h3 style={{ color: "black", fontFamily: "inherit" }}>
                      Patient Name: {reviewItem.patientName}
                    </h3>
                    <h4 style={{ color: "black", fontFamily: "inherit" }}>
                      Review: {reviewItem.review}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="container d-flex mt-4 mb-4">
            <label htmlFor="reviews">
              {" "}
              <h3>Add Review</h3>{" "}
            </label>
            <input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ marginLeft: "2vh", width: "40%" }}
            />
            <button
              type="submit "
              class="btn btn-success mx-3"
              onClick={handleSubmit1}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in to book appointment.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SingleDoctor;
