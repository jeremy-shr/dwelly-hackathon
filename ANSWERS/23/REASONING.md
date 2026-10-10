# Reasoning for case 023

## What the system received
Channel: tenant request. Kind: event. Case time: 2025-02-12T16:35:00.000Z. Source files: index.md, history.md, attachments/invoice-NBL-CFM-250210-A.pdf, attachments/invoice-NBL-CFM-250210-B.pdf.
Deterministic flags: none.

> # Heating maintenance at 7 Larkspur Fold Source role: Tenant | Status at export: Requires decision | Created: 2025-02-03 08:14:00 UTC | Property: 7 Larkspur Fold, Orvane Heath, ZZ1 1ZZ ## Initial request The radiators have stopped heating intermittently. Hot water is still available. Please arrange an inspection. ## History (23 events, oldest first) ### event 001 — 2025-02-03T08:14:00.000Z — Portal — from Tessa Vane (Tenant) to Ivo Merrick (Property Manager, Northbridge Lettings) Reported that radiator heating had cut out twice since the previous evening while hot water remained available. A child lives at the property. Asked for an inspection. ### event 002 — 2025-02-03T08:41:00.000Z — Upda…

## Triage and routing
Families: maintenance, landlord, complaint. Urgency: P1. Router confidence: 0.55. Intermittent heating with a child in the home (portable heater on a wall socket) is an ongoing repair, while the main blocker is a landlord decision on unauthorised, overlapping contractor invoices (£138 and £372) with no completion evidence, so a generalist should coordinate; the dispute is not yet a formal complaint.
Agent: generalist.
Records prefetched from the system of record: none. Not found: property_address=7 Larkspur Fold, Orvane Heath, ZZ1 1ZZ not found; "ZZ1 1ZZ" matched nothing.

## What it looked up, staged and executed
| step | tool / action | detail |
|---|---|---|
| staged | set_hold#1 | {"reason":"Reason: Waiting for Landlord. Comment: Has Soren replied to the event 023 email on the two Copper Finch invoice records (£138 A, £372 B) and whether … |
| staged | escalate#2 | {"tier":"P1","decision_required":"1) Decide how to deal with Copper Finch Mechanical invoice NBL-CFM-250210-B (£372 inc VAT). It describes actuator replacement … |
| staged | send_message#3 | {"to_party":"tenant","to_ref":"Tessa Vane","channel":"portal","subject":"Heating at 7 Larkspur Fold","body":"Address: 7 Larkspur Fold, Orvane Heath, ZZ1 1ZZ\n\n… |
| control | submit_resolution | {"family":"maintenance","urgency":"P1","decision":"Stage: the landlord has the quote and the invoice dispute (events 009, 010, 012 and 023). The landlord author… |
| exec:success | set_hold#1 |  |
| exec:success | escalate#2 |  |
| exec:success | send_message#3 |  |

## What it decided and why
Stage: the landlord has the quote and the invoice dispute (events 009, 010, 012 and 023). The landlord authorised diagnosis only, up to £180 including VAT (event 005). Copper Finch's estimate of £372 for the actuator was sent to him (event 010). He asked questions but did not authorise it (event 012). The contractor then sent two invoices dated 10 February that overlap (events 017 and 018). Invoice B (£372) says the actuator replacement was done on 5 February. Nothing on file backs that up: there is no authorisation, no completion record (events 019 and 022), and the tenant has not seen anyone since 5 February (event 020). Ivo emailed the landlord for a decision at event 023, so I have not sent him a second email. Petra replied today (event 022), so she is not chased today. Neither invoice is to be paid and no further work is authorised (PM-AUTH-001, PM-AUTH-002, PM-DOC-001). Invoice A (£138) matches the event 007 quote and is within the landlord's limit. Invoice B does not match anything on file and has no explanation, so I have escalated it P1. The heating is still intermittent with a child at home in February, so a human needs to get the landlord's repair decision quickly rather than leave it on the 3-day timer. I have updated the tenant, who wrote on Monday 10 February, and given her the gas emergency line. The case is on hold waiting for the landlord until 14/02, and the contractor is chased the same day if she has not answered.

## What it escalated
Tier P1: How to deal with invoice B (£372), and getting the landlord's decision on the actuator repair promptly (An invoice that does not match anything on file, with no explanation, for work that was not authorised. The heating repair has stalled at a home with a child in winter.). P1 handover recorded for the duty manager (no page required)

## What failed
No executed action failed.

## Automated checks
Pass 1: clean

## Final result
escalated (family maintenance, urgency P1).

Full machine trace: trace.jsonl in this folder (every model step, tool call, guard decision and execution result).
