
const RATE_PER_HOUR = 500;
const GST = 0.18;

const complexity_multiplier = {
    HIGH: 5,
    MEDIUM: 2,
    LOW: 1,
};

// subtotal = duration * rate * multiplier
export function getSubtotal(duration, complexity) {
    const multiplier = complexity_multiplier[complexity];
    return duration * RATE_PER_HOUR * multiplier;
}

// gst amount
export function getGST(subtotal) {
    return subtotal * GST;
}

// total = subtotal + gst
export function getTotal(subtotal) {
    return subtotal + getGST(subtotal);
}
