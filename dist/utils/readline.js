"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rl = void 0;
const promises_1 = __importDefault(require("node:readline/promises"));
const node_process_1 = require("node:process");
exports.rl = promises_1.default.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
