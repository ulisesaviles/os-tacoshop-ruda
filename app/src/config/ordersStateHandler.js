const Handler = (setOrdersFunction, taqueroType) => {
  const getOrders = () => {
    const orders = localStorage.getItem("orders");
    return JSON.parse(orders);
  };

  const setOrders = (orders) => {
    let generalOrders = getOrders();
    setOrdersFunction(generalOrders);
    generalOrders[taqueroType] = orders;
    setOrdersFunction(generalOrders);
    localStorage.setItem("orders", JSON.stringify(generalOrders));
  };

  return { getAllOrders: getOrders, setOrders };
};

export default Handler;
