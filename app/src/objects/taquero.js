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

  const putFillings = async (order) => {
    // MAKE IT WORKKK
    const fillings = ["salsa", "guacamole", "cilantro", "cebolla"];
    await metadataHandler.consumeFillings(fillings);
  };

  const startWorking = async () => {
    if (getOrders().length === 0) return;
    while (true) {
      const itemsLeft = await workOnNextOrder();
      if (itemsLeft === 0) break;
    }
  };

  const workOnNextOrder = async () => {
    // Get orders
    queue = getOrders();
    // MAke the first one
    const order = queue.shift();
    metadataHandler.setMetadata("workingOn", order);
    // Taco time
    metadataHandler.useTortilla();
    await timeout(1000);
    // Put fllings
    await putFillings(order);
    // Set it
    ordersHandler.setOrders(queue);
    metadataHandler.madeTaco();
    // Log it
    log(`Finished an order, ${queue.length} left`);
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
  };
};

export default Taquero;
