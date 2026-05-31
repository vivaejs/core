"use strict";
const mime_types = require("./http/mime_types.js");
const path = require("path");
const fs = require("fs");

function createPlugin(fn) {
  return (...args) => ({
    plugin: true,
    init(server) {
      return fn(...args)(server);
    },
  });
}

const serve = createPlugin(
  (
    options = {
      directory: "public",
      autoEncoding: false,
      headers: mime_types,
    },
  ) => {
    return () => ({
      middleware: function (vobj) {
        try {
          const filename = path.join(path.resolve(options.directory), vobj.path);
          const ext = path.extname(filename).toLowerCase();

          const fd = fs.openSync(filename, "r");
          const buffer = Buffer.alloc(4);
          fs.readSync(fd, buffer, 0, 4, 0);
          
          const data = fs.readFileSync(filename, "utf-8");
          fs.closeSync(fd);

          if (ext && options?.headers[ext]) {
            vobj.setHeaders(options.headers[ext]);
          }

          if (options?.autoEncoding) {
            if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
              vobj.setHeaders({
                "Content-Encoding": "gzip",
                "Content-Type": "application/octet-stream",
              });
            }
          }

          vobj.send(data);
        } catch (err) {
          vobj.next();
        }
      },
    });
  },
);

module.exports = {
  createPlugin,
  serve,
};
