// Handlers
import OrdersHandler from "../config/ordersStateHandler";
import MetadataHandler from "../config/metadataHandler";

// AWS
import AWS from "aws-sdk";

// Sample input
import sampleInput from "../samples/miniOrdenes.json";

const Handler = (
  taqueros,
  taqueroTypes,
  logsHandler,
  setOrdersFunction,
  setMetadataFunction
) => {
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const metadataHandler = MetadataHandler(setMetadataFunction);

  // AWS
  const checkAWSCredentials = () => {
    let awsConfig = localStorage.getItem("awsConfig");
    if (!awsConfig) {
      awsConfig = {};
      awsConfig.accessKeyId = window.prompt(
        "Ingresa el accessKeyId del equipo 9: "
      );
      awsConfig.secretAccessKey = window.prompt(
        "Ingresa el secretAccessKey del equipo 9: "
      );
      awsConfig.region = "us-east-1";
      localStorage.setItem("awsConfig", JSON.stringify(awsConfig));
    } else {
      awsConfig = JSON.parse(awsConfig);
      if (
        awsConfig.accessKeyId === null ||
        awsConfig.secretAccessKey === null
      ) {
        awsConfig = {};
        awsConfig.accessKeyId = window.prompt(
          "Ingresa el accessKeyId del equipo 9: "
        );
        awsConfig.secretAccessKey = window.prompt(
          "Ingresa el secretAccessKey del equipo 9: "
        );
        awsConfig.region = "us-east-1";
        localStorage.setItem("awsConfig", JSON.stringify(awsConfig));
      }
      // else console.log("FOUND CREDENTIALS: ", awsConfig);
    }
    AWS.config.update({ ...awsConfig, region: "us-east-1" });
  };
  let checked = false;
  if (!checked) {
    checked = true;
    checkAWSCredentials();
  }
  const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  const QueueUrl =
    "https://sqs.us-east-1.amazonaws.com/292274580527/sqs_cc106_team_9";

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
      log(`Asigned order ${order.request_id} to ${min.name}`);
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
    log(`Order ${order.request_id} is done.`);
  };

  const deleteMessage = async (ReceiptHandle) => {
    return new Promise((resolve) => {
      sqs.deleteMessage(
        {
          QueueUrl,
          ReceiptHandle,
        },
        () => resolve()
      );
    });
  };

  const handleEmptyOrder = (order) => {
    order.status = "done";
    handlers.done.pushOrder(order);
    log(`Order ${order.request_id} was empty, so its done.`);
  };

  const insertTaquero = (taqueroIndex, orders) => {
    taqueros[taqueroIndex].insertToQueue(orders);
  };

  const fillQueue = async (input) => {
    for (let i = 0; i < input.length; i++) {
      const order = input[i];
      await sendMessage(order);
    }
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

  const giveOrders = async (taqueroName) => {
    await timeout(1000);
    // Get all open orders in where taquero can participate
    let allOrders = handlers.done.getAllOrders();
    const ordersKeys = Object.keys(allOrders);
    for (let i = 0; i < ordersKeys.length; i++) {
      const key = ordersKeys[i];
      if (["done", "rejected", taqueroName].includes(key)) continue;
      for (let j = 0; j < allOrders[key].length; j++) {
        const order = allOrders[key][j];
        if (taqueroCanWorkOnOrder(taqueroWithName(taqueroName), order)) {
          // Give him an order
          handlers[taqueroName].setOrders([order]);
          allOrders[key].splice(j, 1);
          handlers[key].setOrders(allOrders[key]);
          log(`${taqueroName} was unoccupied, so I gave him something to do.`);
        }
      }
    }
  };

  const log = (message) => {
    logsHandler.log("Allocation and balancing:", message);
  };

  const orderIsComplete = (order) => {
    for (let i = 0; i < order.orden.length; i++) {
      const part = order.orden[i];
      if (part.status !== "done") return false;
    }
    return true;
  };

  const purgeQueue = async () => {
    return new Promise((resolve) => {
      sqs.purgeQueue({ QueueUrl }, () => {
        resolve();
      });
    });
  };

  const receiveMessages = async () => {
    return new Promise((resolve) => {
      sqs.receiveMessage({ QueueUrl }, (err, data) => {
        resolve(data.Messages);
      });
    });
  };

  const rejectOrder = (order, reazon) => {
    log(
      `Order ${
        order.request_id ? order.request_id : "with unknown id"
      } rejected due to: ${reazon}`
    );
    order.status = "rejected";
    handlers.rejected.pushOrder(order);
  };

  const rejectPart = (partId, reazon) => {
    log(
      `Part ${partId ? partId : "with unknown id"} rejected due to: ${reazon}`
    );
  };

  const sendMessage = async (order) => {
    return new Promise((resolve) => {
      sqs.sendMessage({ MessageBody: JSON.stringify(order), QueueUrl }, () =>
        resolve()
      );
    });
  };

  const start = async () => {
    await purgeQueue();
    await fillQueue(sampleInput);

    watchForOrdersToReallocate();
    watchForUnoccupiedTaqueros();
    while (true) {
      const messages = await receiveMessages();
      if (messages.length > 0) {
        await deleteMessage(messages[0].ReceiptHandle);
        const order = filteredOrder(JSON.parse(messages[0].Body));

        if (order.invalid) continue;
        if (order.orden.length === 0) {
          handleEmptyOrder({ ...order });
          continue;
        }

        allocateOrder(order);
      } else {
        log("There are no more orders");
        localStorage.setItem("gotAllOrders", JSON.stringify(true));
        break;
      }
    }
  };

  const taqueroCanWorkOnOrder = (taquero, order) => {
    if (order.status !== "open") return;
    for (let i = 0; i < order.orden.length; i++) {
      const part = order.orden[i];
      if (part.status !== "open") continue;
      if (part.type === "quesadilla" && taquero.getQuesadillasInStock() === 0)
        continue;
      if (taquero.isResting()) continue;
      if (taquero.canWorkOn.includes(part.meat)) return true;
    }
  };

  const taqueroWithName = (name) => {
    for (let i = 0; i < taqueros.length; i++) {
      const taquero = taqueros[i];
      if (taquero.name === name) return taquero;
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

  const watchForUnoccupiedTaqueros = async () => {
    while (true) {
      await timeout(1000);
      // If RUDA is no longer working, break
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      // If we are still receiving orders, continue
      if (!JSON.parse(localStorage.getItem("gotAllOrders"))) continue;

      // Get unoccupied taqueros and do something about it;
      const unoccupied = metadataHandler.getUnoccupiedTaqueros();
      for (let i = 0; i < unoccupied.length; i++) {
        const taqueroName = unoccupied[i];
        await giveOrders(taqueroName);
      }
    }
  };

  return { start, insertTaquero, allocateOrder };
};
export default Handler;
