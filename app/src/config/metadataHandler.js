const Handler = (setMetadataFunction, taqueroName) => {
  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const consumeFillings = async (fillingNames) => {
    let metadata = getMetadata();
    for (let i = 0; i < fillingNames.length; i++) {
      const fillingName = fillingNames[i];
      metadata[taqueroName].fillings[fillingName]--;
      await timeout(500);
      setMetadata("fillings", metadata[taqueroName].fillings);
    }
  };

  const getMetadata = () => {
    const metadata = localStorage.getItem("metadata");
    return JSON.parse(metadata);
  };

  const getUnoccupiedTaqueros = () => {
    let res = [];
    const metadata = getMetadata();
    const keys = Object.keys(metadata);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (metadata[key].workingOn === null && !metadata[key].resting)
        res.push(key);
    }
    return res;
  };

  const madePart = () => {
    let metadata = getMetadata();
    // One less order in queue
    metadata[taqueroName].queueLength--;
    // Not working on any
    metadata[taqueroName].workingOn = null;
    // Set it
    setMetadataFunction(metadata);
    localStorage.setItem("metadata", JSON.stringify(metadata));
  };

  const madeTaco = () => {
    let metadata = getMetadata();
    // One taco less in rest
    metadata[taqueroName].rest.untilNeeded--;
    // One taco less in fan
    metadata[taqueroName].fan.untilNeeded--;
    // Set it
    setMetadataFunction(metadata);
    localStorage.setItem("metadata", JSON.stringify(metadata));
  };

  const setMetadata = (attribute, value) => {
    let generalMetadata = getMetadata();
    generalMetadata[taqueroName][attribute] = value;
    setMetadataFunction(generalMetadata);
    localStorage.setItem("metadata", JSON.stringify(generalMetadata));
  };

  const useTortilla = () => {
    let metadata = getMetadata();
    metadata[taqueroName].tortillas--;
    setMetadata("tortillas", metadata[taqueroName].tortillas);
  };

  return {
    getMetadata,
    setMetadata,
    consumeFillings,
    useTortilla,
    madeTaco,
    madePart,
    getUnoccupiedTaqueros,
  };
};

export default Handler;
