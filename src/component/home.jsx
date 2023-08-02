import Navbar from "../views/navbar"
import Footer from "../views/footer"
import {Link } from "react-router-dom";
import "../home.css";
export default function Home(props) {
    return (
        <>
            <Navbar />
           <div style={{marginBottom:"10.82%"}}> 

            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <div id="landing-body">
                    <div class="px-3">
                        <h1>HealthEase</h1>
                        <p class="lead"> Health Ease aims to make it easy and convenient for patients to find the right doctor and book appointments online, without the need for lengthy phone calls or waiting in long queues.A user-friendly interface streamlining the booking process, making it a go-to destination for patients who value their time and convenience.
                    </p>
                    
                        <Link to="/doctors" class="btn btn-lg btn-secondary font-weight-bold border-white ">View Doctors</Link>
                </div>
            </div>
        </div >


            <ul class="slideshow mt-9">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
           </div>
            

            <Footer/>
            
        </>

        

    );
};