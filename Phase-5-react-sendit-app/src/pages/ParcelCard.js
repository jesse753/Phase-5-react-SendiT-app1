import React, { useState, useEffect } from "react";
import axios from "axios";

const ParcelCard = ({ parcelId, userId }) => {
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const response = await axios.get(`http://localhost/api/parcels_orders/${parcelId}?user_id=${userId}`);
        setParcel(response.data);
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    };

    fetchParcel();
  }, [parcelId, userId]);

  if (!parcel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="parcel-card">
      <h3>Parcel Details</h3>
      <p><strong>Destination:</strong> {parcel.destination}</p>
      <p><strong>Status:</strong> {parcel.status}</p>
      <p><strong>Present Location:</strong> {parcel.present_location}</p>
      <p><strong>User ID:</strong> {parcel.user_id}</p>
      <p><strong>Created At:</strong> {parcel.created_at}</p>
      <p><strong>Updated At:</strong> {parcel.updated_at}</p>
    </div>
  );
};

export default ParcelCard;

// import React from "react";
// import axios from "axios";

// const ParcelCard = ({ parcel, onCancelParcel }) => {
//   const handleCancel = async () => {
//     try {
//       await axios.delete(`http://localhost/api/parcel-orders/${parcel.id}`);
//       onCancelParcel(parcel.id);
//       console.log("Parcel order canceled successfully!");
//     } catch (error) {
//       console.error("Error canceling parcel order:", error);
//     }
//   };

//   return (
//     <div className="parcel-card">
//       <h3>Parcel Order</h3>
//       <div>
//         <strong>Destination:</strong> {parcel.destination}
//       </div>
//       <div>
//         <strong>Status:</strong> {parcel.status}
//       </div>
//       <div>
//         <strong>Present Location:</strong> {parcel.present_location}
//       </div>
//       <button onClick={handleCancel}>Cancel</button>
//     </div>
//   );
// };

// export default ParcelCard;
