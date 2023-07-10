import React, { useState, useEffect } from "react";
import axios from "axios";

const ParcelList = ({ userId }) => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get(`http://localhost/api/parcels?user_id=${userId}`);
        setParcels(response.data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, [userId]);

  const handleCancelParcel = async (parcelId) => {
    try {
      await axios.delete(`/api/parcels/${parcelId}`);
      setParcels((prevParcels) => prevParcels.filter((parcel) => parcel.id !== parcelId));
      console.log("Parcel canceled successfully!");
    } catch (error) {
      console.error("Error canceling parcel:", error);
    }
  };

  return (
    <div className="parcel-list">
      <h2>Parcel Orders</h2>
      {parcels.length === 0 ? (
        <p>No parcel orders found.</p>
      ) : (
        <ul>
          {parcels.map((parcel) => (
            <li key={parcel.id}>
              <div>
                <strong>Destination:</strong> {parcel.destination}
              </div>
              <div>
                <strong>Status:</strong> {parcel.status}
              </div>
              <div>
                <strong>Present Location:</strong> {parcel.present_location}
              </div>
              <div>
                <button onClick={() => handleCancelParcel(parcel.id)}>Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParcelList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ParcelCard from "./ParcelCard";

// const ParcelList = () => {
//   const [parcelOrders, setParcelOrders] = useState([]);

//   useEffect(() => {
//     const fetchParcelOrders = async () => {
//       try {
//         const response = await axios.get("/api/parcel-orders");
//         setParcelOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching parcel orders:", error);
//       }
//     };

//     fetchParcelOrders();
//   }, []);

//   const handleCancelParcel = async (parcelId) => {
//     try {
//       await axios.delete(`/api/parcel-orders/${parcelId}`);
//       setParcelOrders(parcelOrders.filter((parcel) => parcel.id !== parcelId));
//       console.log("Parcel order canceled successfully!");
//     } catch (error) {
//       console.error("Error canceling parcel order:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Parcel Orders</h2>
//       {parcelOrders.length > 0 ? (
//         parcelOrders.map((parcel) => (
//           <ParcelCard key={parcel.id} parcel={parcel} onCancelParcel={handleCancelParcel} />
//         ))
//       ) : (
//         <p>No parcel orders found.</p>
//       )}
//     </div>
//   );
// };

// export default ParcelList;