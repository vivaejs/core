"use strict";
const { createPlugin } = require("./index.js");

const websockets = createPlugin(({ url }) => {
  return () => ({
    middleware: function (v) {
      const wss = new WebSocket(url);
    },
  });
});

module.exports = websockets;
