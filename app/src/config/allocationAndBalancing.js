// Handlers
import OrdersHandler from "../config/ordersStateHandler";

const Handler = (taqueros, taqueroTypes, logsHandler, setOrdersFunction) => {
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getValidMeatTipesForTaqueros = (taqueroTypes) => {
    let res = [];
    for (let i = 0; i < taqueroTypes.length; i++) {
      const type = taqueroTypes[i];
      for (let j = 0; j < type.canWorkOn.length; j++) {
        const meatType = type.canWorkOn[j];
        if (!res.includes(meatType)) res.push(meatType);
      }
    }
    return res;
  };

  const validMeatTypes = getValidMeatTipesForTaqueros(taqueroTypes);
  const validIngredients = ["cilantro", "cebolla", "salsa", "guacamole"];
  let handlers = {};
  for (let i = 0; i < taqueroTypes.length; i++) {
    const taqueroType = taqueroTypes[i];
    handlers[taqueroType.name] = OrdersHandler(
      setOrdersFunction,
      taqueroType.name
    );
  }
  handlers.rejected = OrdersHandler(setOrdersFunction, "rejected");
  handlers.done = OrdersHandler(setOrdersFunction, "done");

  const allocateOrder = (order) => {
    let min = {
      name: null,
      listSize: taqueros[0].getQueueSize(),
      taqueroIndex: -1,
    };
    for (let i = 0; i < taqueros.length; i++) {
      const taquero = taqueros[i];
      if (!taqueroCanWorkOnOrder(taquero, order)) continue;
      if (taquero.getQueueSize() <= min.listSize) {
        min = {
          name: taquero.name,
          listSize: taquero.getQueueSize(),
          taqueroIndex: i,
        };
      }
    }
    if (min.name !== null) {
      insertTaquero(min.taqueroIndex, [order]);
      logsHandler.log(
        "Allocation and balancing:",
        `Asigned order ${order.request_id} to ${min.name}`
      );
      return true;
    } else if (orderIsComplete(order)) {
      completeOrder({ ...order });
      return true;
    } else {
      const orders = JSON.parse(localStorage.getItem("ordersToReAllocate"));
      localStorage.setItem(
        "ordersToReAllocate",
        JSON.stringify([...orders, order])
      );
      return false;
    }
  };

  const completeOrder = (order) => {
    order.status = "done";
    handlers.done.pushOrder(order);
    logsHandler.log(
      "Allocation and balancing:",
      `Order ${order.request_id} is done.`
    );
  };

  const handleEmptyOrder = (order) => {
    order.status = "done";
    handlers.done.pushOrder(order);
    logsHandler.log(
      "Allocation and balancing:",
      `Order ${order.request_id} was empty, so its done.`
    );
  };

  const insertTaquero = (taqueroIndex, orders) => {
    taqueros[taqueroIndex].insertToQueue(orders);
  };

  const filteredOrder = (order) => {
    const invalid = { invalid: true };
    let tacoCounter = 0;
    const tacoMax = 300;
    try {
      if (typeof order.request_id !== "number" || order.request_id < 0) {
        rejectOrder(order, "invalid id");
        return invalid;
      }
      if (new Date(order.datetime).toString() === "Invalid Date") {
        rejectOrder(order, "invalid date");
        return invalid;
      }
      if (order.status !== "open") {
        rejectOrder(order, `invalid status '${order.status}'`);
        return invalid;
      }
      let aPartIsInvalid = false;
      if (order.orden.length > 10) return invalid;
      for (let i = 0; i < order.orden.length; i++) {
        const part = order.orden[i];
        tacoCounter += part.quantity;
        if (tacoCounter > tacoMax) {
          rejectOrder(order, "the order has more than 300 products");
          return invalid;
        }
        const [orderId, subOrderId] = part.part_id.split("-");
        if (parseInt(orderId) !== order.request_id) {
          rejectPart(null, "Invalid Id");
          aPartIsInvalid = true;
          delete order.orden[i];
          continue;
        }
        if (
          parseInt(subOrderId) > order.orden.length ||
          parseInt(subOrderId) !== i
        ) {
          rejectPart(null, "Invalid Id");
          aPartIsInvalid = true;
          delete order.orden[i];
          continue;
        }
        if (part.cuantity > 100) {
          rejectPart(part.part_id, "has more than 100 products");
          aPartIsInvalid = true;
          delete order.orden[i];
          continue;
        }
        if (!validMeatTypes.includes(part.meat)) {
          rejectPart(
            part.part_id,
            `"${part.meat}" is not a valid type of meat`
          );
          aPartIsInvalid = true;
          delete order.orden[i];
          continue;
        }
        if (!["taco", "quesadilla"].includes(part.type)) {
          rejectPart(
            part.part_id,
            `"${part.type}" is not a valid type of product`
          );
          aPartIsInvalid = true;
          delete order.orden[i];
          continue;
        }
        if (part.status !== "open") {
          rejectPart(
            part.part_id,
            `"${part.status}" is not a valid initial status`
          );
          aPartIsInvalid = true;
          delete order.orden[i];
          continue;
        }
        for (let j = 0; j < part.ingredients.length; j++) {
          const ingredient = part.ingredients[j];
          if (!validIngredients.includes(ingredient)) {
            rejectPart(
              part.part_id,
              `"${ingredient}" is not a valid ingredient`
            );
            aPartIsInvalid = true;
            delete order.orden[i];
            continue;
          }
        }
        order.orden[i].delay_counter = 0;
        order.orden[i].finished_products = 0;
        order.response = [];
      }
      if (aPartIsInvalid) {
        const temp = order.orden;
        order.orden = [];
        for (let i = 0; i < temp.length; i++) {
          const part = temp[i];
          if (!part) continue;
          order.orden.push(part);
        }
      }
      return order;
    } catch (e) {
      return invalid;
    }
  };

  const orderIsComplete = (order) => {
    for (let i = 0; i < order.orden.length; i++) {
      const part = order.orden[i];
      if (part.status !== "done") return false;
    }
    return true;
  };

  const rejectOrder = (order, reazon) => {
    logsHandler.log(
      "Allocation and balancing:",
      `Order ${
        order.request_id ? order.request_id : "with unknown id"
      } rejected due to: ${reazon}`
    );
    order.status = "rejected";
    handlers.rejected.pushOrder(order);
  };

  const rejectPart = (partId, reazon) => {
    logsHandler.log(
      "Allocation and balancing:",
      `Part ${partId ? partId : "with unknown id"} rejected due to: ${reazon}`
    );
  };

  const start = (input) => {
    watchForOrdersToReallocate();
    for (let i = 0; i < input.length; i++) {
      const order = filteredOrder(input[i]);
      if (order.invalid) continue;
      if (order.orden.length === 0) {
        handleEmptyOrder({ ...order });
        continue;
      }
      allocateOrder(order);
    }
  };

  const taqueroCanWorkOnOrder = (taquero, order) => {
    for (let i = 0; i < order.orden.length; i++) {
      const part = order.orden[i];
      if (part.status === "done") continue;
      if (part.type === "quesadilla" && taquero.getQuesadillasInStock() === 0)
        continue;
      if (taquero.isResting()) continue;
      if (taquero.canWorkOn.includes(part.meat)) return true;
    }
  };

  const watchForOrdersToReallocate = async () => {
    while (true) {
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      const orders = JSON.parse(localStorage.getItem("ordersToReAllocate"));
      let ordersLeft = [];
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (!allocateOrder(order)) ordersLeft.push(order);
      }
      localStorage.setItem("ordersToReAllocate", JSON.stringify(ordersLeft));
      await timeout(100);
    }
  };

  return { start, insertTaquero, allocateOrder };
};
export default Handler;
