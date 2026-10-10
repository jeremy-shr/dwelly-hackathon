# Reasoning for case 019

## What the system received
Channel: agency request. Kind: event. Case time: 2025-09-11T06:58:16.000Z. Source files: index.md, history.md, attachments/remedial-works-invoice.pdf.
Deterministic flags: none.

> # Move-out maintenance at 18 Brindle Row Source role: Agency | Status at export: Requires decision | Created: 2025-09-04 13:25:42 UTC | Property: 18 Brindle Row, Larkspur Vale, ZZ1 1ZZ ## Initial request Move-out inspection identified six maintenance items: a cracked section of chipboard flooring beside the fireplace; a living-room front-window blind needing repair; a loose under-stairs cupboard handle; a kitchen blind that does not operate correctly; a loose bathroom toilet seat; and a bottom hinge detached from the front gate's brick pillar. ## History (16 events, oldest first) ### event 001 — 2025-09-04T13:25:54.000Z — Note — from Maya Chen (Property Manager, Northbridge Lettings) to Maya…

## Triage and routing
Families: maintenance, landlord, complaint. Urgency: P2. Router confidence: 0.5. Routine move-out repairs were completed by a contractor without the quote or written authority Northbridge required, with unclear access and scope, an unitemised £174 invoice and apparent variations (new blind, flooring and carpet) needing landlord sign-off, so a generalist should handle the decision on payment and landlord communication.
Agent: generalist.
Records prefetched from the system of record: bookings/B-014-book_contractor#2, messages/M-008-send_message#1, messages/M-008-send_message#2, messages/M-011-send_message#5, messages/M-014-send_message#5, escalations/E-008-escalate#4, escalations/E-011-escalate#3. Not found: property_address=18 Brindle Row, Larkspur Vale, ZZ1 1ZZ not found.

## What it looked up, staged and executed
| step | tool / action | detail |
|---|---|---|
| staged | set_hold#1 | {"reason":"Reason: Waiting for Provider. Comment: Has Alder & Finch sent the itemised breakdown, VAT status, photos, visit date and access details, and returned… |
| staged | escalate#2 | {"tier":"P1","decision_required":"Decide how to handle Alder & Finch Repairs' unauthorised work and the £174 invoice (NBL-019-INV-11). Do not pay until the item… |
| staged | send_message#3 | {"to_party":"contractor","to_ref":"Rowan Pike, Alder & Finch Repairs","channel":"email","subject":"18 Brindle Row, Larkspur Vale – invoice NBL-019-INV-11","body… |
| staged | send_message#4 | {"to_party":"landlord","to_ref":"Ivo Marlow","channel":"email","subject":"18 Brindle Row – move-out remedial works","body":"Address: 18 Brindle Row, Larkspur Va… |
| control | submit_resolution | {"family":"maintenance","urgency":"P2","decision":"Stage: results and invoice received, invoice does not match a quote. The contractor did the work without the … |
| exec:success | set_hold#1 |  |
| exec:success | escalate#2 |  |
| exec:success | send_message#3 |  |
| exec:success | send_message#4 |  |

## What it decided and why
Stage: results and invoice received, invoice does not match a quote. The contractor did the work without the quote that events 007 and 008 asked for. Rules: PM-DOC-001 and PM-AUTH-002 (no costed scope was approved), PM-CLOSE-001 and PM-DATA-003. Evidence: events 005, 007, 008, 013, 014, 015 and 016. The landlord's general yes in event 005 covers the remedial works in principle. But the invoice is one line of £174 with no breakdown. It includes variations (a replaced floorboard and reinstated carpet, a new Venetian blind) and there is no visit date, access record or completion evidence. So it cannot be passed for payment or closed. I have emailed Alder & Finch for an itemised breakdown, VAT status, photos, visit date, how they got access and any keys. I have emailed the landlord with the invoice attached, set out the facts and variations, and said nothing will be paid before he reviews it. The hold is Waiting for Provider, chase on 15/09/2025. I have escalated P1 because an unexplained invoice and unauthorised work are a decision for the duty manager. The property is vacant, so the former tenant is not contacted. Next in order: the contractor sends the details (or we chase on 15/09). Then we send the breakdown and photos to the landlord for his decision on payment and hold Waiting for Landlord. On his approval we pay as normal and do final checks, including confirming the keys.

## What it escalated
Tier P1: How to handle the contractor's breach of the quote-only instruction and the £174 invoice; check key control. (Unauthorised work, an invoice that does not match any approved scope, and unclear access to a vacant property.). P1 handover recorded for the duty manager (no page required)

## What failed
No executed action failed.

## Automated checks
Pass 1: clean

## Final result
escalated (family maintenance, urgency P2).

Full machine trace: trace.jsonl in this folder (every model step, tool call, guard decision and execution result).
