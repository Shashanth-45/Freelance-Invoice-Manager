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
    console.log("Name      : " + freelancer.name);
    console.log("Role      : " + freelancer.role);
    console.log("Email     : " + freelancer.Email);
    console.log("Experience: " + freelancer.Experince);
    console.log("Skills    : " + freelancer.skills);

    // collect client & project details
    await getclients(r1);

    // let user pick which invoice to generate
    await generateInvoices(r1);

    r1.close();
}

main();
