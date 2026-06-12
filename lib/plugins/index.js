"use strict";
const serve = require("./serve.js");

const logging = function () {
  return {
    middleware: function (v) {
      console.log(v.method, v.path);
    },
  };
};

module.exports = { serve, logging };
