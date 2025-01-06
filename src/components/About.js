import React from 'react';
import './About.css';

const About = () => {
    return (  
        <div className="whole-container">
            <div className="about-container">
            <h1 className="about-header">About Us</h1>
            </div>
            <div className="background">
            <div className="who-container">
            <img src='ww.open.jpeg' alt='open'></img>
            <div className="text-container">
            <h2>Who We Are</h2>
            <p>Welcome to Whiskey Wednesdays Bar and Grill, your neighborhood watering spot in the heart of Mesa! Our journey began with a simple “yes” on a Wednesday, inspired by our beloved German Shepherd, Whiskey. We envisioned a bar & grill where the community could come together, enjoy great food, and create lasting memories.</p>
            <img src="whiskey.jpg" alt="Whiskey"></img>
            </div>
            </div>
            <div className="learn-more">
                <h3>Learn more about us.</h3>
                <h1>We can't wait to welcome you to our family!</h1>
                <p>At Whiskey Wednesdays, we pride ourselves on delivering exceptional customer service and offering affordable food and drink options for families and friends. Whether you’re here for our signature drinks, delicious appetizers, or just to relax on our dog-friendly patio, we strive to make every visit special.</p>
            </div>
            </div>
            <div className="follow-us">
                <h1>Follow Us</h1>
                <div className="logos">
                <a href="https://www.facebook.com/people/Whiskey-Wednesday-Bar-Grill/61563550652998/" target="_blank" rel="noopener noreferrer">
                    <img  src="vecteezy_round-circle-black-and-white-facebook-logo-on-a-transparent_42127151.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/whiskeywednesdaysbarandgrill/" target="_blank" rel="noopener noreferrer">
                    <img  src="vecteezy_instagram-logo-png-instagram-logo-transparent-png_23986521.png" alt="Instagram" />
                </a>
                </div>
            </div>
        </div>
    );
}
 
export default About;