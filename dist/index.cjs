/*!
 * vite-plugin-xq-multi-input v1.0.7 (http://xqkeji.cn/)
 * Author xqkeji.cn
 * LICENSE SSPL-1.0
 * Copyright 2022 xqkeji.cn
 */
 'use strict';

const path = require('path');
const fs = require('fs');

function xqMultiInput() {
  let autoInputs = {};
  return {
    name: "xq-multi-input",
    config(config, { command }) {
      let root = path.join(process.cwd(), config.root);
      if (command === "build") {
        const inputs = config.build.rollupOptions.input;
        for (var key in inputs) {
          const inputFile = inputs[key];
          if (inputFile.startsWith(root)) {
            if (fs.existsSync(inputFile)) {
              const inputFilename = path.basename(inputFile);
              autoInputs[key] = inputFile;
              const inputPath = path.dirname(inputFile);
              const files = fs.readdirSync(inputPath);
              for (let i = 0; i < files.length; i++) {
                const filename = files[i];
                const filePath = path.join(inputPath, filename);
                if (fs.existsSync(inputFile)) {
                  const ext = path.extname(filename);
                  if (ext == ".html" && inputFilename != filename) {
                    const autoKey = key + "_" + path.basename(filename, ext);
                    autoInputs[autoKey] = filePath;
                  }
                }
              }
            }
          }
        }
        config.build.rollupOptions.input = autoInputs;
      }
    }
  };
}

module.exports = xqMultiInput;
