import React, { useState, useEffect } from "react";
import "../styles/DeliveryForm.css";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map.js";
const DeliveryForm = () => {
    const [pickupLocation, setPickupLocation] = useState({ lat: 0, lng: 0 });
    const [destination, setDestination] = useState({ lat: 0, lng: 0 });
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
    const onPickupLoad = (autocomplete) => {
      if (autocomplete !== null) {
        setPickupLocation(autocomplete.getPlace().geometry.location);
      }
    };
  
    const onDestinationLoad = (autocomplete) => {
      if (autocomplete !== null) {
        setDestination(autocomplete.getPlace().geometry.location);
      }
    };
  
    useEffect(() => {
      fetch(
        `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
          API_KEY
        )}&libraries=places`
      )
        .then((response) => response.json())
        .then((data) => {
          const { pickup, destination, distance, duration } = data;
  
          setPickupLocation(pickup);
          setDestination(destination);
          setDistance(distance);
          setDuration(duration);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [API_KEY]);
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        senderName: "",
        recipientName: "",
        address: "",
        contactNumber: "",
        itemDescription: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation and submission logic here
        console.log(formData);
        // // Store the form data in local storage
        // localStorage.setItem("formData", JSON.stringify(formData));

        const storedDeliveries = localStorage.getItem("deliveries");
        const deliveries = storedDeliveries ? JSON.parse(storedDeliveries) : [];
        const updatedDeliveries = [...deliveries, formData];
        localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));

        // Redirect to CargoStatus page along with the form data
        navigate("/cargo-status", { state: formData });

        // Reset the form
        setFormData({
            senderName: "",
            recipientName: "",
            address: "",
            contactNumber: "",
            itemDescription: "",
        });
    };

    return (
        <div className="delivery-form-container">
            <h2 className="h2">Delivery Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="senderName">Sender's Name</label>
                    <input
                        type="text"
                        id="senderName"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recipientName">Recipient's Name</label>
                    <input
                        type="text"
                        id="recipientName"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="itemDescription">Item Description</label>
                    <input
                        type="text"
                        id="itemDescription"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            <Map
        pickupLocation={pickupLocation}
        destination={destination}
        onPickupLoad={onPickupLoad}
        onDestinationLoad={onDestinationLoad}
      />
      {distance && duration && (
        <div>
          <h2>Delivery Details</h2>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
        </div>
    );
};

export default DeliveryForm;
