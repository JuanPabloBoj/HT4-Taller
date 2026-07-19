import { menuPrincipal } from "./menu/MenuPrincipal";
import { rl } from "./utils/readline";

async function main() {
    await menuPrincipal();

    rl.close;
}

main();