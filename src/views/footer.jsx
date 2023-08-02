import "../footer.css";
import {Link} from "react-router-dom";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
    FaMapMarker, FaPhone, FaEnvelope
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer class="footer-distributed " style={{paddingTop:"41px",paddingBottom:"41px"}}>
            <div class="footer-left">
                <h3>
                    Health<span>Ease</span>
                </h3>
                <p class="footer-links">
                    <Link to="#">Home</Link>|<Link to="#">About</Link>|<Link to="#">Contact</Link>
                </p>
                <p class="footer-company-name">
                    Copyright © 2023 <strong>HealthEase</strong> All rights reserved
                </p>
            </div>
            <div className="footer-center">
                <div>
                    <FaMapMarker style={{ color: "#E75480", margin: "10px" }} />
                    <p>Kolkata</p>                    
                    </div>
                <div >
                    <FaPhone style={{ color: "#E75480", margin: "10px" }} />
                    <p>+91 9938413285</p>
                </div>
                <div>
                    <FaEnvelope style={{ color: "#E75480", margin: "10px" }} />
                    <p>
                        <Link to="mailto:chowdhuryreetika@gmail.com">
                        chowdhuryreetika@gmail.com
                        </Link>
                    </p>
                </div>
            </div>
            <div class="footer-right">
                <p class="footer-company-about">
                    <span>About</span>
                    <strong>Book World</strong> is a online book store where you can buy
                    books at a very low price.
                </p>
                <div className="footer-icons">
                    <Link to="#">
                        <FaFacebook />
                    </Link>
                    <Link to="#">
                        <FaInstagram />
                    </Link>
                    <Link to="#">
                        <FaLinkedin />
                    </Link>
                    <Link to="#">
                        <FaTwitter />
                    </Link>
                    <Link to="#">
                        <FaYoutube />
                    </Link>
                </div>
            </div>
        </footer>
    );
};
export default Footer;