import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const SearchFlights = () => {
  const navigate = useNavigate();
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const [cabinClass, setCabinClass] = useState("");
  const [airline, setAirline] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [allDepartureFlightItems, setDepartureFlightItems] = useState([]);
  const [allArrivalFlightItems, setArrivalFlightItems] = useState([]);

  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState([]);
  const [selectedArrivalFlight, setSelectedArrivalFlight] = useState([]);

  //function handlings

  const handleAddToCart = async () => {
    if (
      selectedArrivalFlight.length == 0 ||
      selectedDepartureFlight.length == 0
    ) {
      alert("Please select a round trip to add to cart that");
    } else {
      // console.log(selectedDepartureFlight);
      // // console.log(selectedArrivalFlight);
      // let cartArr = [];
      let cart = {};
      cart.departureFlights = [];
      cart.ArrivalFlights = [];
      cart.departureFlights[0] = selectedDepartureFlight;
      cart.ArrivalFlights[0] = selectedArrivalFlight;
      cart.locations = locattions;
      cart.airlines = airlines;
      cart.classes = cabinClasses;

      cart.departurePlace = departureAirport;
      cart.arrivalPlace = arrivalAirport;
      // cartArr.push(cart);
      // await setFlightCart(cart);
      // console.log(cartArr);
      localStorage.setItem("cartData", JSON.stringify(cart));
      // localStorage.setItem("cartData",cartArr );
    }
  };

  const handleSelectionOfDepartureFlight = (event) => {
    const flightId = event.target.dataset.departureflightid;
    let item = allDepartureFlightItems.filter((item) => item.id == flightId);
    setSelectedDepartureFlight(item[0]);

    const buttons = document.querySelectorAll("button[data-departureflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    event.target.classList.add("activeSelected");
  };

  const handleSelectionOfArriivalFlight = (event) => {
    const flightId = event.target.dataset.arrivalflightid;
    let item = allArrivalFlightItems.filter((item) => item.id == flightId);
    setSelectedArrivalFlight(item[0]);

    const buttons = document.querySelectorAll("button[data-arrivalflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    event.target.classList.add("activeSelected");
  };

  const handleDepartureChange = (event) => {
    setDepartureAirport(event.target.value);
  };
  const handleArrivalChange = (event) => {
    setArrivalAirport(event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };
  const handleArrivalDateChange = (event) => {
    setArrivalDate(event.target.value);
  };

  const handleCabinClassChange = (event) => {
    setCabinClass(event.target.value);
  };
  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
  };

  const handleFilterEventsDepartureFlights = (event) => {
    setSelectedDepartureFlight([]);

    const buttons = document.querySelectorAll("button[data-departureflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });
    if (event.target.value == "priceHL") {
      let sortedFlights = [...allDepartureFlightItems].sort(
        (b, a) => a.price - b.price
      );
      setDepartureFlightItems(sortedFlights);
    } else if (event.target.value == "priceLH") {
      let sortedFlights = [...allDepartureFlightItems].sort(
        (a, b) => a.price - b.price
      );
      setDepartureFlightItems(sortedFlights);
    } else if (event.target.value == "durationHL") {
      let sortedFlights = [...allDepartureFlightItems].sort(
        (b, a) => a.flyTime - b.flyTime
      );
      setDepartureFlightItems(sortedFlights);
    } else if (event.target.value == "durationLH") {
      let sortedFlights = [...allDepartureFlightItems].sort(
        (a, b) => a.flyTime - b.flyTime
      );
      setDepartureFlightItems(sortedFlights);
    } else if (event.target.value == "airlineDESC") {
      allDepartureFlightItems.map((item) => {
        let airlineName = airlines.filter((loc) => {
          return loc.id == item.airline ? loc.name : "";
        });
        item.airlineName = airlineName[0].name;
        return item;
      });

      allDepartureFlightItems.sort((a, b) =>
        b.airlineName.localeCompare(a.airlineName)
      );
      let sortedFlights = allDepartureFlightItems.map(
        ({ airlineName, ...rest }) => rest
      );

      setDepartureFlightItems(sortedFlights);
    } else if (event.target.value == "airlineASC") {
      allDepartureFlightItems.map((item) => {
        let airlineName = airlines.filter((loc) => {
          return loc.id == item.airline ? loc.name : "";
        });
        item.airlineName = airlineName[0].name;
        return item;
      });

      allDepartureFlightItems.sort((a, b) =>
        a.airlineName.localeCompare(b.airlineName)
      );
      let sortedFlights = allDepartureFlightItems.map(
        ({ airlineName, ...rest }) => rest
      );

      setDepartureFlightItems(sortedFlights);
    }
  };

  const handleFilterEventsArrivalFlights = (event) => {
    setSelectedArrivalFlight([]);

    const buttons = document.querySelectorAll("button[data-arrivalflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    if (event.target.value == "priceHL") {
      let sortedFlights = [...allArrivalFlightItems].sort(
        (b, a) => a.price - b.price
      );
      setArrivalFlightItems(sortedFlights);
    } else if (event.target.value == "priceLH") {
      let sortedFlights = [...allArrivalFlightItems].sort(
        (a, b) => a.price - b.price
      );
      setArrivalFlightItems(sortedFlights);
    } else if (event.target.value == "durationHL") {
      let sortedFlights = [...allArrivalFlightItems].sort(
        (b, a) => a.flyTime - b.flyTime
      );
      setArrivalFlightItems(sortedFlights);
    } else if (event.target.value == "durationLH") {
      let sortedFlights = [...allArrivalFlightItems].sort(
        (a, b) => a.flyTime - b.flyTime
      );
      setArrivalFlightItems(sortedFlights);
    } else if (event.target.value == "airlineDESC") {
      allArrivalFlightItems.map((item) => {
        let airlineName = airlines.filter((loc) => {
          return loc.id == item.airline ? loc.name : "";
        });
        item.airlineName = airlineName[0].name;
        return item;
      });

      allArrivalFlightItems.sort((a, b) =>
        b.airlineName.localeCompare(a.airlineName)
      );
      let sortedFlights = allArrivalFlightItems.map(
        ({ airlineName, ...rest }) => rest
      );

      setArrivalFlightItems(sortedFlights);
    } else if (event.target.value == "airlineASC") {
      allArrivalFlightItems.map((item) => {
        let airlineName = airlines.filter((loc) => {
          return loc.id == item.airline ? loc.name : "";
        });
        item.airlineName = airlineName[0].name;
        return item;
      });

      allArrivalFlightItems.sort((a, b) =>
        a.airlineName.localeCompare(b.airlineName)
      );
      let sortedFlights = allArrivalFlightItems.map(
        ({ airlineName, ...rest }) => rest
      );

      setArrivalFlightItems(sortedFlights);
    }
  };

  const HandleSearchFunction = () => {
    //reset the already added to cart item
    setSelectedDepartureFlight([]);

    const buttonsD = document.querySelectorAll(
      "button[data-departureflightid]"
    );
    buttonsD.forEach((button) => {
      button.classList.remove("activeSelected");
    });
    setSelectedArrivalFlight([]);

    const buttonsA = document.querySelectorAll("button[data-arrivalflightid]");
    buttonsA.forEach((button) => {
      button.classList.remove("activeSelected");
    });
    //end reset the already added to cart item
    //console.log(departureDate);
    const searchBy = {};

    if (departureAirport !== "") {
      searchBy.departure = departureAirport;
    } else {
      alert("Please select a departure airport");
      return false;
    }
    if (arrivalAirport !== "") {
      searchBy.arrival = arrivalAirport;
    } else {
      alert("Please select a arrival airport");
      return false;
    }
    if (departureDate !== "") {
      searchBy.departureDate = moment(departureDate).format("YYYY-MM-DD");
    } else {
      alert("Please select a departure date");
      return false;
    }
    if (arrivalDate !== "") {
      searchBy.arrivalDate = moment(arrivalDate).format("YYYY-MM-DD");
    } else {
      alert("Please select an arrival date");
      return false;
    }
    if (cabinClass !== "") {
      searchBy.class = cabinClass;
    }
    if (airline !== "") {
      searchBy.airline = airline;
    }
    // console.log(searchBy);

    axios
      .post("http://localhost:3001/getFlights", searchBy)
      .then((response) => {
        // Handle retrieved data
        console.log(response.data);
        if (
          response.data ===
          "No any round trips available for the selected combinations"
        ) {
          setErrorMsg(response.data);
        } else {
          setErrorMsg("");

          setDepartureFlightItems(response.data.flighsToDeparture);
          setArrivalFlightItems(response.data.flighsToArriveAgain);

          // console.log(response.data.flighsToDeparture);
          // console.log(response.data.flighsToArriveAgain);
        }
        //console.log();
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  //hardcoded variables

  const locattions = [
    { id: 1, name: "Canada" },
    { id: 2, name: "Sri Lanka" },
    { id: 3, name: "New Work" },
    { id: 4, name: "Japan" },
    { id: 5, name: "Australlia" },
  ];
  const cabinClasses = [
    { id: 1, name: "Bussiness" },
    { id: 2, name: "Econommy" },
  ];

  const airlines = [
    { id: 1, name: "Sri Lankan" },
    { id: 2, name: "Emmirates" },
  ];

  //rendering parts

  const renderSearchArea = () => {
    return (
      <form className="row mt-5">
        <div className="form-group mb-4 col-md-4">
          <label htmlFor="inputState">Departure destination</label>
          <select
            onChange={handleDepartureChange}
            id="inputState"
            className="form-control"
          >
            <option>Select</option>
            {locattions.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4 col-md-4">
          <label htmlFor="inputState">Arrival destination</label>
          <select
            onChange={handleArrivalChange}
            id="inputState"
            className="form-control"
          >
            <option>Select</option>
            {locattions.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4 col-md-4">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            onChange={handleDepartureDateChange}
            type="date"
            className="form-control"
            id="departureDate"
          />
        </div>
        <div className="form-group mb-4 col-md-4">
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            onChange={handleArrivalDateChange}
            type="date"
            className="form-control"
            id="arrivalDate"
          />
        </div>
        <div className="form-group mb-4 col-md-4">
          <label htmlFor="inputState">Cabin Class</label>
          <select
            onChange={handleCabinClassChange}
            id="inputState"
            className="form-control"
          >
            <option>Select</option>
            {cabinClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4 col-md-4">
          <label htmlFor="inputState">Airline</label>
          <select
            onChange={handleAirlineChange}
            id="inputState"
            className="form-control"
          >
            <option>Select</option>
            {airlines.map((air) => (
              <option key={air.id} value={air.id}>
                {air.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="button"
          onClick={HandleSearchFunction}
          value="SEARCH FLIGHTS"
          className="btn btn-dark searchBtn"
        />
      </form>
    );
  };

  const renderErrorMsgSection = () => {
    if (errorMsg === "") {
      return false;
    } else {
      return (
        <div className="row mt-4">
          <div className="alert alert-info" role="alert">
            {errorMsg}
          </div>
        </div>
      );
    }
  };

  const renderShowFlightsToDeparture = () => {
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
            <select
              className="filters"
              onChange={handleFilterEventsDepartureFlights}
            >
              <option>Fliter Options</option>
              <option value="priceHL">Price: High to Low</option>
              <option value="priceLH">Price: Low to High</option>
              <option value="durationHL">Duration: High to Low</option>
              <option value="durationLH">Duration: Low to High</option>
              <option value="airlineASC">Airline: Ascending Order</option>
              <option value="airlineDESC">Airline: Descending Order</option>
            </select>
          </div>
          <div className="card-body">
            {allDepartureFlightItems.map((item, index) => {
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
                  <button
                    className="btn btn-dark selectToCart"
                    onClick={handleSelectionOfDepartureFlight}
                    data-departureflightid={item.id}
                  >
                    SELECT FOR DEPARTURE
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderShowFlightsToArrival = () => {
    return (
      <div className="row mt-4">
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
            <select
              className="filters"
              onChange={handleFilterEventsArrivalFlights}
            >
              <option>Fliter Options</option>
              <option value="priceHL">Price: High to Low</option>
              <option value="priceLH">Price: Low to High</option>
              <option value="durationHL">Duration: High to Low</option>
              <option value="durationLH">Duration: Low to High</option>
              <option value="airlineASC">Airline: Ascending Order</option>
              <option value="airlineDESC">Airline: Descending Order</option>
            </select>
          </div>
          <div className="card-body">
            {allArrivalFlightItems.map((item, index) => {
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
                  <button
                    className="btn btn-dark selectToCart"
                    onClick={handleSelectionOfArriivalFlight}
                    data-arrivalflightid={item.id}
                  >
                    SELECT FOR ARRIVAL
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAddToCartSection = () => {
    return (
      <div className="row mt-4">
        <div className="divPadingZero">
          <button
            className="btn btn-dark btnAddToCart mb-4"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <span className="HeaderName">
        <b>HOLIDAY CENTRAL - FLIGHT SEARCH</b>
      </span>
      <span className="cartItemIcon" onClick={() => navigate("/cart")}>
        CART
      </span>
      {renderSearchArea()}
      {renderErrorMsgSection()}
      {allDepartureFlightItems.length > 0 && renderShowFlightsToDeparture()}
      {allArrivalFlightItems.length > 0 && renderShowFlightsToArrival()}
      {renderAddToCartSection()}
    </div>
  );
};

export default SearchFlights;
