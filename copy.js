"use strict";
exports.__esModule = true;
var shell = require("shelljs");
shell.cp("-R", "src/*.css", "out/");
shell.cp("-R", "src/*.svg", "out/");
