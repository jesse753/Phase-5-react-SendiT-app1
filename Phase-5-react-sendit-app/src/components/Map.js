import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const Map = ({ pickupAddress, destinationAddress, onPickupChange, onDestinationChange, setDistance }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistanceValue] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const fetchPickupLocation = async () => {
      try {
        const results = await geocodeByAddress(pickupAddress);
        const latLng = await getLatLng(results[0]);
        setPickupLocation(latLng);
      } catch (error) {
        console.error('Error fetching pickup location:', error);
      }
    };

    const fetchDestination = async () => {
      try {
        const results = await geocodeByAddress(destinationAddress);
        const latLng = await getLatLng(results[0]);
        setDestination(latLng);
      } catch (error) {
        console.error('Error fetching destination:', error);
      }
    };

    if (pickupAddress !== '') {
      fetchPickupLocation();
    }
    if (destinationAddress !== '') {
      fetchDestination();
    }
  }, [pickupAddress, destinationAddress]);

  const handleCalculate = () => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickupAddress],
        destinations: [destinationAddress],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          const { distance, duration } = response.rows[0].elements[0];
          setDistance(distance.text);
          setDuration(duration.text);
          setDistanceValue(distance.value);
        }
      }
    );
  };

  return (
    <div>
      <PlacesAutocomplete value={pickupAddress} onChange={onPickupChange}>
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Enter pickup location' })} />
            <div>
              {suggestions.map((suggestion, index) => (
                <div key={index} {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <PlacesAutocomplete value={destinationAddress} onChange={onDestinationChange}>
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Enter destination' })} />
            <div>
              {suggestions.map((suggestion, index) => (
                <div key={index} {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <button onClick={handleCalculate}>Calculate</button>

      {distance && duration && (
        <div>
          <h2>Delivery Details</h2>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}

      {pickupLocation && destination && (
        <GoogleMap center={pickupLocation} zoom={8} mapContainerStyle={{ width: '100%', height: '400px' }}>
         
          <Marker position={pickupLocation} />
          <Marker position={destination} />

          <Polyline path={[pickupLocation, destination]} options={{ strokeColor: '#0000FF' }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;