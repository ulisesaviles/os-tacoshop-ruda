// Handlers
import MetadataHandler from "../config/metadataHandler";

const Quesadillero = (setMetadataFunction, taqueros) => {
  // Handlers and helpers inicialization
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const metadataHandler = MetadataHandler(setMetadataFunction, "quesadillero");
  const taquerosQuesadillasSpace = 5;

  const getReadyQuesadillas = () => {
    return metadataHandler.getMetadata()["quesadillero"].quesadillasReady;
  };

  const saveQuesadilla = () => {
    metadataHandler.setMetadata("quesadillasReady", getReadyQuesadillas() + 1);
  };

  const start = async () => {
    watchForSpaceToPutQuesadillas();
    while (true) {
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      // Use Tortillas
      metadataHandler.setMetadata(
        "tortillas",
        metadataHandler.getMetadata()["quesadillero"].tortillas - 1
      );
      // Rest
      let rest = metadataHandler.getMetadata()["quesadillero"].rest;
      rest.untilNeeded -= 1;
      metadataHandler.setMetadata("rest", rest);
      await timeout(5000); // Fucking long time to make a tortilla with cheese
      let min = {
        index: null,
        quantity: 6,
      };
      for (let i = 0; i < taqueros.length; i++) {
        const taquero = taqueros[i];
        if (
          taquero.getQuesadillasInStock() < min.quantity &&
          taquero.getQuesadillasInStock() < taquerosQuesadillasSpace
        )
          min = { index: i, quantity: taquero.getQuesadillasInStock() };
      }
      if (min.index !== null) {
        taqueros[min.index].giveQuesadilla();
      } else saveQuesadilla();
    }
  };

  const watchForSpaceToPutQuesadillas = async () => {
    while (true) {
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      let quesadillasReady = getReadyQuesadillas();
      if (quesadillasReady > 0) {
        // Iterate every taquero
        for (let i = 0; i < taqueros.length; i++) {
          const taquero = taqueros[i];
          while (
            taquero.getQuesadillasInStock() < taquerosQuesadillasSpace &&
            quesadillasReady > 0
          ) {
            // Use ready quesadilla
            metadataHandler.setMetadata(
              "quesadillasReady",
              getReadyQuesadillas() - 1
            );
            // Give it away
            taquero.giveQuesadilla();
            // rewrite quesadillas ready
            quesadillasReady = getReadyQuesadillas();
          }
        }
      }
      await timeout(100);
    }
  };

  return { start };
};

export default Quesadillero;
