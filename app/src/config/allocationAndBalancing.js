const Handler = (taqueros, quesadilleros, taqueroTypes) => {
  const getOrders = (cuantity) => {
    let res = [];
    for (let i = 0; i < cuantity; i++) {
      res.push(`Order ${i}`);
    }
    return res;
  };

  const insertTaquero = (taqueroType, ordersCuantity) => {
    taqueros[taqueroTypes.indexOf(taqueroType)].insertToQueue(
      getOrders(ordersCuantity)
    );
  };

  const start = () => {
    // Insert 10 orders and start working
    for (let i = 0; i < taqueros.length; i++) {
      taqueros[i].insertToQueue(getOrders(5));
    }
  };
  return { start, insertTaquero };
};
export default Handler;
