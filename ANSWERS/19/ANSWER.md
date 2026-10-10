# Case 019

## Next action
hold_waiting_for_provider → provider (stage: Invoice received, awaiting itemisation and completion evidence; confidence medium; rules PM-DOC-001, PM-AUTH-002, PM-CLOSE-001, PM-DATA-003, PM-OCC-001, PM-PRIV-001)

## Rationale
Stage: results and invoice received, invoice does not match a quote. The contractor did the work without the quote that events 007 and 008 asked for. Rules: PM-DOC-001 and PM-AUTH-002 (no costed scope was approved), PM-CLOSE-001 and PM-DATA-003. Evidence: events 005, 007, 008, 013, 014, 015 and 016. The landlord's general yes in event 005 covers the remedial works in principle. But the invoice is one line of £174 with no breakdown. It includes variations (a replaced floorboard and reinstated carpet, a new Venetian blind) and there is no visit date, access record or completion evidence. So it cannot be passed for payment or closed. I have emailed Alder & Finch for an itemised breakdown, VAT status, photos, visit date, how they got access and any keys. I have emailed the landlord with the invoice attached, set out the facts and variations, and said nothing will be paid before he reviews it. The hold is Waiting for Provider, chase on 15/09/2025. I have escalated P1 because an unexplained invoice and unauthorised work are a decision for the duty manager. The property is vacant, so the former tenant is not contacted. Next in order: the contractor sends the details (or we chase on 15/09). Then we send the breakdown and photos to the landlord for his decision on payment and hold Waiting for Landlord. On his approval we pay as normal and do final checks, including confirming the keys.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Alder & Finch sent the itemised breakdown, VAT status, photos, visit date and access details, and returned any keys? If not, chase on 15/09/2025. Then send to landlord for decision on payment.","waiting_for":"contractor","until":"2025-09-15"}
- send_message#3 send_message [success] {"to_party":"contractor","to_ref":"Rowan Pike, Alder & Finch Repairs","channel":"email","subject":"18 Brindle Row, Larkspur Vale – invoice NBL-019-INV-11","body":"Address: 18 Brindle Row, Larkspur Vale, ZZ1 1ZZ\n\nHi Rowan,\n\nThank you for your invoice NBL-019-INV-11 for £174.00. We asked for a quotation only on this job, so before we can put it to the landlord we need some more detail from you.\…
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Ivo Marlow","channel":"email","subject":"18 Brindle Row – move-out remedial works","body":"Address: 18 Brindle Row, Larkspur Vale, ZZ1 1ZZ\n\nHi Ivo,\n\nJust to update you on the move-out remedial works. Alder & Finch Repairs were asked to quote for the six items first. Instead they carried out the work and have sent an invoice for £174.00, which is attached.\n\nTh…

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"Decide how to handle Alder & Finch Repairs' unauthorised work and the £174 invoice (NBL-019-INV-11). Do not pay until the itemisation and evidence are in and the landlord has decided. Also check how the contractor got into a vacant property when the agency holds the keys.","summary":"18 Brindle Row has been vacant since 27/08 (event 003). The landlord approved rem…




## Not done and why
- Pass the £174 invoice for payment or close the case: The invoice is not itemised, has variations, and there is no completion evidence or access record; the landlord has not seen the costs.
- Ask the landlord to approve payment now: The breakdown and photos are not on file yet; he will be asked once they arrive.
- Contact the former tenant: He vacated and returned the keys on 27/08 (event 003); the property is not tenanted.
- Instruct another contractor: The work is reported complete; a second provider is not needed.

## Escalation
Tier P1. Decision required from a human: How to handle the contractor's breach of the quote-only instruction and the £174 invoice; check key control. Reason: Unauthorised work, an invoice that does not match any approved scope, and unclear access to a vacant property. Deadline: 2025-09-12T17:00:00+01:00.

Handover: Contractor and landlord emailed; hold Waiting for Provider until 15/09.

## Communications
- Contractor (Rowan Pike, Alder & Finch Repairs) via email: Ask for an itemised breakdown, VAT, the reasons for the variations, photos, visit date, how they got access, and the return of any keys; no payment until reviewed.
- Landlord (Ivo Marlow) via email: The work was done before a quote; the £174 invoice is attached, with the variations explained; we are getting a breakdown and photos and will send them for his decision before anything is paid.

## Messages sent (full text)
### To contractor (Rowan Pike, Alder & Finch Repairs) via email — 18 Brindle Row, Larkspur Vale – invoice NBL-019-INV-11
Address: 18 Brindle Row, Larkspur Vale, ZZ1 1ZZ

Hi Rowan,

Thank you for your invoice NBL-019-INV-11 for £174.00. We asked for a quotation only on this job, so before we can put it to the landlord we need some more detail from you.

Please could you send us a breakdown of the £174.00 by item, showing labour and materials for each of the six items and whether VAT applies. For the lounge, please explain why the floorboard was replaced and the carpet reinstated, and why a new Venetian blind was supplied rather than the existing blind repaired, with the cost of the new blind. Please also send before and after photos of each item.

Please also tell us the date and time you attended, how you got into the property and who gave you access, and whether you still hold any keys. If you do, please drop them back to our office.

Payment cannot be processed until we have this information and the landlord has reviewed it.

Kind regards
Northbridge Lettings

### To landlord (Ivo Marlow) via email — 18 Brindle Row – move-out remedial works
Address: 18 Brindle Row, Larkspur Vale, ZZ1 1ZZ

Hi Ivo,

Just to update you on the move-out remedial works. Alder & Finch Repairs were asked to quote for the six items first. Instead they carried out the work and have sent an invoice for £174.00, which is attached.

The invoice says they replaced the broken lounge floorboard and reinstated the carpet, removed the front lounge blind and fitted a new Venetian blind, refixed the cupboard handle, adjusted the kitchen blind, retightened the toilet seat and reattached the front-gate hinge. Replacing the floorboard and supplying a new blind go further than the repairs we described. The invoice gives one total and is not broken down by item.

We have asked the contractor for a breakdown by item, VAT details, photos of the work and the date they attended. We will send these to you before anything is paid, so you can decide.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 008 said quote only, no work without written authority. Event 013: the contractor says he thought he was instructed to do the work, and did it on 09/09. → Treated as unauthorised performance. The invoice is held pending itemisation and the landlord's decision, and escalated P1.
- Conflict: The case state says tenanted, but event 003 says the tenant left on 27/08. Events 008 and 010 still referred to arranging access with the tenant and shared his number. → Treated as vacant; no tenant messages. Sharing the number is noted in the escalation.
- Conflict: The agency held the keys (event 007), but the history does not show how the contractor got access. → Asked the contractor; escalated so a human can check key control.
- Conflict: The event 012 note mentions awaiting an invoice before any invoice existed. → Note error; disregarded.
- Missing: Itemised prices and VAT status for the £174
- Missing: Visit date/time and how access was obtained
- Missing: Before/after photos or other completion evidence
- Missing: Why the floorboard was replaced and a new blind supplied rather than repaired
- Missing: Whether the contractor holds any keys

## Final state
escalated (family: maintenance, urgency: P2)

## Summary
Alder & Finch did all six move-out items without the quote we asked for and invoiced £174 as one line. That includes a new Venetian blind and a replaced floorboard, and we don't know how they got in. I have asked them for a breakdown, photos, visit date and access details, sent the invoice to the landlord without asking him to pay, put the case on hold until 15/09 and escalated P1 for the payment and contractor-conduct decision.
