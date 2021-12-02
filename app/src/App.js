// React imports
import React, { useState, useEffect } from "react";

// Styles
import "./App.css";

// Objects
import Taquero from "./objects/taquero";
import LogsHandler from "./config/logsHandler";
import AllocationHandler from "./config/allocationAndBalancing";

const App = () => {
  // Config constants
  const [isRunning, setIsRunning] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  // Frontend-exclusive
  const [chrono, setChrono] = useState(0);
  const [logs, setLogs] = useState([]);
  const logsHandler = LogsHandler(setLogs);
  // Taqueros/orders-related
  const taqueroTypes = [
    { name: "tripa y cabeza", canWorkOn: ["tripa", "cabeza"] },
    { name: "asada y suadero (1)", canWorkOn: ["asada", "suadero"] },
    { name: "asada y suadero (2)", canWorkOn: ["asada", "suadero"] },
    { name: "adobada", canWorkOn: ["adobada"] },
  ];
  const getDefaultOrdersFor = (types) => {
    let orders = {};
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      orders[type.name] = [];
    }
    return orders;
  };
  const defaultOrders = getDefaultOrdersFor(taqueroTypes);
  const [orders, setOrders] = useState(defaultOrders);
  const defaultMetadata = {
    workingOn: null,
    queueLength: 0,
    fan: {
      active: false,
      untilNeeded: 600,
    },
    rest: {
      untilNeeded: 1000,
      timeRested: 0,
    },
    tortillas: 50,
    quesadillasSpaceOccupied: 0,
    fillings: {
      salsa: 150,
      guacamole: 100,
      cilantro: 200,
      cebolla: 200,
    },
  };
  const getDefaultMetadataFor = (types) => {
    let metadata = {};
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      metadata[type.name] = defaultMetadata;
    }
    return metadata;
  };
  const [metadata, setMetadata] = useState(getDefaultMetadataFor(taqueroTypes));
  const taqueros = taqueroTypes.map((type) =>
    Taquero(type.name, type.canWorkOn, setOrders, setMetadata, logsHandler)
  );
  const allocationHandler = AllocationHandler(taqueros, null, taqueroTypes);

  // Functions
  const cleanLogs = () => {
    localStorage.setItem("logs", JSON.stringify([]));
    setLogs([]);
  };

  const formatTimeForLogs = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} (${date.getMilliseconds()}ms)`;
  };

  const ordersAreFinished = () => {
    for (let i = 0; i < taqueros.length; i++) {
      if (taqueros[i].getQueueSize() > 0) return false;
    }
    return true;
  };

  const setup = () => {
    // Set initial local storage values
    localStorage.setItem("orders", JSON.stringify(defaultOrders));
    localStorage.setItem("logs", JSON.stringify([]));
    localStorage.setItem(
      "metadata",
      JSON.stringify(getDefaultMetadataFor(taqueroTypes))
    );
  };

  const startRUDA = async () => {
    if (isRunning) return;
    setIsRunning(true);
    cleanLogs();

    // Start Allocation and balance handler
    allocationHandler.start();

    // Start every taquero
    for (let i = 0; i < taqueros.length; i++) {
      taqueros[i].startWorking();
    }

    // Start loop until everything is done
    let counter = 0;
    while (true) {
      await timeout(100);
      counter += 0.1;
      setChrono(counter.toFixed(1));
      if (ordersAreFinished()) break;
    }
    setIsRunning(false);
  };

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Logic
  // eslint-disable-next-line
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setup();
    }
  });

  // Render
  return (
    <div className="App">
      <div className="header">
        <img
          src="https://raw.githubusercontent.com/ulisesaviles/os-tacoshop-ruda/main/RUDA.png"
          className="logo"
          alt="logo"
        />
        {!isRunning ? (
          <button onClick={startRUDA} className="startBtn">
            Start RUDA
          </button>
        ) : (
          <div className="running">Running RUDA...</div>
        )}
        <p className="chrono">({chrono}s)</p>
      </div>
      <div className="contentContainer">
        <div className="contentLeftContainer">
          {/* <h1 className="taquerosTitle">Taqueros</h1> */}
          <div className="taquerosContainer">
            {taqueroTypes.map((taqueroType) => {
              const index = taqueroTypes.indexOf(taqueroType);
              return (
                <div key={index} className="taqueroContainer">
                  <h4 className="taqueroName">Taquero de {taqueroType.name}</h4>
                  {/* <IoMan className="stickMan" /> */}
                  <div className="taqueroMetadataContainer">
                    <h3 className="metadata">Metadata</h3>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">
                        Orders in queue:
                      </h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].queueLength}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Working on:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].workingOn === null
                          ? "null"
                          : metadata[taqueroType.name].workingOn}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Fan active:</h6>
                      <p className="actualMetadata">
                        {JSON.stringify(metadata[taqueroType.name].fan.active)}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">
                        Tacos untill turn on the fan:
                      </h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].fan.untilNeeded}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Chalán:</h6>
                      <p className="actualMetadata">X</p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Time rested:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].rest.timeRested}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">
                        Tacos untill next full rest:
                      </h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].rest.untilNeeded}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Tortillas</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].tortillas}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">
                        Quesadillas space occupied:
                      </h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].quesadillasSpaceOccupied}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Cilantro:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].fillings.cilantro}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Cebolla:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].fillings.cebolla}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Salsa:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].fillings.salsa}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Guacamole:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].fillings.guacamole}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="logsContainer">
          <h2 className="logsTitle">Logs:</h2>
          <p className="logsSubtitle">(De más nuevo a más viejo)</p>
          <div className="logsContentContainer">
            {logs.map((log) => (
              <div className="logContainer">
                <div className="logHeaderContainer">
                  <h5 className="logTitle">{log.title}</h5>
                  <p className="logTime">{formatTimeForLogs(log.time)}</p>
                </div>
                {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// TO-DO'S
// THU
//   Quesadillero
//   Adapt sistem to actual orders
//   Create Asignación y balanceo
// FRI
//   Scheduler
// SAT
//   Chalanes
// SUN
//   Doc and extras
