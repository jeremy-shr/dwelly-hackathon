# Reasoning for case 025

## What the system received
Channel: tenant request. Kind: event. Case time: 2025-09-15T11:11:18.000Z. Source files: index.md, history.md, attachments/corrected-plumbing-invoice.pdf.
Deterministic flags: none.

> # Kitchen tap maintenance request Source role: Tenant | Status at export: Requires decision | Created: 2025-08-04 18:10:50 UTC | Property: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ ## Initial request The kitchen mixer tap is constantly dripping and wasting water. The water looks cloudy when I fill a glass. I suspect limescale may be involved and would like to know whether a new tap could be considered. ## History (22 events, oldest first) ### event 001 — 2025-08-04T18:10:50.000Z — Portal — from Nia Calder (Tenant) to Tessa Wren (Property Manager, Northbridge Lettings) Reports a constantly dripping kitchen mixer tap and cloudy-looking water when filling a glass. Says limescale may be involved and …

## Triage and routing
Families: maintenance. Urgency: P2. Router confidence: 0.82. Routine kitchen tap repair now completed with a corrected invoice awaiting operator review; the loose drawer and the cloudy-water report are minor unresolved maintenance items, and the boiler mention is undocumented, so a maintenance specialist can handle it.
Agent: maintenance.
Records prefetched from the system of record: bookings/B-014-book_contractor#2, messages/M-002-send_message#3, messages/M-002-send_message#4, messages/M-002-send_message#5, messages/M-005-send_message#4. Not found: property_address=18 Thistlewick Row, Fenmere, ZZ1 1ZZ not found; "18 Thistlewick Row" matched nothing.

## What it looked up, staged and executed
| step | tool / action | detail |
|---|---|---|
| staged | set_hold#1 | {"reason":"Reason: Waiting for Provider. Comment: Has Bracken & Vale sent the invoice with the amount and confirmed the key is back at the office? If not, chase… |
| staged | propose_action#2 | {"action_type":"internal_check","target":"Property manager (Tessa Wren)","parameters":"Check with the relevant engineer what boiler work, if any, was done at 18… |
| staged | send_message#3 | {"to_party":"contractor","to_ref":"Ivo Fenlock, Bracken & Vale Plumbing","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - corrected invoice N… |
| staged | send_message#4 | {"to_party":"landlord","to_ref":"Orin Bell","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap and kitchen drawer","body":"Address:… |
| staged | send_message#5 | {"to_party":"tenant","to_ref":"Nia Calder","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap","body":"Address: 18 Thistlewick Row,… |
| control | submit_resolution | {"family":"maintenance","urgency":"P2","decision":"Stage: work results in, at final checks. The landlord approved the tap work in event 003, and Bracken & Vale'… |
| staged | send_message#6 | {"to_party":"contractor","to_ref":"Ivo Fenlock, Bracken & Vale Plumbing","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - corrected invoice N… |
| staged | send_message#7 | {"to_party":"landlord","to_ref":"Orin Bell","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap and kitchen drawer","body":"Address:… |
| staged | send_message#8 | {"to_party":"tenant","to_ref":"Nia Calder","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap","body":"Address: 18 Thistlewick Row,… |
| control | submit_resolution | {"family":"maintenance","urgency":"P2","decision":"Stage: waiting for work results. The landlord approved the tap work in event 003. A contractor visit was arra… |
| exec:success | set_hold#1 |  |
| exec:success | propose_action#2 |  |
| exec:success | send_message#6 |  |
| exec:success | send_message#7 |  |
| exec:success | send_message#8 |  |
| exec:success | escalate#auto |  |

## What it decided and why
Stage: waiting for work results. The landlord approved the tap work in event 003. A contractor visit was arranged for 10 September (events 015 to 018), but the history does not show the date they attended or any work results. Bracken & Vale's corrected invoice NBL-025-INV-15 (event 022) describes a new mono kitchen sink tap supplied and installed, with the postcode corrected, but it gives no amount. The case is not ready to close. So I have done these things: (1) emailed Ivo asking for confirmation of the attendance date and that the work is complete, any photos or job sheet, the invoice amount with VAT shown, confirmation that the key is back at the office, and anything he noticed about the cloudy water; (2) emailed the landlord to say the invoice has arrived and we are confirming completion and the charge, and asked how he wants the loose drawer from event 012 handled (our contractor or his own); (3) emailed the tenant asking whether the tap has been fitted and fixed and whether the water is still cloudy, and telling her the drawer report is with the landlord; (4) the case is on hold, Waiting for Provider, with a chase on Wednesday 17 September 2025. Next: once the contractor confirms completion and sends the amount, email the landlord with the invoice attached, run final checks including the key return, and close. The drawer follows the landlord's answer. Rules: PM-DOC-001, PM-KEY-001, PM-CLOSE-001, PM-AUTH-001.

## What it escalated
Tier P1: Review the proposed actions and the check failures; decide what to execute. (Automated checks failed: [PM-DOC-001] the text says the work is done ("Can you confirm the date you attended, that the work is complete and the tap is no longer dripping, ") but the case holds no work results or completion evidence. Default: message_provider..). P1 handover recorded for the duty manager (no page required)

## What failed
No executed action failed.
Blocked before execution: send_message (withdrawn: superseded by a later action); send_message (withdrawn: superseded by a later action); send_message (withdrawn: superseded by a later action)

## Automated checks
Pass 1: 
- [PM-DOC-001] the text says the work is done ("The kitchen tap has been replaced and the corrected invoice has the right postcode, but it shows no ") but the case holds no work results or completion evidence. Default: message_provider.
Pass 2: 
- [PM-DOC-001] the text says the work is done ("Can you confirm the date you attended, that the work is complete and the tap is no longer dripping, ") but the case holds no work results or completion evidence. Default: message_provider.

## Final result
escalated (family maintenance, urgency P2).

Full machine trace: trace.jsonl in this folder (every model step, tool call, guard decision and execution result).
