// React imports
import { useState, useEffect } from "react";

// Styles
import "./App.css";

// Objects
import Taquero from "./objects/taquero";
import Quesadillero from "./objects/quesadillero";

// Handlers
import LogsHandler from "./config/logsHandler";
import AllocationHandler from "./config/allocationAndBalancing";
import OrdersHandler from "./config/ordersStateHandler";
import ChalanesHandler from "./config/chalanesHandler";

// Components
import Table from "./components/table";

// Sample input
import sampleInput from "./samples/miniOrdenes.json";

const App = () => {
  // Config constants
  const [isRunning, setIsRunning] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const config = {
    tacosNeededToRest: 1000,
    fillingsTop: {
      tortillas: 50,
      cilantro: 200,
      cebolla: 200,
      salsa: 150,
      guacamole: 100,
    },
  };
  // Frontend-exclusive
  const [chrono, setChrono] = useState(0);
  const [logs, setLogs] = useState([]);
  const logsHandler = LogsHandler(setLogs);
  // Taqueros/orders-related
  const taqueroTypes = [
    { name: "tripa y cabeza", canWorkOn: ["tripa", "cabeza"], chalan: "AMLO" },
    { name: "cabeza y asada", canWorkOn: ["cabeza", "asada"], chalan: "AMLO" },
    {
      name: "asada y suadero",
      canWorkOn: ["asada", "suadero"],
      chalan: "Marina",
    },
    {
      name: "suadero y adobada",
      canWorkOn: ["suadero", "adobada"],
      chalan: "Marina",
    },
  ];
  const getDefaultQueuesFor = (types) => {
    let orders = {};
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      orders[type.name] = [];
    }
    orders.done = [];
    orders.rejected = [];
    return orders;
  };
  const defaultQueues = getDefaultQueuesFor(taqueroTypes);
  const [orders, setOrders] = useState(defaultQueues);
  const defaultTaqueroMetadata = {
    workingOn: null,
    queueLength: 0,
    fan: {
      active: true,
      untilNeeded: 0,
    },
    rest: {
      untilNeeded: 1000,
      timeRested: 0,
    },
    tortillas: config.fillingsTop.tortillas,
    quesadillasInStock: 0,
    fillings: {
      salsa: config.fillingsTop.salsa,
      guacamole: config.fillingsTop.guacamole,
      cilantro: config.fillingsTop.cilantro,
      cebolla: config.fillingsTop.cebolla,
    },
  };
  const defaultQuesadilleroMetadata = {
    fan: {
      active: true,
      untilNeeded: 0,
    },
    rest: {
      untilNeeded: 1000,
      timeRested: 0,
    },
    tortillas: 50,
    quesadillasReady: 0,
  };
  const getDefaultMetadataFor = (types) => {
    let metadata = {};
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      metadata[type.name] = { ...defaultTaqueroMetadata, chalan: type.chalan };
    }
    metadata["quesadillero"] = defaultQuesadilleroMetadata;
    return metadata;
  };
  const [metadata, setMetadata] = useState(getDefaultMetadataFor(taqueroTypes));
  const taqueros = taqueroTypes.map((type) =>
    Taquero(
      type.name,
      type.canWorkOn,
      setOrders,
      setMetadata,
      logsHandler,
      config.fillingsTop
    )
  );
  const quesadillero = Quesadillero(
    setMetadata,
    taqueros,
    config.fillingsTop.tortillas
  );
  const allocationBalanceHandler = AllocationHandler(
    taqueros,
    taqueroTypes,
    logsHandler,
    setOrders
  );
  const chalanesHandler = ChalanesHandler(taqueroTypes, taqueros, logsHandler);

  // Functions
  const capitalize = (str = "") => {
    return `${str.charAt(0).toUpperCase()}${str.substring(1, str.length)}`;
  };

  const cleanLogs = () => {
    localStorage.setItem("logs", JSON.stringify([]));
    setLogs([]);
  };

  const cleanRUDA = () => {
    cleanLogs();
    restartMetadata();
    restartOrders();
  };

  const formatOrderForTable = (order_) => {
    let order = { ...order_ };
    order.datetime = formatTimeForLogs(order.datetime);
    order.parts = order.orden.length;
    order.finishedParts = 0;
    order.productQuantity = 0;
    for (let i = 0; i < order.orden.length; i++) {
      const part = order.orden[i];
      if (part.status === "done") order.finishedParts++;
      order.productQuantity += part.quantity;
    }
    delete order.orden;
    order.stepsDone = order.response !== undefined ? order.response.length : 0;
    delete order.response;
    return order;
  };

  const formatOrdersForTable = (orders) => {
    let res = [];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i] == null) continue;
      res.push(formatOrderForTable(orders[i]));
    }
    return res;
  };

  const formatTimeForLogs = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} (${date.getMilliseconds()}ms)`;
  };

  const ordersAreFinished = () => {
    for (let i = 0; i < taqueros.length; i++) {
      if (taqueros[i].getQueueSize() > 0) return false;
    }
    if (JSON.parse(localStorage.getItem("ordersToReAllocate")).length > 0)
      return false;
    return true;
  };

  const restartMetadata = () => {
    setMetadata(getDefaultMetadataFor(taqueroTypes));
    localStorage.setItem(
      "metadata",
      JSON.stringify(getDefaultMetadataFor(taqueroTypes))
    );
  };

  const restartOrders = () => {
    OrdersHandler(setOrders, null, defaultQueues).restartRUDA();
  };

  const setup = () => {
    // Set initial local storage values
    localStorage.setItem("orders", JSON.stringify(defaultQueues));
    localStorage.setItem("logs", JSON.stringify([]));
    localStorage.setItem(
      "metadata",
      JSON.stringify(getDefaultMetadataFor(taqueroTypes))
    );
    localStorage.setItem("ordersToReAllocate", JSON.stringify([]));
  };

  const startRUDA = async () => {
    if (isRunning) return;
    setIsRunning(true);
    cleanRUDA();
    localStorage.setItem("RUDAIsWorking", JSON.stringify(true));

    // Start chalanes
    chalanesHandler.start();

    // Start Allocation and balance handler
    allocationBalanceHandler.start(sampleInput);

    // Start every taquero
    for (let i = 0; i < taqueros.length; i++) {
      taqueros[i].startWorking();
    }
    // Start quesadillero
    quesadillero.start();
    // Start loop until everything is done
    let counter = 0;
    while (true) {
      const now = Date.now();
      await timeout(100);
      if (ordersAreFinished()) {
        localStorage.setItem("RUDAIsWorking", JSON.stringify(false));
        break;
      }
      counter += Date.now() - now;
      setChrono((counter / 1000).toFixed(1));
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
          <div className="taquerosContainer">
            {/* Taqueros */}
            {taqueroTypes.map((taqueroType) => {
              const index = taqueroTypes.indexOf(taqueroType);
              return (
                <div key={index} className="taqueroContainer">
                  <h4 className="taqueroName">Taquero de {taqueroType.name}</h4>
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
                      <h6 className="taqueroMetadataRowTitle">Chalán:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].chalan}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Time rested:</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].rest.timeRested}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">
                        Tacos untill rest:
                      </h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].rest.untilNeeded}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">
                        Quesadillas in stock:
                      </h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].quesadillasInStock}
                      </p>
                    </div>
                    <div className="taqueroMetadataRowContainer">
                      <h6 className="taqueroMetadataRowTitle">Tortillas</h6>
                      <p className="actualMetadata">
                        {metadata[taqueroType.name].tortillas}
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
            {/* Quesadillero */}
            <div className="taqueroContainer">
              <h4 className="taqueroName">Quesadillero</h4>
              <div className="taqueroMetadataContainer">
                <h3 className="metadata">Metadata</h3>
                <div className="taqueroMetadataRowContainer">
                  <h6 className="taqueroMetadataRowTitle">
                    Ready quesadillas:
                  </h6>
                  <p className="actualMetadata">
                    {metadata.quesadillero.quesadillasReady}
                  </p>
                </div>
                <div className="taqueroMetadataRowContainer">
                  <h6 className="taqueroMetadataRowTitle">Fan active:</h6>
                  <p className="actualMetadata">
                    {JSON.stringify(metadata.quesadillero.fan.active)}
                  </p>
                </div>
                <div className="taqueroMetadataRowContainer">
                  <h6 className="taqueroMetadataRowTitle">Time rested:</h6>
                  <p className="actualMetadata">
                    {metadata.quesadillero.rest.timeRested}
                  </p>
                </div>
                <div className="taqueroMetadataRowContainer">
                  <h6 className="taqueroMetadataRowTitle">
                    Quesadillas untill rest:
                  </h6>
                  <p className="actualMetadata">
                    {metadata.quesadillero.rest.untilNeeded}
                  </p>
                </div>
                <div className="taqueroMetadataRowContainer">
                  <h6 className="taqueroMetadataRowTitle">Tortillas</h6>
                  <p className="actualMetadata">
                    {metadata.quesadillero.tortillas}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className="orders">Orders</h2>
          <div className="ordersContainer">
            {Object.keys(orders).map((key) => (
              <div key={key} className="tableSuperContainer">
                <p className="tableName">{capitalize(key)}</p>
                <Table data={formatOrdersForTable([...orders[key]])} />
              </div>
            ))}
          </div>
        </div>
        <div className="logsContainer">
          <h2 className="logsTitle">Logs:</h2>
          <p className="logsSubtitle">(De más nuevo a más viejo)</p>
          <div className="logsContentContainer">
            {logs.map((log) => (
              <div
                className="logContainer"
                key={`${log.time}_${log.title}_${log.message}`}
              >
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
// FRI
//   Rest
//   Scheduler
// SAT
//   Balanceo (when taquero needs to rest)
// SUN
//   Doc and extras
