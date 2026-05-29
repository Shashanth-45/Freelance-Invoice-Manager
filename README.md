# Freelance-Invoice-Manager

A Node.js CLI tool for freelancers to manage clients, projects, and invoices from the terminal. Built with vanilla JavaScript and zero dependencies.

## Features

- Collect and store freelancer profile details
- Register up to 3 clients with 2 projects each
- Validate project complexity (HIGH / MEDIUM / LOW) and status (IN PROGRESS / TO-DO / DONE)
- Auto-calculate adjusted hourly rate based on complexity multiplier
- Generate formatted invoices with GST (18%) included
- Advance payment terms based on project complexity
- Interactive invoice selection — pick any client and project, generate as many invoices as needed

## Project Structure

```
├── index.js              # Entry point — runs the CLI flow
├── data/
│   └── user.js           # Freelancer profile & client/project data collection
├── src/
│   ├── calculate.js      # Rate calculation, GST, totals, advance payment math
│   ├── Invoice.js        # Invoice formatting & interactive generation loop
│   └── Status.js         # Input validation for complexity and status
```

## How It Works

1. Freelancer details are displayed on launch
2. User enters details for 3 clients (name, job, email, contact, address, pincode)
3. For each client, 2 projects are registered (title, description, tech stack, duration, complexity, status)
4. Adjusted hourly rate is derived at input time: `BASE_RATE (₹500) × complexity multiplier`
5. User selects a client → selects a project → invoice is generated
6. Invoice includes: freelancer info, client info, project tariff, subtotal, GST, total, and payment terms
7. User can generate another invoice or exit

## Rate & Pricing

| Complexity | Multiplier | Rate/hr |
|------------|-----------|---------|
| LOW        | 1×        | ₹500    |
| MEDIUM     | 2×        | ₹1,000  |
| HIGH       | 5×        | ₹2,500  |

- **GST**: 18% on subtotal
- **Advance**: LOW = 0% (pay on delivery), MEDIUM = 50%, HIGH = 70%

## Run

```bash
node index.js
```

## Application Flow

```
index.js
  │
  ├── Display freelancer details (from user.js)
  │
  ├── Collect client data (3 clients × 2 projects each)
  │     │
  │     ├── Validate complexity ──► Status.js (HIGH / MEDIUM / LOW)
  │     ├── Calculate adjusted rate ──► calculate.js (BASE_RATE × multiplier)
  │     └── Validate status ──► Status.js (DONE / IN PROGRESS / TO-DO)
  │
  └── Invoice generation loop (Invoice.js)
        │
        ├── Show client list ──► User picks a client
        ├── Show project list ──► User picks a project
        ├── Calculate subtotal ──► calculate.js (duration × adjusted_rate)
        ├── Calculate GST & total ──► calculate.js (getTaxAndTotal)
        ├── Calculate advance ──► calculate.js (getAdvancePayment)
        ├── Print invoice box
        └── Ask "Generate another?" ──► yes: loop back │ no: exit
```

## Data Flow

```
user.js (input)
  │
  ├── user object ──────────────────────────────► Invoice.js (FROM section)
  │
  └── client_d[] ──────────────────────────────► Invoice.js (TO section)
        │
        └── projects[]
              │
              ├── duration ─────┐
              ├── adjusted_rate ┼──► calculate.js ──► subtotal ──► gst + total
              └── complexity ───┘                                    │
                                                                     ▼
                                                              getAdvancePayment()
                                                                     │
                                                              advance / remaining
```

## Requirements

- Node.js v18+ (uses `readline/promises` and ES modules)
- No external dependencies
