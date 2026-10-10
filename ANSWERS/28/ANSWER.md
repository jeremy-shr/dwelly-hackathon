# Case 028

## Next action
hold_waiting_for_landlord → landlord (stage: Landlord's own contractor completed works; awaiting cost breakdown and responsibility allocation; confidence high; rules PM-AUTH-004, PM-WORKFLOW-001, PM-CLOSE-001)

## Rationale
Stage: landlord's own contractor route, works reported complete, tenancy-account follow-up still open. Rules: PM-AUTH-004, PM-WORKFLOW-001, PM-CLOSE-001. Evidence: in event 017 the landlord turned down the £564.48 Pineglass quote and used her own company. Pineglass was stood down in event 020. In event 021 she said the work was done, and the request was marked complete in event 022. The only open item is the agency's own question from event 023, sent at 08:46 UTC today, asking for an itemised cost breakdown and which items she sees as the former tenant's responsibility. That question is only about six hours old, so it would be wrong to chase her today. The problem is that the workflow task was dismissed in event 024, so nothing would remind anyone to follow up. I have recorded her decision, added a note to the job, and put the case on hold: Waiting for Landlord, next check 21/09/2025. If there is no reply by then, chase her by email and SMS. No message goes to the former tenant, because the property is vacant and the deposit allocation is for the landlord and a human to decide on evidence. The case is not closed, because the tenancy-account question is still open.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, record_landlord_decision, update_ticket
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Elowen sent the itemised cost breakdown and said which items she considers the former tenant's responsibility (asked 18/09, event 023)? If not, chase on 21/09.","waiting_for":"landlord","until":"2025-09-21T09:00:00.000Z"}
- record_landlord_decision#2 record_landlord_decision [success] {"landlord_id":"Elowen Quill","decision":"Declined the Pineglass Property Repairs quote of £564.48 (NBL-028-Q1) and arranged her own company to carry out the move-out works (meter cabinet hinges, Bedroom 1 nails and paint touch-up, front door sticker residue). On 18/09/2025 she confirmed the work has been completed. Her contractor is paid by her; no agency invoice is expected.","source":"Landlord …
- update_ticket#3 update_ticket [success] {"ticket_id":"NBL-028","note":"Works completed by the landlord's own contractor (event 021); Pineglass was stood down (event 020). Still open: the landlord has not yet replied to our email of 18/09 asking for an itemised cost breakdown and which items, if any, she considers the former tenant's responsibility (event 023). She was asked this morning, so no chase today. If there is no reply by 21/09,…





## Not done and why
- Chase the landlord today: She was asked at 08:46 UTC today (event 023), so her 3-day reply timer is still running. The chase is set for 21/09.
- Close the case: The cost breakdown and tenant-responsibility question for the tenancy account is still open.
- Contact the former tenant or propose deposit deductions: The property is vacant. Deductions need the landlord's evidenced costs and a human decision; nothing is on file yet.
- Instruct Pineglass Property Repairs: The landlord declined their quote and used her own contractor. Pineglass has been stood down (event 020).

## Escalation
None required.

## Communications
- none

## Messages sent (full text)
- none sent

## Conflicts and missing information
- Conflict: Event 001 says landlord approval was already marked as given for the move-out works. Later, the landlord declined the agency's quote (event 017). → Her explicit later decision wins: she used her own contractor, so the agency route is closed.
- Conflict: Events 022 and 024 treat the request as complete with no further action. Event 023's question to the landlord is still unanswered. → The repair is complete, but the case is held for the landlord's reply on costs and responsibility rather than closed.
- Missing: Itemised costs from the landlord's own contractor
- Missing: The landlord's view on which items, if any, were the former tenant's responsibility
- Missing: Completion evidence (date, photos, invoice): the history does not show any

## Final state
on_hold (family: maintenance, urgency: P2)

## Summary
The landlord's own contractor finished the move-out works (event 021). We are still waiting for her itemised costs and her view on which items, if any, the former tenant should pay for (asked this morning, event 023). The case is on hold Waiting for Landlord until 21/09; chase her then if she has not replied.
