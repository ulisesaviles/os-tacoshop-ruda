// Handlers
import MetadataHandler from "../config/metadataHandler";

const Quesadillero = (setMetadataFunction, taqueros, maxTortillas) => {
  // Handlers and helpers inicialization
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const metadataHandler = MetadataHandler(setMetadataFunction, "quesadillero");
  const taquerosQuesadillasSpace = 5;

  const getReadyQuesadillas = () => {
    return metadataHandler.getMetadata()["quesadillero"].quesadillasReady;
  };

  const getTortillas = async () => {
    await timeout(10_000);
    metadataHandler.setMetadata("tortillas", maxTortillas);
  };

  const saveQuesadilla = () => {
    metadataHandler.setMetadata("quesadillasReady", getReadyQuesadillas() + 1);
  };

  const start = async () => {
    watchForSpaceToPutQuesadillas();
    while (true) {
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      // Get tortillas if needed
      let currentTortillas =
        metadataHandler.getMetadata()["quesadillero"].tortillas;
      if (currentTortillas === 0) {
        await getTortillas();
        currentTortillas =
          metadataHandler.getMetadata()["quesadillero"].tortillas;
      }
      // Use Tortillas
      metadataHandler.setMetadata("tortillas", currentTortillas - 1);
      await timeout(5_000); // Fucking long time to make a tortilla with cheese
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
