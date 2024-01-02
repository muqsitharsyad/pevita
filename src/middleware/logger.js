module.exports = {
    appenders: {
      error: {
        type: "file",
        filename: "./logs/errors/error.log",
        pattern: "yyyy-MM-dd",
        compress: true,
      },
      debug: {
        type: "file",
        filename: "./logs/debugs/debug.log",
        pattern: "yyyy-MM-dd",
        compress: true,
      },
      trace: {
        type: "file",
        filename: "./logs/traces/trace.log",
        pattern: "yyyy-MM-dd",
        compress: true,
      },
    },
    categories: {
      default: { appenders: ["error"], level: "error" },
      debug: { appenders: ["debug"], level: "debug" },
      trace: { appenders: ["trace"], level: "trace" },
    },
  };