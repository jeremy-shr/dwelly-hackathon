# Case 024

## Next action
escalate_human_review → human (stage: Quote with landlord, work reported done without approval; confidence medium; rules PM-AUTH-002, PM-AUTH-001, PM-DOC-001, PM-CLOSE-001)

## Rationale
Stage: a quote with the landlord, but work reported done (an agency checkout clean and clear-out at a vacant property). Rules: PM-AUTH-002, PM-AUTH-001, PM-DOC-001, PM-CLOSE-001. Evidence: events 011, 017, 018, 019, 020, 021. Larkspan quoted £180 + VAT (£216 inc VAT) in event 011, for cleaning only. The quote does not include removing the items in the kitchen drawers, garden storage box, kitchen bins and cellar. The workflow put it above the £100 threshold and sent it to the landlord for approval (events 017, 018). She was chased in event 019 and no reply is recorded. Event 020 is an internal note saying the work was done on 23/09, but there is no landlord approval, no completion photos and no invoice. The approval flag in event 002 has no supporting document. Next steps, in order: (1) I have emailed Larkspan to confirm what was done and when, including whether the items were removed, to send the completion photos and any charges beyond the quote, and to do no further work. (2) The case is on hold Waiting for Provider, with a chase on 26/09. (3) A P1 handover asks the duty manager to decide how to put the unapproved work to the landlord and ask for approval after the fact, how the item removal will be priced, and how the cost links to the pending deposit claim. I have not told the landlord the work is complete, I have not approved the quote and I have not closed the case.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Larkspan confirmed what was done on 23/09 (including the item removal, which the quote does not cover) and sent completion photographs? If not, chase on 26/09. The landlord's approval of the £180 + VAT quote is still outstanding (events 018, 019). Duty manager to decide how to approach the landlord.","waiting_for":"contractor","until":"2025-09-…
- send_message#3 send_message [success] {"to_party":"contractor","to_ref":"Perrin Holt, Larkspan Property Care","channel":"email","subject":"7 Brackenmere Walk, Vellumford, ZZ1 1ZZ - end-of-occupancy work","body":"Address: 7 Brackenmere Walk, Vellumford, ZZ1 1ZZ\n\nHi Perrin,\n\nWe have a note on file that the clear-out and property service at the above property took place on Tuesday 23 September 2025. Please can you confirm whether you…

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"The internal note in event 020 says the clear-out and property service at 7 Brackenmere Walk was done on 23/09. However, the landlord (Sella Voss) has not approved Larkspan's £180 + VAT (£216 inc VAT) quote: it was asked for in event 018 and chased in event 019, and no reply is recorded. Decide: (1) who authorised the attendance and on what basis; event 002 shows …




## Not done and why
- Tell the landlord the work is complete or ask her to pay: No completion evidence or invoice on file, and no approval. A human must decide how to put work done without approval to her (PM-AUTH-002, PM-DOC-001).
- Approve the quote or instruct Larkspan: Only the landlord can approve a quote. Event 002's approval flag has no supporting document.
- Close the case: The quote is unanswered, there is no completion evidence or invoice, and the scope question is open (PM-CLOSE-001).
- Third chase to the landlord: Asking her to approve work that has already been done needs a manager's decision on the wording; this is in the escalation.
- Contact the former tenant: The property is vacant and the deposit claim is with the agency; no tenant contact is needed.

## Escalation
Tier P1. Decision required from a human: Who authorised the attendance; how to put it to the landlord for approval after the fact; how to price the item removal; how the cost links to the deposit claim. Reason: Work reported done without the landlord's approval of a quote above the threshold, and the quote does not cover the requested item removal. Deadline: 2025-09-25T17:00:00+01:00.

Handover: Contractor asked for evidence; on hold Waiting for Provider until 26/09

## Communications
- contractor (Perrin Holt, Larkspan Property Care) via email: Asks for confirmation of the attendance date and what was done, including whether the listed items were removed (not in the quote), completion photos and any charges beyond £180 + VAT. Says no further work until they hear from us, as landlord approval is outstanding.

## Messages sent (full text)
### To contractor (Perrin Holt, Larkspan Property Care) via email — 7 Brackenmere Walk, Vellumford, ZZ1 1ZZ - end-of-occupancy work
Address: 7 Brackenmere Walk, Vellumford, ZZ1 1ZZ

Hi Perrin,

We have a note on file that the clear-out and property service at the above property took place on Tuesday 23 September 2025. Please can you confirm whether you attended, and on what date, and tell us exactly what was completed. In particular, please confirm whether the remaining items were removed from the kitchen drawers, the garden storage box, the kitchen bins and the cellar (vacuum, sweeping brush, dustpan, mop and toilet brush), as these were not listed in your quotation NBL-024-Q1 of 9 September.

Please also send the completion photographs you mentioned, and tell us if you intend to charge anything beyond your quoted £180.00 + VAT (£216.00 including VAT). The landlord's approval of the quote is still outstanding on our side, so please do not carry out any further work at the property until you hear from us.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 002 says the move-out record shows landlord approval already obtained, but there is no approval document. Events 018 and 019 then ask the landlord to approve the quote and she has not replied. → I treated it as no approval. The workflow flag is not evidence of approval.
- Conflict: The request (event 001 and the checkout report) includes removing the listed items. Larkspan's quote NBL-024-Q1 covers cleaning only, and no clarification is recorded (events 010, 014). → I have asked Larkspan whether the items were removed and what they will charge. Pricing goes to the duty manager.
- Conflict: Event 020 reports the work done, while the workflow still shows the quote waiting for landlord approval (event 021). → I asked the contractor to confirm and escalated P1 so a human can decide on the authorisation.
- Missing: Landlord's decision on the £180 + VAT quote
- Missing: Contractor's confirmation of the attendance date and what was completed, including item removal
- Missing: Completion photographs
- Missing: Invoice and any extra charge for item removal
- Missing: Deposit claim decision and whether the cost is for the outgoing tenant
- Missing: Who authorised attendance before approval

## Final state
escalated (family: maintenance, urgency: P2)

## Summary
Work is reported done at 7 Brackenmere Walk (event 020), but the landlord never approved the £180 + VAT quote, and that quote does not cover the item removal. I have asked Larkspan to confirm what was done and to send photos, and the case is on hold until 26/09. A P1 handover asks you to decide how to put this to Sella Voss and how it links to the deposit claim.
