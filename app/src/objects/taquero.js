import OrdersHandler from "../config/ordersStateHandler";

const Taquero = (name, canWorkOn, ordersSetter, logsHandler) => {
  // Handlers and helpers
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const ordersHandler = OrdersHandler(ordersSetter, name);

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
    return queue;
  };

  const log = (message) => {
    logsHandler.log(`Taquero de ${name}:`, message);
  };

  const startWorking = async () => {
    if (getOrders().length === 0) return;
    while (true) {
      const itemsLeft = await workOnNextOrder();
      if (itemsLeft === 0) break;
    }
  };

  const workOnNextOrder = async () => {
    await timeout(1000);
    queue = getOrders();
    queue.shift();
    ordersHandler.setOrders(queue);
    log(`Finished an order, ${queue.length} left`);
    return queue.length;
  };

  // Actual object
  return {
    type: name,
    insertToQueue,
    getQueueSize: () => getOrders().length,
    workOnNextOrder,
    getOrders,
    startWorking,
  };
};

export default Taquero;
