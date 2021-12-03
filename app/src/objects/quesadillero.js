// Handlers
import MetadataHandler from "../config/metadataHandler";

const Quesadillero = (setMetadataFunction, taqueros) => {
  // Handlers and helpers inicialization
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const metadataHandler = MetadataHandler(setMetadataFunction, "quesadillero");

  const saveQuesadilla = () => {
    metadataHandler.setMetadata(
      "quesadillasReady",
      metadataHandler.getMetadata()["quesadillero"].quesadillasReady + 1
    );
  };

  const start = async () => {
    while (true) {
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      // Use Tortillas
      metadataHandler.setMetadata(
        "tortillas",
        metadataHandler.getMetadata()["quesadillero"].tortillas - 1
      );
      await timeout(5000); // Fucking long time to make a tortilla with cheese
      let min = {
        index: null,
        quantity: 6,
      };
      for (let i = 0; i < taqueros.length; i++) {
        const taquero = taqueros[i];
        if (
          taquero.getQuesadillasInStock() < min.quantity &&
          taquero.getQuesadillasInStock() < 5
        )
          min = { index: i, quantity: taquero.getQuesadillasInStock() };
      }
      if (min.index !== null) {
        taqueros[min.index].giveQuesadilla();
      } else saveQuesadilla();
    }
  };

  return { start };
};

export default Quesadillero;
