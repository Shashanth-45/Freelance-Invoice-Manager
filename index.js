import readline from 'readline/promises';
import { getuser, getclients } from "./data/user.js";
import { generateInvoices } from "./src/Invoice.js";

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    // show freelancer info
    const freelancer = getuser();
    console.log("\n--- Freelancer Details ---");
    console.log(freelancer);

    // collect client & project details
    await getclients(r1);

    // generate invoices for all 3 clients
    generateInvoices();

    r1.close();
}

main();
