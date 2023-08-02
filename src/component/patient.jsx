import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../views/navbar";
import { Button, Card, Container } from "react-bootstrap";
import "../patient.css";
import Footer from "../views/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const api = axios.create({
  baseURL: "https://healthease-production.up.railway.app/",
});

export default function Patient() {
  const [patientId, setPatientId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const pat = JSON.parse(localStorage.getItem("Patient"));
    setPatientId(pat.patientId);
  }, []);

  useEffect(() => {
    fetchPatient();
  }, [patientId]);

  const fetchPatient = async () => {
    try {
      const response = await api.get(`/getappointment/${patientId}`);
      setAppointments(response.data);
      setShowDetails(
        response.data.reduce(
          (acc, appointment) => ({
            ...acc,
            [appointment.appId]: false,
          }),
          {}
        )
      );
    } catch (error) {}
  };
  const handleCancelAppointment = async (appId) => {
    try {
      const pat = JSON.parse(localStorage.getItem("Patient"));
      const patId = pat.patientId;
      await api.put(`/cancelappointment/${appId}?patId=${patId}`);
      fetchPatient();
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <Navbar />
      <Container className="mt-4" style={{ minHeight: "44.3vh" }}>
        {appointments &&
          appointments.map((appointment) => (
            <Card key={appointment.appId} className="mb-3 shadow">
              <Card.Body
                className="d-flex justify-content-between"
                style={{ marginBottom: "-35px" }}
              >
                <div>
                  <Card.Title>
                    Appointment ID: {appointment.appId}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Appointment Date:
                    {appointment.appDate}
                  </Card.Title>
                </div>
                {appointment.status === "Confirmed" && (
                  <h4>
                    <span className="badge rounded-pill bg-success mt-2">
                      {" "}
                      {appointment.status}
                    </span>
                  </h4>
                )}
                {appointment.status === "Cancelled" && (
                  <h4>
                    <span className="badge rounded-pill bg-danger mt-2">
                      {appointment.status}
                    </span>
                  </h4>
                )}
              </Card.Body>
              <div>
                <Button
                  variant="link"
                  className="collapsed "
                  style={{ marginLeft: "3px" }}
                  onClick={() =>
                    setShowDetails({
                      ...showDetails,
                      [appointment.appId]: !showDetails[appointment.appId],
                    })
                  }
                  aria-expanded={showDetails[appointment.appId]}
                  aria-controls={`appointment-details-${appointment.appId}`}
                >
                  view
                </Button>
                <div
                  id={`appointment-details-${appointment.appId}`}
                  className={`collapse ${
                    showDetails[appointment.appId] ? "show" : ""
                  }`}
                >
                  <Card.Body style={{ backgroundColor: "#adb5bd" }}>
                    Doctor ID: {appointment.docId}
                    <br />
                    Doctor name: {appointment.docName} <br />
                    Appointment reason:{appointment.reason}
                    <div className="mt-3">
                      {appointment.status === "Confirmed" && (
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleCancelAppointment(appointment.appId)
                          }
                        >
                          Cancel
                        </Button>
                      )}
                      {appointment.status === "Cancelled" && (
                        <Button variant="danger" disabled>
                          Cancelled
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))}
      </Container>
      <Footer />
    </>
  );
}
