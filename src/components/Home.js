import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {

    return (  
        <div className="home">
            <div className="welcome-section">
                <h1>Welcome to Whiskey Wednesday's</h1>
                <p>Come have a drink with us</p>
            </div>
            <div className="cta-buttons">
                <button className="cta-button"><Link to="/whiskey-menu">View Menu</Link></button>
                <button className="cta-button"><Link to="/events">Book Events</Link></button>
            </div>
        </div>
    );
}
 
export default Home;