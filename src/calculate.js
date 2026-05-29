
const BASE_RATE = 500;
const GST = 0.18;

const complexity_multiplier = {
    HIGH: 5,
    MEDIUM: 2,
    LOW: 1,
};

// returns adjusted hourly rate based on complexity
export function getAdjustedRate(complexity) {
    return BASE_RATE * complexity_multiplier[complexity];
}

// subtotal = duration * adjusted rate
export function getSubtotal(duration, adjustedRate) {
    return duration * adjustedRate;
}

// returns both gst and total in one call
export function getTaxAndTotal(subtotal) {
    const gst = subtotal * GST;
    const total = subtotal + gst;
    return { gst, total };
}

// returns advance payment details based on complexity
export function getAdvancePayment(total, complexity) {
    const percentage = complexity === "LOW" ? 0 : complexity === "MEDIUM" ? 50 : 70;
    const advance = total * (percentage / 100);
    const remaining = total - advance;
    return { advance, remaining, percentage };
}
