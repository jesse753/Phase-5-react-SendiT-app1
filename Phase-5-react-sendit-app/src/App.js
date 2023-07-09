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

const App = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [parcelWeight, setParcelWeight] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [distance, setDistance] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Calculate total cost whenever distance or parcel weight changes
    if (distance && parcelWeight) {
      const costPerKgPerKm = 100; // Replace with your actual cost per kg per km value
      const distanceInKm = parseFloat(distance) / 1000; // Convert distance to km
      const cost = distanceInKm * parseFloat(parcelWeight) * costPerKgPerKm;
      setTotalCost(cost);
    }
  }, [distance, parcelWeight]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (distance && parcelWeight && pickupAddress && destinationAddress) {
      console.log('Delivery Details:', {
        pickupAddress,
        destinationAddress,
        distance,
        parcelWeight
      });

      setOrderSubmitted(true);
    }
  };

  const handlePickupChange = (address) => {
    setPickupAddress(address);
  };

  const handleDestinationChange = (address) => {
    setDestinationAddress(address);
  };

  const handleParcelWeightChange = (e) => {
    setParcelWeight(e.target.value);
  };

  const handleDistanceUpdate = (newDistance) => {
    setDistance(newDistance);
  };

  const handleReset = () => {
    // Reset the form and relevant state variables
    setPickupAddress('');
    setDestinationAddress('');
    setParcelWeight('');
    setOrderSubmitted(false);
    setDistance('');
    setTotalCost(0);
  };

  const handleUpdateDestination = () => {
    setOrderSubmitted(false);
    setDistance('');
    setTotalCost(0);
  };

  const isSubmitDisabled = !distance || !pickupAddress || !destinationAddress || !parcelWeight;

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
        pickupAddress={pickupAddress}
        destinationAddress={destinationAddress}
        onPickupChange={handlePickupChange}
        onDestinationChange={handleDestinationChange}
        setDistance={handleDistanceUpdate}
      />
      {orderSubmitted ? (
        <div>
          <h2>Order Submitted Successfully!</h2>
          <p>Total Cost: {totalCost}</p>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>
            Pickup Location:
            <input type="text" value={pickupAddress} onChange={(e) => handlePickupChange(e.target.value)} />
          </label>
          <label>
            Destination:
            <input type="text" value={destinationAddress} onChange={(e) => handleDestinationChange(e.target.value)} />
          </label>
          <label>
            Parcel Weight:
            <input type="text" value={parcelWeight} onChange={handleParcelWeightChange} />
          </label>
          <button type="submit" disabled={isSubmitDisabled}>Submit</button>
        </form>
      )}
      {distance && (
        <div>
          <h2>Delivery Details</h2>
          <p>Distance: {distance}</p>
          <p>Parcel Weight: {parcelWeight}</p>
          <p>Total Cost: {totalCost}</p>
          <button onClick={handleUpdateDestination}>Change Destination</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;



