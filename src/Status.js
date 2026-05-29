
const complexity = {
    HIGH: 5,
    LOW: 1,
    MEDIUM: 2,
}

export async function Validate_complex(r1) {
    while (true) {
        console.log("Enter the project complexity (high, low or medium) : ");
        let input = await r1.question("");
        input = input.trim().toUpperCase();
        if (input in complexity) {
            return input;
        }
        else {
            console.log("Invalid input ......\n");
            console.log("Enter high, low or medium only\n");
            continue;
        }
    }
}

export async function Validate_status(r1, usercomplexity) {
    if (usercomplexity == 'LOW') {
        let m = "DONE";
        return m;
    }
    else {
        while (true) {
            console.log("enter the status of the project : \n");
            let input = await r1.question("");
            input = input.trim().toUpperCase();
            if (input == 'IN PROGRESS' || input == 'TO-DO') {
                let status = input;
                return status;
            }
            else {
                console.log("Enter IN PROGRESS or TO-DO only\n");
                continue;
            }
        }
    }

}




