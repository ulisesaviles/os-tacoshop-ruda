const Handler = (taqueroTypes, taqueros, logsHandler) => {
  const fillings = ["guacamole", "salsa", "tortillas", "cilantro", "cebolla"];

  const log = (chalanName, taqueroName, filling) => {
    logsHandler.log(
      `Chalan ${chalanName}:`,
      `Filled ${taqueroName}'s' ${filling}`
    );
  };

  const placeTortillas = async (chalan) => {
    for (let i = 0; i < chalan.servesTaqueros.length; i++) {
      const taquero = taqueroWithName(chalan.servesTaqueros[i]);
      await taquero.fillFilling("tortillas");
      log(chalan.name, taquero.name, "tortillas");
    }
  };

  const setup = () => {
    let chalanes = {};
    for (let i = 0; i < taqueroTypes.length; i++) {
      const type = taqueroTypes[i];
      if (chalanes[type.chalan] === undefined)
        chalanes[type.chalan] = [type.name];
      else chalanes[type.chalan].push(type.name);
    }
    chalanes = Object.keys(chalanes).map((key) => {
      return { name: key, servesTaqueros: chalanes[key] };
    });
    return chalanes;
  };

  const start = () => {
    const chalanes = setup();
    chalanes.forEach((chalan) => startWorking(chalan));
  };

  const startWorking = async (chalan) => {
    while (true) {
      if (!JSON.parse(localStorage.getItem("RUDAIsWorking"))) break;
      await work(chalan);
    }
  };

  const taqueroWithName = (name) => {
    for (let i = 0; i < taqueros.length; i++) {
      const taquero = taqueros[i];
      if (taquero.name === name) return taquero;
    }
  };

  const work = async (chalan) => {
    let milisecs = 0;
    let tempTime;
    for (let i = 0; i < chalan.servesTaqueros.length; i++) {
      const taquero = taqueroWithName(chalan.servesTaqueros[i]);
      for (let i = 0; i < fillings.length; i++) {
        const filling = fillings[i];
        tempTime = Date.now();
        if (await taquero.fillFilling(filling))
          log(chalan.name, taquero.name, filling);
        milisecs += Date.now() - tempTime;
        if (milisecs > 20_000) {
          await placeTortillas(chalan);
          milisecs = 0;
        }
      }
    }
  };

  return {
    start,
  };
};

export default Handler;
