"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuPrincipal_1 = require("./menu/MenuPrincipal");
const readline_1 = require("./utils/readline");
async function main() {
    await (0, MenuPrincipal_1.menuPrincipal)();
    readline_1.rl.close;
}
main();
