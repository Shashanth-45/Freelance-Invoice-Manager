
import readline from 'readline/promises'
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// POV(Freelancer) of user
export const user = {
    name: "C G Shashanth",
    role: "Freelancer",
    Email: "CGS@wms.test",
    Experince: "8 years",
    skills: "JAVA Script, JAVA, Python",
    hourly_charge: 500,
}
export function getuser() { return user }

//Deatils of client
let client_d =[];

export async function getclients() {
     client_d = []; // resets to list
    for (let i = 0; i <= 2; i++) {
        const client = {};
        client.name = await r1.question("Enter your name : ");
        client.job = await r1.question("What work do you do?");
        client.email = await r1.question("Enter your E-mail ID : ");
        client.contact = await r1.question("Enter your contact details.");
        client.address = await r1.question("Enter your full address : ");
        client.pincode = await r1.question("Enter your pin code : ");
        client_d.push(client);
    }
}
export function getclient() { return client_d }



