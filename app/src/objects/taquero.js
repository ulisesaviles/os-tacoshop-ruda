import Handler from "../config/ordersStateHandler";

const Taquero = (type, ordersSetter) => {
  // Handlers and helpers
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handler = Handler(ordersSetter, type);

  // Attributes
  let queue = [];

  // Functions
  const getOrders = () => {
    return handler.getAllOrders()[type];
  };

  const insertToQueue = (newElements) => {
    queue = [...getOrders(), ...newElements];
    handler.setOrders(queue);
    // console.log(`Successfully setted orders to ${JSON.stringify(getOrders())}`);
    return queue;
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
    // console.log(queue);
    // console.log(`Taquero de ${type} finalizó una orden`);
    queue.shift();
    handler.setOrders(queue);
    return queue.length;
  };

  // Actual object
  return {
    type,
    insertToQueue,
    getQueueSize: () => getOrders().length,
    workOnNextOrder,
    getOrders,
    startWorking,
  };
};

export default Taquero;
