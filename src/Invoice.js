import { getuser, getclient } from "../data/user.js";
import { getSubtotal, getGST, getTotal } from "./calculate.js";

// draws a simple rectangular box line
function line(len) {
    return "+" + "-".repeat(len - 2) + "+";
}

function pad(text, len) {
    const str = String(text);
    return "| " + str + " ".repeat(len - str.length - 4) + " |";
}

function printInvoice(clientIndex) {
    const clients = getclient();
    const freelancer = getuser();

    if (clientIndex < 0 || clientIndex >= clients.length) {
        console.log("Invalid client index.");
        return;
    }

    const client = clients[clientIndex];
    const W = 60; // box width

    console.log("\n" + line(W));
    console.log(pad("INVOICE", W));
    console.log(line(W));

    // freelancer details
    console.log(pad("FROM (Freelancer):", W));
    console.log(pad("  Name      : " + freelancer.name.trim(), W));
    console.log(pad("  Role      : " + freelancer.role.trim(), W));
    console.log(pad("  Email     : " + freelancer.Email.trim(), W));
    console.log(pad("  Experience: " + freelancer.Experince.trim(), W));
    console.log(pad("  Skills    : " + freelancer.skills.trim(), W));
    console.log(line(W));

    // client details
    console.log(pad("TO (Client):", W));
    console.log(pad("  Name   : " + client.name, W));
    console.log(pad("  Job    : " + client.job, W));
    console.log(pad("  Email  : " + client.email, W));
    console.log(pad("  Contact: " + client.contact, W));
    console.log(pad("  Address: " + client.address, W));
    console.log(pad("  Pincode: " + client.pincode, W));
    console.log(line(W));

    // project tariff table
    console.log(pad("PROJECT TARIFF:", W));
    console.log(pad("", W));

    let invoiceTotal = 0;

    for (let i = 0; i < client.projects.length; i++) {
        const p = client.projects[i];
        const subtotal = getSubtotal(p.duration, p.complexity);
        const gst = getGST(subtotal);
        const total = getTotal(subtotal);
        invoiceTotal += total;

        console.log(pad("  Project " + (i + 1) + ": " + p.title, W));
        console.log(pad("    Description : " + p.description, W));
        console.log(pad("    Tech Stack  : " + p.tech_stack, W));
        console.log(pad("    Duration    : " + p.duration + " hrs", W));
        console.log(pad("    Complexity  : " + p.complexity, W));
        console.log(pad("    Status      : " + p.status, W));
        console.log(pad("    Rate/hr     : Rs.500", W));
        console.log(pad("    Subtotal    : Rs." + subtotal.toFixed(2), W));
        console.log(pad("    GST (18%)   : Rs." + gst.toFixed(2), W));
        console.log(pad("    Total       : Rs." + total.toFixed(2), W));
        console.log(pad("", W));
    }

    console.log(line(W));
    console.log(pad("INVOICE TOTAL : Rs." + invoiceTotal.toFixed(2), W));
    console.log(line(W));
}

// switch-case per client (3 clients, index 0-2)
export function generateInvoices() {
    const clients = getclient();

    for (let i = 0; i < clients.length; i++) {
        switch (i) {
            case 0:
                console.log("\n===== INVOICE FOR CLIENT 1 =====");
                printInvoice(0);
                break;
            case 1:
                console.log("\n===== INVOICE FOR CLIENT 2 =====");
                printInvoice(1);
                break;
            case 2:
                console.log("\n===== INVOICE FOR CLIENT 3 =====");
                printInvoice(2);
                break;
            default:
                console.log("Unknown client.");
                break;
        }
    }
}
