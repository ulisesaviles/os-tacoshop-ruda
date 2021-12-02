const Handler = (setLogsFunction) => {
  const log = (title, message) => {
    let logs = JSON.parse(localStorage.getItem("logs"));
    logs.unshift({ title, message, time: Date.now() });
    setLogsFunction(logs);
    console.log(logs);
    localStorage.setItem("logs", JSON.stringify(logs));
  };

  return { log };
};

export default Handler;
