import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Tagline */}
                <div className="footer-top">
                    <h2>Try our new lunch menu, and have a drink with us.</h2>
                </div>

                {/* Logo */}
                <div className="footer-logo">
                    <h1>Whiskey Wednesdays</h1>
                </div>

                {/* Links */}
                <div className="footer-links">
                    <div className="footer-column">
                        <h3>Explore</h3>
                        <ul>
                            <li><Link to="/food-menu">Food Menu</Link></li>
                            <li><Link to="/whiskey-menu">Whiskey List</Link></li>
                            <li><Link to="/happy-hour">Happy Hour</Link></li>
                            <li><Link to="/weekday-specials">Weekday Specials</Link></li>
                            <li><Link to="/local-events">Local Events</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/events">Book Events</Link></li>
                            <li><Link to="/auth">My Account</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Join Our Mailing List</h3>
                        <form>
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address..."
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                    <div className="footer-column-hours">
                        <h3>Hours</h3>
                        <ul>
                        <li>Weekdays 11AM - 2AM</li>
                        <li>Saturday 11AM - 2AM</li>
                        <li>Sunday 11AM - 2AM</li>
                        </ul>
                    </div>
                </div>

                {/* Map & Social Media */}
                <div className="footer-bottom">
                    
                    {/* Social Media Links */}
                    <div className="social-media">
                        <p>Find us on Social Media.</p>
                        <a href="https://www.facebook.com/people/Whiskey-Wednesday-Bar-Grill/61563550652998/" target="_blank" rel="noopener noreferrer">
                            <img src="/vecteezy_round-circle-black-and-white-facebook-logo-on-a-transparent_42127151.png" alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/whiskeywednesdaysbarandgrill/" target="_blank" rel="noopener noreferrer">
                            <img src="/vecteezy_instagram-logo-png-instagram-logo-transparent-png_23986521.png" alt="Instagram" />
                        </a>
                    </div>
                    {/* Google Map */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1665.600501917515!2d-111.86309376533787!3d33.39191981977399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b07fead400001%3A0x5373c495620aa5e2!2s1457%20W%20Southern%20Ave%20Unit%20A1%2C%20Mesa%2C%20AZ%2085202!5e0!3m2!1sen!2sus!4v1735598661314!5m2!1sen!2sus"
                            width="100%"
                            height="200"
                            allowFullScreen=""
                            loading="lazy"
                            title="Restaurant Location"
                            >
                        </iframe>
                        <h3>Address</h3>
                        <a href="https://www.google.com/maps?ll=33.392601,-111.862179&z=17&t=m&hl=en&gl=US&mapclient=embed&q=1457+W+Southern+Ave+Unit+A1+Mesa,+AZ+85202">1457 W. Southern Ave #A1, Mesa, AZ, United States, Arizona</a>
                    </div>
                    <div className="footer-copyright">
                <p>
                    Copyright © 2024 Whiskey Wednesdays. Powered by Whiskey Wednesdays.
                </p>
            </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;