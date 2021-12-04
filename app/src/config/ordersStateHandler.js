const Handler = (setOrdersFunction, taqueroType, defaultQueues) => {
  const getOrders = () => {
    const orders = localStorage.getItem("orders");
    return JSON.parse(orders);
  };

  const pushOrder = (order) => {
    let generalOrders = getOrders();
    generalOrders[taqueroType].push(order);
    setOrdersFunction(generalOrders);
    localStorage.setItem("orders", JSON.stringify(generalOrders));
  };

  const restartRUDA = () => {
    setOrdersFunction(defaultQueues);
    localStorage.setItem("orders", JSON.stringify(defaultQueues));
  };

  const setOrders = (orders) => {
    let generalOrders = getOrders();
    generalOrders[taqueroType] = orders;
    setOrdersFunction(generalOrders);
    localStorage.setItem("orders", JSON.stringify(generalOrders));
  };

  return { getAllOrders: getOrders, setOrders, pushOrder, restartRUDA };
};

export default Handler;
