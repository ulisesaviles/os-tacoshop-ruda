const Handler = (setOrdersFunction, taqueroType) => {
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

  const setOrders = (orders) => {
    let generalOrders = getOrders();
    generalOrders[taqueroType] = orders;
    setOrdersFunction(generalOrders);
    localStorage.setItem("orders", JSON.stringify(generalOrders));
  };

  return { getAllOrders: getOrders, setOrders, pushOrder };
};

export default Handler;
