# Reasoning for case 013

## What the system received
Channel: tenant request. Kind: event. Case time: 2025-09-10T10:10:00.000Z. Source files: index.md, history.md, attachments/glazing-invoice.pdf.
Deterministic flags: damp_or_mould ("damp").

> # Kitchen glazing maintenance request Source role: Tenant | Status at export: Requires decision | Created: 2025-07-31 08:02:00 UTC | Property: 8 Brackenmere Walk, Vellumbrook, ZZ1 1ZZ ## Initial request The kitchen glazing has been misted between the panes for some time. Water gathers around the frame, the kitchen feels very cold, and I am concerned about damp, particularly in winter. The sash opens, closes and locks. There are pets in the home. ## History (24 events, oldest first) ### event 001 — 2025-07-31T08:11:00.000Z — Email — from Elowen Marr (Tenant) to Tamsin Rook (Property Manager, Northbridge Lettings) Reported moisture between the kitchen glazing panes, water gathering around the …

## Triage and routing
Families: maintenance, landlord. Urgency: P2. Router confidence: 0.6. Routine misted kitchen glazing repair with a damp concern raised but no confirmed mould or hazard; the record has a quote discrepancy (£180 total vs £150 plus VAT), a status moved to post-visit with no evidence of a visit, and an invoice with no amount, so a specialist should verify the work was done and reconcile the cost.
Agent: generalist.
Records prefetched from the system of record: messages/M-008-send_message#1, messages/M-008-send_message#2, messages/M-011-send_message#5, messages/M-017-send_message#5, messages/M-017-send_message#6. Not found: property_address=8 Brackenmere Walk, Vellumbrook, ZZ1 1ZZ not found; "8 Brackenmere Walk" matched nothing.

## What it looked up, staged and executed
| step | tool / action | detail |
|---|---|---|
| staged | set_hold#1 | {"reason":"Reason: Waiting for Provider. Comment: Has Clearfirth Glazing sent a revised invoice with the amount (approved £150 + VAT, £180 total) and confirmed … |
| staged | send_message#2 | {"to_party":"contractor","to_ref":"Sella Vane (Clearfirth Glazing)","channel":"email","subject":"8 Brackenmere Walk – kitchen glazing invoice NBL-013-INV-09","b… |
| staged | send_message#3 | {"to_party":"tenant","to_ref":"Elowen Marr","channel":"email","subject":"8 Brackenmere Walk – kitchen glazing","body":"Address: 8 Brackenmere Walk, Vellumbrook,… |
| control | submit_resolution | {"family":"maintenance","urgency":"P2","decision":"Stage: results/invoice check (post-visit documents). The landlord approved the glazing quote at £180 total in… |
| exec:success | set_hold#1 |  |
| exec:success | send_message#2 |  |
| exec:success | send_message#3 |  |

## What it decided and why
Stage: results/invoice check (post-visit documents). The landlord approved the glazing quote at £180 total in event 010, and event 011 restated it as £150 + VAT. Those two figures agree (£150 + 20% VAT = £180), so there is no real discrepancy. Clearfirth Glazing's invoice NBL-013-INV-09 (event 023) describes supplying and fitting 1 pane of glass but shows no amount. The history does not show a visit date, an appointment confirmation or a completion report: the last contractor update (event 021, 2 September) said the glass had not arrived. Event 022 moved the case to post-visit with no evidence of a visit. Under PM-DOC-001 I cannot forward the invoice to the landlord or close the job until the amount and the completion are confirmed. I have emailed the contractor, with the invoice attached, asking for a revised invoice showing net, VAT and total against the approved £150 + VAT, and for the fitting date and anything seen at the window. I have also asked the tenant to confirm the fit and whether the misting, the water at the frame or any damp continues. The case is on hold, Waiting for Provider, until 12/09/2025. Once both answers are in hand and the invoice matches £180, I will send the landlord the completion email with the invoice attached and run the final checks. If the invoice comes in above £180, it goes back to the landlord for approval first. If the tenant reports continuing water or damp, the landlord will be asked whether to investigate it.

## What it escalated
Nothing. The case was within authority and policy.

## What failed
No executed action failed.

## Automated checks
Pass 1: clean

## Final result
on_hold (family maintenance, urgency P2).

Full machine trace: trace.jsonl in this folder (every model step, tool call, guard decision and execution result).
