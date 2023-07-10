import React from "react";

const AdminPanel = ({ parcels, onUpdateStatus }) => {
  const handleStatusUpdate = (parcelId, newStatus) => {
    onUpdateStatus(parcelId, newStatus);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Status</th>
            <th>Present Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel.id}>
              <td>{parcel.destination}</td>
              <td>{parcel.status}</td>
              <td>{parcel.present_location}</td>
              <td>
                <select
                  value={parcel.status}
                  onChange={(e) =>
                    handleStatusUpdate(parcel.id, e.target.value)
                  }
                >
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
