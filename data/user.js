import { Validate_complex, Validate_status } from "../src/Status.js";
import { getAdjustedRate } from "../src/calculate.js";

// POV(Freelancer) of user
export const user = {
    name: 'C G Shashanth',
    role: 'Freelancer',
    Email: 'CGS@wms.test',
    Experince: '5 years',
    skills: 'JAVA Script, JAVA, Python',
}
export function getuser() { return user }

let client_d = [];

export async function getclients(r1) {
    client_d = [];                            // resets to list
    for (let i = 1; i <= 3; i++) {
        console.log(`\n--- Enter Details for Client ${i} ---`);
        const client = {};
        client.name = await r1.question("Enter your name : \n");
        client.job = await r1.question("What work do you do? \n");
        client.email = await r1.question("Enter your E-mail ID : \n");
        client.contact = await r1.question("Enter your contact number : \n");
        client.address = await r1.question("Enter your full address : \n");
        client.pincode = await r1.question("Enter your pin code : \n");
        
        client.projects = [];
        console.log(`--- Enter Projects for Client: ${client.name} ---\n`);

        for (let j = 1; j <= 2; j++) {              //takes project details per client
            console.log(` ---------Project ${j}: ---------- \n`);
            const project = {};
            project.title = await r1.question("what is the title of the project? \n");
            project.description = await r1.question("what is the description of the project? \n");
            project.tech_stack = await r1.question("In what language do you want it done? \n");
            project.duration = parseFloat(await r1.question("Enter the time required (hours) : \n"));
            project.complexity = await Validate_complex(r1);
            project.adjusted_rate = getAdjustedRate(project.complexity);
            project.status = await Validate_status(r1, project.complexity);
            client.projects.push(project);
        }
        
        client_d.push(client);
    }
}

export function getclient() { return client_d }
