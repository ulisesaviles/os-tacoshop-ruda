// Handlers
import OrdersHandler from "../config/ordersStateHandler";
import MetadataHandler from "../config/metadataHandler";

// Actual object
const Taquero = (
  name,
  canWorkOn,
  ordersSetter,
  setMetadataFunction,
  logsHandler,
  fillingsTop
) => {
  // Handlers and helpers inicialization
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const ordersHandler = OrdersHandler(ordersSetter, name);
  const metadataHandler = MetadataHandler(setMetadataFunction, name);

  // Attributes
  let queue = [];

  // Functions
  const fillFilling = async (filling) => {
    if (!fillingNeedsToBeFilled(filling)) {
      await timeout(100);
      return;
    }
    const times = {
      guacamole: 20,
      salsa: 15,
      cilantro: 10,
      cebolla: 10,
      tortillas: 5,
    };
    if (filling !== "tortillas") {
      let newFillings = metadataHandler.getMetadata()[name].fillings;
      newFillings[filling] = fillingsTop[filling];
      await timeout(times[filling] * 1000);
      metadataHandler.setMetadata("fillings", newFillings);
    } else {
      await timeout(times.tortillas * 1000);
      metadataHandler.setMetadata("tortillas", fillingsTop.tortillas);
    }
    return true;
  };

  const fillingNeedsToBeFilled = (filling) => {
    if (filling !== "tortillas")
      return (
        metadataHandler.getMetadata()[name].fillings[filling] <
        fillingsTop[filling]
      );
    return (
      metadataHandler.getMetadata()[name].tortillas < fillingsTop.tortillas
    );
  };

  const getNextOrderAndPartIndex = (queue) => {
    const orderIndex = 0;
    return [orderIndex, getPartToParticipate(queue[orderIndex].orden)];
  };

  const getOrders = () => {
    return ordersHandler.getAllOrders()[name];
  };

  const getQuesadillasInStock = () => {
    return metadataHandler.getMetadata()[name].quesadillasInStock;
  };

  const getPartToParticipate = (parts) => {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (
        canWorkOn.includes(part.meat) &&
        part.status !== "done" &&
        (part.type !== "quesadilla" || getQuesadillasInStock() >= 1)
      ) {
        return i;
      }
    }
    return null;
  };

  const getTortillas = () => {
    return metadataHandler.getMetadata()[name].tortillas;
  };

  const giveOrdersAway = () => {
    const orders = getOrders();
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      reAllocateOrder(order);
    }
    ordersHandler.setOrders([]);
  };

  const giveQuesadilla = () => {
    const newStock = metadataHandler.getMetadata()[name].quesadillasInStock + 1;
    metadataHandler.setMetadata("quesadillasInStock", newStock);
  };

  const hasEnoughFillings = (ingredients) => {
    const fillings = metadataHandler.getMetadata()[name].fillings;
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      if (fillings[ingredient] === 0) return false;
    }
    return true;
  };

  const insertToQueue = (newElements) => {
    queue = [...getOrders(), ...newElements];
    ordersHandler.setOrders(queue);
    log(`Inserted ${newElements.length} element(s) succesfully`);
    metadataHandler.setMetadata("queueLength", queue.length);
    return queue;
  };

  const isResting = () => {
    return metadataHandler.getMetadata()[name].rest.resting;
  };

  const log = (message) => {
    logsHandler.log(`Taquero ${name}:`, message);
  };

  const needsToRest = () => {
    return metadataHandler.getMetadata()[name].rest.untilNeeded === 0;
  };

  const notifyResting = () => {
    let rest = metadataHandler.getMetadata()[name].rest;
    rest.resting = true;
    metadataHandler.setMetadata("rest", rest);
  };

  const putFillings = async (part) => {
    await metadataHandler.consumeFillings(part.ingredients);
  };

  const reAllocateOrder = async (order) => {
    log(`I'll give order ${order.request_id} to allocation handler`);
    const orders = JSON.parse(localStorage.getItem("ordersToReAllocate"));
    localStorage.setItem(
      "ordersToReAllocate",
      JSON.stringify([...orders, order])
    );
  };

  const rest = async () => {
    const timeToRest = 60 - metadataHandler.getMetadata()[name].rest.timeRested;
    if (timeToRest > 0) {
      log(`I'll rest ${timeToRest} secs`);
      await timeout(timeToRest * 1000);
    }
    metadataHandler.setMetadata("rest", {
      untilNeeded: 1000,
      timeRested: 0,
      resting: false,
    });
  };

  const restart = () => {
    ordersHandler.setOrders([]);
  };

  const rest1Second = async () => {
    let meta = metadataHandler.getMetadata()[name];
    meta.rest.tempResting = true;
    metadataHandler.setMetadata("rest", meta.rest);

    await timeout(1000);

    meta = metadataHandler.getMetadata()[name];
    meta.rest.timeRested++;
    meta.rest.tempResting = false;
    metadataHandler.setMetadata("rest", meta.rest);
  };

  const startWorking = async () => {
    while (true) {
      if (getOrders().length === 0) {
        await rest1Second();
      } else await workOnNextOrder();
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
    }
  };

  const workOnNextOrder = async () => {
    // Get orders
    queue = getOrders();
    // Get an order and a part to participate in
    const [orderIndex, partIndex] = getNextOrderAndPartIndex(queue);
    let part = queue[orderIndex].orden[partIndex];

    // If not enough quesadillas, rest 1 sec to avoid infinite loop
    if (
      partIndex === null || // Cannot currently work on it (fillings, quesadillas, etc)
      (part.type === "quesadilla" && getQuesadillasInStock() === 0)
    ) {
      reAllocateOrder(queue.shift());
      ordersHandler.setOrders(queue);
      await rest1Second();
      return;
    }
    const start = Date.now();

    // Start working on it
    queue[orderIndex].status = "working";
    ordersHandler.setOrders(queue);
    part.status = "working";
    metadataHandler.setMetadata("workingOn", part.part_id);
    // Make the tacos
    let quantity = 0;
    for (let i = 0; part.quantity > part.finished_products; i++) {
      // If needs to rest, rest and give away all orders
      if (needsToRest()) {
        notifyResting();
        giveOrdersAway();
        await rest();
        return;
      }

      // Validations:
      // Has not anought fillings
      if (!hasEnoughFillings(part.ingredients)) {
        log(`I have not enought fillings to continue`);
        part.status = "open";
        break;
      }
      // If quesadillas are not enough
      if (part.type === "quesadilla" && getQuesadillasInStock() <= 0) {
        part.status = "open";
        break;
      }

      // If quesdilla, use a quesadilla
      if (part.type === "quesadilla") {
        const newStock =
          metadataHandler.getMetadata()[name].quesadillasInStock - 1;
        metadataHandler.setMetadata("quesadillasInStock", newStock);
      } else if (part.type !== "quesadilla") {
        // If taco, use a tortilla
        metadataHandler.useTortilla();
        await timeout(1000);
      }

      // Put fllings
      await putFillings(part);

      // Updates
      metadataHandler.madeTaco();
      part.finished_products += 1;
      if (part.quantity === part.finished_products) part.status = "done";
      quantity++;
    }

    // Set it
    queue[orderIndex].orden[partIndex] = part;
    queue[orderIndex].response.push({
      who: `Taquero de ${name}`,
      when: new Date().toISOString(),
      what: `Made ${quantity} ${part.meat} ${part.type} (part ${part.part_id})`,
      time: Date.now() - start,
    });
    queue[orderIndex].status = "open";
    metadataHandler.madePart();

    // Re-allocate it
    reAllocateOrder(queue.shift());
    ordersHandler.setOrders(queue);

    // Log it
    log(
      `${
        part.quantity === part.finished_products ? "Finished" : "Putted aside"
      } part "${part.part_id}" (${part.finished_products}/${part.quantity})  ${
        queue.length
      } left in my list`
    );

    // Return it
    return queue.length;
  };

  // Actual object
  return {
    name,
    insertToQueue,
    getQueueSize: () => getOrders().length,
    workOnNextOrder,
    getOrders,
    startWorking,
    canWorkOn,
    getQuesadillasInStock,
    giveQuesadilla,
    restart,
    fillFilling,
    getTortillas,
    isResting,
  };
};

export default Taquero;
