# Case 010

## Next action
request_quote → provider (stage: Quote with the landlord; second estimate outstanding; confidence medium; rules PM-AUTH-002, PM-AUTH-001, PM-AUTH-003, PM-WORKFLOW-001, PM-PRIV-001)

## Rationale
Stage: the quote is with the landlord (PM-AUTH-002). Evidence: events 016, 018, 024, 025 and 026. The full-kitchen figures went to the landlord at event 025. There is no approval for replacement work, so nothing is instructed beyond the original laminate-repair approval (event 006, PM-AUTH-001/003). The landlord asked for two estimates (event 016), but event 018 asked Alderline only for the full-kitchen price. I have therefore asked Alderline for the cupboards-and-doors-only estimate. I have also asked them to book the site visit with the tenant to measure, and to make the sharp laminate edges safe under the event 006 repair scope, with no replacement work. The tenant has had no update since event 010 and her dates have passed, so I have emailed her with the status, asked for new times and details about securing the dogs, and given her a care warning. The commission basis, any cap and the VAT treatment were left unsettled at events 022–023. That changes the total the landlord would approve and is an agency fee decision, so I have escalated it to a human at P1. The case is on hold, waiting for the landlord, with a chase on Monday 29 September 2025. I set P1 rather than P2 because the sharp edges have already caused cuts and the job has run three weeks with no visit.

## Execution status (generated from execution results, not from the agent's text)
- Executed: request_quote, set_hold, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- request_quote#1 request_quote [success] {"contractor_ref":"Alderline Joinery (Kellan Rook)","property":"42 Brackenveil Row, Oakhollow, ZZ1 1ZZ","scope":"Job: kitchen cabinets at 42 Brackenveil Row, Oakhollow, ZZ1 1ZZ. Thank you for the full-kitchen figures. The landlord also asked for a second estimate (event 016), which we have not yet asked you for: replacement of the cupboards and doors only, keeping the existing appliances, worktops…
- set_hold#3 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Soren replied on the full-kitchen figures sent 24/09? If not, chase on 29/09. Also check that Alderline has sent the cupboards-and-doors-only estimate and booked the measuring visit with the tenant (dogs to be secured).","waiting_for":"landlord","until":"2025-09-29"}
- send_message#4 send_message [success] {"to_party":"tenant","to_ref":"Elowen Marr","channel":"email","subject":"Kitchen cabinets – 42 Brackenveil Row","body":"Address: 42 Brackenveil Row, Oakhollow, ZZ1 1ZZ\n\nHello Elowen,\n\nI'm sorry it has taken a while to update you about the kitchen cabinets. The contractor has advised that the laminate cannot simply be repaired, so we have sent your landlord pricing for replacement and are waiti…

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"Confirm the commission basis for the Alderline Joinery kitchen quote (old or revised 15% arrangement), whether a cap applies to a job this size, and how VAT applies. Then confirm to the landlord the total he would pay before he is asked to approve.","summary":"42 Brackenveil Row: the landlord has the full-kitchen figures (event 025): supply £4,850, fit including s…




## Not done and why
- Instruct the kitchen or cupboard replacement: No landlord approval for either replacement option. Event 006 covers only the laminate repair.
- Chase the landlord again: The quote went to him at 14:36 today (event 025). The 3-day timer is running and the chase is set for 29/09.
- Give the landlord a total payable: The commission basis, cap and VAT treatment are not settled. Passed to a human.

## Escalation
Tier P1. Decision required from a human: Settle the commission basis, any cap and the VAT treatment so the landlord can be given the total payable. Reason: Agency fee matter left unsettled at events 022–023. It changes the amount the landlord would approve. Deadline: 2025-09-26.

Handover: The quote is with the landlord (event 025). Second estimate and site visit requested from Alderline. Hold with a landlord chase on 29/09.

## Communications
- contractor (Alderline Joinery) via email: Asked for a cupboards-and-doors-only estimate, priced line by line with VAT. Asked them to book a measuring visit with the tenant (dogs to be secured) and to make sharp edges safe under the original repair scope. No replacement work is approved.
- tenant (Elowen Marr) via email: Update: pricing is with the landlord and a second option has been requested. Asked for new visit times and dog arrangements, and to take care around the edges.

## Messages sent (full text)
### To tenant (Elowen Marr) via email — Kitchen cabinets – 42 Brackenveil Row
Address: 42 Brackenveil Row, Oakhollow, ZZ1 1ZZ

Hello Elowen,

I'm sorry it has taken a while to update you about the kitchen cabinets. The contractor has advised that the laminate cannot simply be repaired, so we have sent your landlord pricing for replacement and are waiting for his decision. We have also asked the contractor for a second option, and he will need to visit to measure up and look at the sharp edges.

The dates you offered have now passed. Could you please send us some new days and times that suit you, and let us know anything we need to know about securing the dogs? We will pass these on to the contractor so he can arrange a time with you in advance.

Until then, please take care around the peeling edges. If any panel comes loose or anyone is hurt, please let us know straight away.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 016: the landlord wanted two estimates. Event 018 asked the contractor only for the full-kitchen quote, and event 024 contains only that. → I have now asked Alderline for the cupboards-and-doors-only estimate.
- Conflict: Event 023: told to 'use the previous commission arrangement', but no calculation, cap or total was agreed. → Escalated to a human at P1. Figures stay plus VAT, with no total stated to the landlord.
- Conflict: The case-state extractor reads event 016 as an 'approval'. → Event 016 is a request for estimates, not approval of the work. Treated as no approval for replacement.
- Missing: Cupboards-and-doors-only estimate
- Missing: Confirmed electrical cost (£380 is an estimate)
- Missing: Commission basis, cap and VAT treatment, and the resulting total payable
- Missing: New tenant availability and dog-access arrangements
- Missing: Landlord decision on the replacement options

## Final state
awaiting_approval (family: maintenance, urgency: P1)

## Summary
The landlord has the full-kitchen figures (£9,260 plus VAT before commission) and his decision is awaited. I have asked Alderline for the missing cupboards-and-doors estimate and a visit to measure and make the edges safe, and asked the tenant for new times. Please settle the 15% commission basis, any cap and the VAT so the landlord gets a final total.
