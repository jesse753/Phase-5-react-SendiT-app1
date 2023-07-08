import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import DeliveryForm from './pages/DeliverForm';
import CargoStatusPage from './pages/CargoStatusPage';
import Hero from './pages/Hero';
import Map from './components/Map';
//import DeliveryDetails from './components/DeliveryDetails';

const App = () => {
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

  return (
    <div className="App">
      <Navbar />
      <div className="mother">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deliver" element={<DeliveryForm />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/cargo-status" element={<CargoStatusPage />} />
        </Routes>
      </div>
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
      <Footer />
    </div>
  );
};

export default App;


