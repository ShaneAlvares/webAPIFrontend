import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [allDepartureFlights, setDepartureFlights] = useState([]);
  const [allArrivalFlights, setArrivalFlights] = useState([]);

  const [locattions, setLocattions] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [cabinClasses, setCabinClass] = useState([]);

  const [departureAirport, setDepartureAirport] = useState();
  const [arrivalAirport, setArrivalAirport] = useState();

  const [bookedSeates, setBookedSeats] = useState({});

  const navigate = useNavigate();

  const meals = [
    { id: 1, name: "Rice" },
    { id: 2, name: "Bread" },
    { id: 3, name: "Milk Rice" },
  ];

  const seats = [
    { id: 1, name: "B 1" },
    { id: 2, name: "M 1" },
    { id: 3, name: "I 1" },
    { id: 4, name: "B 2" },
    { id: 5, name: "M 2" },
    { id: 6, name: "I 2" },
  ];

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cartData"));
    setDepartureFlights(cart.ArrivalFlights);
    setArrivalFlights(cart.departureFlights);

    setLocattions(cart.locations);
    setAirlines(cart.airlines);
    setCabinClass(cart.classes);

    setDepartureAirport(cart.departurePlace);
    setArrivalAirport(cart.arrivalPlace);

    //console.log(cart.departureFlights);
    let flightIds = [];
    cart.departureFlights.map((item) => {
      flightIds.push(item.id);
    });
    cart.ArrivalFlights.map((item) => {
      flightIds.push(item.id);
    });

    let searchSeats = {
      flight: {
        $in: flightIds,
      },
    };

    axios
      .post("http://localhost:3001/getFlightsBookedSeats", searchSeats)
      .then((response) => {
        if (response.data === "No any round seats being booked") {
          setBookedSeats([]);
        } else {
          let bookedFlightSeats = {};

          response.data.seatsBooked.forEach((element) => {
            bookedFlightSeats[element.flight] = element.seat;
          });

          setBookedSeats(bookedFlightSeats);
          // console.log(bookedSeates[1][4]);

          // console.log(response.data.flighsToDeparture);
          // console.log(response.data.flighsToArriveAgain);
        }
        //console.log();
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, []);

  const handleDepartureSeatPosition = (event) => {
    const buttons = document.querySelectorAll("button[data-departureflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    event.target.classList.add("activeSelected");
  };

  const handleArrivalSeatPosition = (event) => {
    const buttons = document.querySelectorAll("button[data-arrivalflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    event.target.classList.add("activeSelected");
  };

  const [fullName, setFullName] = useState("");
  const [contactNo, setContactno] = useState("");
  const [priceTot, setPrice] = useState("");

  const renderCheckoutForm = () => {
    return (
      <form className="mt-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="inputEmail4">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="inputEmail4">Contact No</label>
            <input
              type="text"
              className="form-control"
              value={contactNo}
              onChange={(e) => setContactno(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail4">Price</label>
            <input
              type="text"
              className="form-control"
              value={priceTot}
              readOnly
            />
          </div>

          <button className="btn btn-dark mt-4 checkoutBtn">
            CHECKOUT NOW
          </button>
        </div>
      </form>
    );
  };

  const renderDepartureFlight = () => {
    return (
      <div className="row mt-4">
        <div className="card">
          <div className="card-header">
            <b>FLIGHTS TO DEPARTURE | </b>
            <span className="titleDetails">
              {" "}
              {locattions.map((item) => {
                return item.id == departureAirport ? item.name : "";
              })}{" "}
              ->{" "}
              {locattions.map((item) => {
                return item.id == arrivalAirport ? item.name : "";
              })}
            </span>
          </div>
          <div className="card-body">
            {allDepartureFlights.map((item, index) => {
              return (
                <div key={index} className="flightItem">
                  <h5 className="card-title">
                    {item.name}{" "}
                    <span className="titleDetails">(No Transits)</span>
                  </h5>
                  <p className="card-text">
                    Class:{" "}
                    <b>
                      {cabinClasses.map((loc) => {
                        return loc.id === item.class ? loc.name : "";
                      })}
                    </b>{" "}
                    | Departure Time: <b>{item.time}</b> | Airline:{" "}
                    <b>
                      {airlines.map((air) => {
                        return air.id === item.airline ? air.name : "";
                      })}
                    </b>{" "}
                    | Fly Time: <b>{item.flyTime}min</b> | Price: $
                    <b>{item.price}</b>
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <div>
                        <b>Seat Selection</b>
                      </div>
                      <br></br>- B (Basic Window) Seat<br></br>- M (Middle) Seat
                      <br></br>- I (Isle) Seat<br></br>
                      <br></br>
                      <div>
                        <b>Meal Selection</b>
                      </div>
                      <select className="">
                        {meals.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-6">
                      <div className="button-set">
                        {seats.map((item, index) => {
                          return (
                            <button
                              data-seatid={item.id}
                              key={index}
                              data-departureflightid="true"
                              onClick={handleDepartureSeatPosition}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderArrivalFlight = () => {
    return (
      <div className="row mt-4 mb-4">
        <div className="card">
          <div className="card-header">
            <b>FLIGHTS TO ARRIVAL | </b>
            <span className="titleDetails">
              {" "}
              {locattions.map((item) => {
                return item.id == arrivalAirport ? item.name : "";
              })}{" "}
              ->{" "}
              {locattions.map((item) => {
                return item.id == departureAirport ? item.name : "";
              })}
            </span>
          </div>
          <div className="card-body">
            {allArrivalFlights.map((item, index) => {
              return (
                <div key={index} className="flightItem">
                  <h5 className="card-title">
                    {item.name}{" "}
                    <span className="titleDetails">(No Transits)</span>
                  </h5>
                  <p className="card-text">
                    Class:{" "}
                    <b>
                      {cabinClasses.map((loc) => {
                        return loc.id === item.class ? loc.name : "";
                      })}
                    </b>{" "}
                    | Departure Time: <b>{item.time}</b> | Airline:{" "}
                    <b>
                      {airlines.map((air) => {
                        return air.id === item.airline ? air.name : "";
                      })}
                    </b>{" "}
                    | Fly Time: <b>{item.flyTime}min</b> | Price: $
                    <b>{item.price}</b>
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <div>
                        <b>Seat Selection</b>
                      </div>
                      <br></br>- B (Basic Window) Seat<br></br>- M (Middle) Seat
                      <br></br>- I (Isle) Seat<br></br>
                      <br></br>
                      <div>
                        <b>Meal Selection</b>
                      </div>
                      <select className="">
                        {meals.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-6">
                      <div className="button-set">
                        {seats.map((item, index) => {
                          return (
                            <button
                              data-seatid={item.id}
                              key={index}
                              data-arrivalflightid="true"
                              onClick={handleArrivalSeatPosition}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <span className="HeaderName">
        <b>HOLIDAY CENTRAL - CART</b>
      </span>
      <span className="cartItemIcon" onClick={() => navigate("/seachFlights")}>
        BACK
      </span>
      {renderDepartureFlight()}
      {renderArrivalFlight()}
      <span className="HeaderName">
        <b>HOLIDAY CENTRAL - CHECKOUT</b>
      </span>

      {renderCheckoutForm()}
    </div>
  );
};

export default Cart;
