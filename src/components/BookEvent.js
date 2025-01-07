import React, { useState } from 'react';
import './BookEvent.css';

const BookEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDetails: '',
  });
  
  const [errors, setErrors] = useState({
    name: false,
    eventDetails: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = true;
      valid = false;
    }
    if (!formData.eventDetails) {
      newErrors.eventDetails = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here, you can handle the form submission (e.g., sending the data to a backend API)
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <div className="book-event-container">
      <div className="title">
      <h2>Have any queries?</h2>
      <h1>We are here to help.</h1>
      </div>
      <div className="card-container">
        <div className="food">
        <h2>Food</h2>
        <p>Local food from Mesa Arizona finest location come eat with us today.</p>
        </div>
        <div className="private-events">
        <h2>Private Events</h2>
        <p>Do you have a private event or business meeting we can help.</p>
        <p>480 471-6553</p>
        </div>
        <div className="drinks">
        <h2>Drinks</h2>
        <p>A wide variety of beer and whiskey selection for any occassion.</p>
        <div className="email">
        <p>info@whiskeywednesdaysaz.com</p>
        </div>
        </div>
        <div className="vendors">
        <h2>Vendors</h2>
        <p>Advertising with us today at our local location in Mesa Arizona</p>
        </div>
      </div>
      <div className="body">
      <div className="picture-container">
      <h1>Book Your Next Event</h1>
      <p>Let us know if you have any special needs, like handicap accessibility or food allergies.</p>
      <img src="private-events.jpg" alt="events"></img>
      </div>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Contact Me</h1>
          <label>Name *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={errors.name ? 'error' : ''} 
            required 
          />
          {errors.name && <span className="error-message">Name is required</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Tell Us About Your Event *</label>
          <textarea 
            name="eventDetails" 
            value={formData.eventDetails} 
            onChange={handleChange} 
            className={errors.eventDetails ? 'error' : ''} 
            required 
          />
          {errors.eventDetails && <span className="error-message">Event details are required</span>}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      </div>
      <div className="karaoke">
        <div className="videos">
        <h1>Local Karaoke Night</h1>
        <video controls="auto" poster="/karaoke.poster.jpg">
        <source src='/wednesdays.mp4'type="video/mp4"></source>
          Your browser does not support the video tag.
          </video>
          </div>
          <div className="event-logo">
            <h1>Whiskey Wednesdays</h1>
          </div>
          <div className="drinkwithus">
          <h1>Join us.</h1>
        <video controls="auto" poster="/joinus.poster.jpeg">
          <source src='/Whiskeys.mp4' type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
        </div>
    </div>
    </div>
  );
};

export default BookEvent;