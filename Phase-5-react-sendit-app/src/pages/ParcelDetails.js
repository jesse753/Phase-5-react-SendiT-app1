// ParcelDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ParcelDetails = ({ parcelId }) => {
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const response = await axios.get(`http://localhost/api/parcel-orders/${parcelId}`);
        setParcel(response.data);
      } catch (error) {
        console.error("Error fetching parcel details:", error);
      }
    };

    fetchParcel();
  }, [parcelId]);

  return (
    <div>
      {parcel ? (
        <div>
          <h2>Parcel Details</h2>
          <div>
            <strong>Destination:</strong> {parcel.destination}
          </div>
          <div>
            <strong>Status:</strong> {parcel.status}
          </div>
          <div>
            <strong>Present Location:</strong> {parcel.present_location}
          </div>
        </div>
      ) : (
        <p>Loading parcel details...</p>
      )}
    </div>
  );
};

export default ParcelDetails;
