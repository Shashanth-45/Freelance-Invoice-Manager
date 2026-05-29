import { getuser, getclient } from "../data/user.js";
import { getSubtotal, getTaxAndTotal, getAdvancePayment } from "./calculate.js";

const W = 60;

function line() {
    return "+" + "-".repeat(W - 2) + "+";
}

function pad(text) {
    const str = String(text);
    const space = Math.max(0, W - str.length - 4);
    return "| " + str + " ".repeat(space) + " |";
}

function printInvoice(clientIndex, projectIndex) {
    const clients = getclient();
    const freelancer = getuser();
    const client = clients[clientIndex];
    const p = client.projects[projectIndex];

    const subtotal = getSubtotal(p.duration, p.adjusted_rate);
    const { gst, total } = getTaxAndTotal(subtotal);
    const { advance, remaining, percentage } = getAdvancePayment(total, p.complexity);

    console.log("\n" + line());
    console.log(pad("INVOICE"));
    console.log(line());

    // freelancer details
    console.log(pad("FROM (Freelancer):"));
    console.log(pad("  Name      : " + freelancer.name));
    console.log(pad("  Role      : " + freelancer.role));
    console.log(pad("  Email     : " + freelancer.Email));
    console.log(pad("  Experience: " + freelancer.Experince));
    console.log(pad("  Skills    : " + freelancer.skills));
    console.log(line());

    // client details
    console.log(pad("TO (Client):"));
    console.log(pad("  Name   : " + client.name));
    console.log(pad("  Job    : " + client.job));
    console.log(pad("  Email  : " + client.email));
    console.log(pad("  Contact: " + client.contact));
    console.log(pad("  Address: " + client.address));
    console.log(pad("  Pincode: " + client.pincode));
    console.log(line());

    // project tariff
    console.log(pad("PROJECT TARIFF:"));
    console.log(pad("  Project      : " + p.title));
    console.log(pad("  Description  : " + p.description));
    console.log(pad("  Tech Stack   : " + p.tech_stack));
    console.log(pad("  Duration     : " + p.duration + " hrs"));
    console.log(pad("  Complexity   : " + p.complexity));
    console.log(pad("  Status       : " + p.status));
    console.log(pad("  Rate/hr      : Rs." + p.adjusted_rate.toFixed(2)));
    console.log(pad("  Subtotal     : Rs." + subtotal.toFixed(2)));
    console.log(pad("  GST (18%)    : Rs." + gst.toFixed(2)));
    console.log(line());
    console.log(pad("TOTAL : Rs." + total.toFixed(2)));
    console.log(line());

    // advance payment
    console.log(pad("PAYMENT TERMS:"));
    if (percentage === 0) {
        console.log(pad("  Full payment on delivery: Rs." + total.toFixed(2)));
    } else {
        console.log(pad("  Advance (" + percentage + "%) : Rs." + advance.toFixed(2)));
        console.log(pad("  On Delivery    : Rs." + remaining.toFixed(2)));
    }
    console.log(line());
}

// interactive: let user pick client & project, loop until done
export async function generateInvoices(r1) {
    const clients = getclient();

    while (true) {
        // show available clients
        console.log("\n--- Select a Client ---");
        for (let i = 0; i < clients.length; i++) {
            console.log((i + 1) + ". " + clients[i].name);
        }

        const cInput = parseInt(await r1.question("\nEnter client number: "));
        if (cInput < 1 || cInput > clients.length || isNaN(cInput)) {
            console.log("Invalid client number.");
            continue;
        }

        const client = clients[cInput - 1];

        // show available projects for that client
        console.log("\n--- Select a Project for " + client.name + " ---");
        for (let j = 0; j < client.projects.length; j++) {
            console.log((j + 1) + ". " + client.projects[j].title);
        }

        const pInput = parseInt(await r1.question("\nEnter project number: "));
        if (pInput < 1 || pInput > client.projects.length || isNaN(pInput)) {
            console.log("Invalid project number.");
            continue;
        }

        // generate the invoice
        printInvoice(cInput - 1, pInput - 1);

        // ask if they want another
        const again = await r1.question("\nGenerate another invoice? (yes/no): ");
        if (again.trim().toLowerCase() !== "yes") {
            console.log("\nThank you! Goodbye.");
            break;
        }
    }
}
