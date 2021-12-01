// React imports
import React, { useState, useEffect } from "react";

// Styles
import "./App.css";

// Objects
import Taquero from "./objects/taquero";

const App = () => {
  // Constants
  const taqueroTypes = ["asada", "adobada", "suadero"];
  const [updater, setUpdater] = useState(0);
  const getDefaultOrdersFor = (types) => {
    let orders = {};
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      orders[type] = [];
    }
    return orders;
  };
  const defaultOrders = getDefaultOrdersFor(taqueroTypes);
  const [orders, setOrders] = useState(defaultOrders);
  const taqueros = taqueroTypes.map((type) => Taquero(type, setOrders));
  const [start, setStart] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  // Functions
  const getOrders = (cuantity) => {
    let res = [];
    for (let i = 0; i < cuantity; i++) {
      res.push(`Order ${i}`);
    }
    return res;
  };

  const ordersAreFinished = () => {
    for (let i = 0; i < taqueros.length; i++) {
      if (taqueros[i].getQueueSize() > 0) return false;
    }
    return true;
  };

  const startRUDA = async () => {
    // If it has already started, return
    if (start) return;
    setStart(true);

    // Insert 10 orders and start working
    for (let i = 0; i < taqueros.length; i++) {
      // taqueros[i].insertToQueue(getOrders(10));
      taqueros[i].startWorking();
    }

    // Keep the dom updating every second
    let counter = 0;
    while (true) {
      await timeout(100);
      counter += 0.1;
      setUpdater(counter.toFixed(1));
      if (ordersAreFinished()) break;
    }
    setStart(false);
  };

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Logic
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      localStorage.setItem("orders", JSON.stringify(defaultOrders));
    }
  }, [firstLoad, defaultOrders]);

  // Render
  return (
    <div className="App">
      {updater}
      <button onClick={startRUDA}>Start</button>
      <div className="logsContainer">
        {/* {JSON.stringify(orders)} */}
        {taqueroTypes.map((taqueroType) => {
          const index = taqueroTypes.indexOf(taqueroType);
          return (
            <div key={index}>
              {taqueroType}{" "}
              <button
                onClick={() =>
                  taqueros[index].insertToQueue([...getOrders(10)])
                }
              >
                Insert 10
              </button>
              <div>{JSON.stringify(orders[taqueroType])}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

// TO-DO'S
// WED
//   With a similar structure with passing setStates functions, create a logger handler
//   Adapt sistem to actual orders
//   Create actual frontend
// THU
//   Create Asignación y balanceo
// FRI
//   Scheduler
// SAT
//   Chalanes
// SUN
//   Doc and extras
