import { getclient } from '../data/user.js';

const complexity = {
    HIGH: 5,
    LOW: 1,
    MEDIUM: 2,
}

export async function Validate_complex(r1) {
    while (true){
        console.log("Enter the project coplexity (high, low or medium) : ");
        let input = await r1.question("");
        input = input.trim().toUpperCase();
        if (input in complexity ){
            return input;
        }
        else {
            console.log("Invalid input ......\n");
            console.log("Enter high, low or medium only\n");
            continue;
        }
    }
}






