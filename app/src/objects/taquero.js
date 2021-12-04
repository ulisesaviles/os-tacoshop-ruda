// Handlers
import OrdersHandler from "../config/ordersStateHandler";
import MetadataHandler from "../config/metadataHandler";

// Actual object
const Taquero = (
  name,
  canWorkOn,
  ordersSetter,
  setMetadataFunction,
  logsHandler
) => {
  // Handlers and helpers inicialization
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const ordersHandler = OrdersHandler(ordersSetter, name);
  const metadataHandler = MetadataHandler(setMetadataFunction, name);

  // Attributes
  let queue = [];

  // Functions
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
        return [part, i];
      }
    }
    return [null, null];
  };

  const giveQuesadilla = () => {
    const newStock = metadataHandler.getMetadata()[name].quesadillasInStock + 1;
    metadataHandler.setMetadata("quesadillasInStock", newStock);
  };

  const insertToQueue = (newElements) => {
    queue = [...getOrders(), ...newElements];
    ordersHandler.setOrders(queue);
    log(`Inserted ${newElements.length} element(s) succesfully`);
    metadataHandler.setMetadata("queueLength", queue.length);
    return queue;
  };

  const log = (message) => {
    logsHandler.log(`Taquero de ${name}:`, message);
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

  const restart = () => {
    ordersHandler.setOrders([]);
  };

  const rest1Second = async () => {
    await timeout(1000);
    let meta = metadataHandler.getMetadata()[name];
    meta.rest.timeRested++;
    metadataHandler.setMetadata("rest", meta.rest);
  };

  const startWorking = async () => {
    while (true) {
      if (getOrders().length === 0) await rest1Second();
      else await workOnNextOrder();
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
    }
  };

  const workOnNextOrder = async () => {
    // Get orders
    queue = getOrders();
    // Make the first one's corresponding parts
    const order = queue[0];
    // Get a part to participate in
    let [part, partIndex] = getPartToParticipate(order.orden);
    if (
      part === null ||
      (part.type === "quesadilla" && getQuesadillasInStock() === 0)
    ) {
      reAllocateOrder(queue.shift());
      ordersHandler.setOrders(queue);
      await rest1Second();
      return;
    }
    const start = Date.now();
    // Start working on it
    part.status = "working";
    metadataHandler.setMetadata("workingOn", part.part_id);
    // Make the tacos
    for (let i = 0; part.quantity > part.finished_products; i++) {
      // If quesdilla, use 1
      if (part.type === "quesadilla") {
        if (getQuesadillasInStock() > 0) {
          const newStock =
            metadataHandler.getMetadata()[name].quesadillasInStock - 1;
          metadataHandler.setMetadata("quesadillasInStock", newStock);
        } else {
          part.status = "open";
          break;
        }
      } else {
        // Taco time
        metadataHandler.useTortilla();
        await timeout(1000);
      }
      // Put fllings
      await putFillings(part);
      // Sum
      part.finished_products += 1;
      if (part.quantity === part.finished_products) part.status = "done";
    }
    part.status = part.status === "done" ? part.status : "open";
    // Set it
    queue[0].orden[partIndex] = part;
    queue[0].response.push({
      who: `Taquero de ${name}`,
      when: new Date().toISOString(),
      what: `Made ${part.finished_products} ${part.meat} ${part.type} (part ${part.part_id})`,
      time: Date.now() - start,
    });
    reAllocateOrder(queue.shift());
    ordersHandler.setOrders(queue);
    metadataHandler.madeTacos(part.quantity);
    // Log it
    log(`Finished part "${part.part_id}" ${queue.length} left`);
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
  };
};

export default Taquero;
