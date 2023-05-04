import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    const navigate = useNavigate();
    const handleFlightReservations = () => {
        navigate('/seachFlights');
    }
    
  return (
    <form className="h-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div>
          <button className="btn btn-primary mx-2" onClick={handleFlightReservations}>Flight Ticket Reservations (Round Trips)</button>
          <button className="btn btn-secondary mx-2">Hotel Reservations</button>
          <button className="btn btn-success mx-2">Holiday Packages (Flight + Hotel Reservations)</button>
        </div>
      </div>
    </form>
  );
};

export default HomePage;
