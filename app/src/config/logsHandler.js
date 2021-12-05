const Handler = (setLogsFunction) => {
  const log = (title, message) => {
    let logs = JSON.parse(localStorage.getItem("logs"));
    logs.unshift({ title, message, time: Date.now() });

    if (logs.length > 100) logs.pop();
    setLogsFunction(logs);
    localStorage.setItem("logs", JSON.stringify(logs));
  };

  return { log };
};

export default Handler;
