# Case 023

## Next action
escalate_human_review → human (stage: Quote and invoice dispute with the landlord; waiting for the landlord; confidence medium; rules PM-AUTH-001, PM-AUTH-002, PM-DOC-001, PM-CLOSE-001, PM-WORKFLOW-001)

## Rationale
Stage: the landlord has the quote and the invoice dispute (events 009, 010, 012 and 023). The landlord authorised diagnosis only, up to £180 including VAT (event 005). Copper Finch's estimate of £372 for the actuator was sent to him (event 010). He asked questions but did not authorise it (event 012). The contractor then sent two invoices dated 10 February that overlap (events 017 and 018). Invoice B (£372) says the actuator replacement was done on 5 February. Nothing on file backs that up: there is no authorisation, no completion record (events 019 and 022), and the tenant has not seen anyone since 5 February (event 020). Ivo emailed the landlord for a decision at event 023, so I have not sent him a second email. Petra replied today (event 022), so she is not chased today. Neither invoice is to be paid and no further work is authorised (PM-AUTH-001, PM-AUTH-002, PM-DOC-001). Invoice A (£138) matches the event 007 quote and is within the landlord's limit. Invoice B does not match anything on file and has no explanation, so I have escalated it P1. The heating is still intermittent with a child at home in February, so a human needs to get the landlord's repair decision quickly rather than leave it on the 3-day timer. I have updated the tenant, who wrote on Monday 10 February, and given her the gas emergency line. The case is on hold waiting for the landlord until 14/02, and the contractor is chased the same day if she has not answered.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Soren replied to the event 023 email on the two Copper Finch invoice records (£138 A, £372 B) and whether the actuator replacement (£372 estimate, event 009) is authorised? If not, chase by phone/SMS on 14/02 because the heating is intermittent with a child at home. Neither invoice is to be paid. Separately, Petra (Copper Finch) said on 12/02 s…
- send_message#3 send_message [success] {"to_party":"tenant","to_ref":"Tessa Vane","channel":"portal","subject":"Heating at 7 Larkspur Fold","body":"Address: 7 Larkspur Fold, Orvane Heath, ZZ1 1ZZ\n\nHi Tessa,\nThank you for your update on Monday 10 February about the heating and the cooler radiator. We have gone back to your landlord about the repair the engineer recommended after the visit on Wednesday 5 February, and we will be in to…

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"1) Decide how to deal with Copper Finch Mechanical invoice NBL-CFM-250210-B (£372 inc VAT). It describes actuator replacement as done on 5 February, but the landlord only authorised diagnosis up to £180 (event 005), the £372 estimate asking for authorisation was sent after that service date (event 009), and there is no completion evidence (events 019, 020, 022). N…




## Not done and why
- Pay or pass either Copper Finch invoice to the landlord for payment: Invoice B's work was not authorised and has no completion evidence. Whether A and B overlap is unresolved (events 019, 022).
- Instruct the actuator replacement: The landlord has not approved the £372 estimate (event 012). PM-AUTH-002.
- Send the landlord a second email: The event 023 email went to him at the case time.
- Chase Petra today: She replied today (event 022). She will be chased on 14/02 if there is still no answer.
- Mention the invoices to the tenant: The invoice question is between the agency, the contractor and the landlord, and the tenant does not need it.

## Escalation
Tier P1. Decision required from a human: How to deal with invoice B (£372), and getting the landlord's decision on the actuator repair promptly. Reason: An invoice that does not match anything on file, with no explanation, for work that was not authorised. The heating repair has stalled at a home with a child in winter. Deadline: 2025-02-13T17:00:00Z.

Handover: Neither invoice is to be paid. The landlord was emailed at event 023. The case is on hold waiting for the landlord until 14/02.

## Communications
- tenant via portal: Thanks for her update. The landlord has been asked about the recommended repair and we will be in touch about a return visit. Report any change straight away, and call 0800 111 999 if she smells gas.

## Messages sent (full text)
### To tenant (Tessa Vane) via portal — Heating at 7 Larkspur Fold
Address: 7 Larkspur Fold, Orvane Heath, ZZ1 1ZZ

Hi Tessa,
Thank you for your update on Monday 10 February about the heating and the cooler radiator. We have gone back to your landlord about the repair the engineer recommended after the visit on Wednesday 5 February, and we will be in touch as soon as we have his decision so a return visit can be arranged.
If the heating stops working completely, or you notice a leak, a warning on the boiler or anything else changes, please let us know straight away. If you ever smell gas, please call the National Gas Emergency line on 0800 111 999 first.
Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Invoice B gives 5 February as the date of the actuator replacement. The estimate asking for authorisation was sent after the visit that day (event 009). On 7 February the contractor was still checking parts (event 016). The tenant has seen no contractor since 5 February (event 020). → The replacement is treated as not shown to have happened. Invoice B is not accepted and is escalated.
- Conflict: Invoice A (£138) and invoice B (£372) both list attendance and diagnosis for the same date. → Treated as overlapping until the contractor confirms whether B replaces A. Neither is paid.
- Missing: Whether the actuator was actually replaced, and evidence of it (job notes, parts record)
- Missing: Whether invoice B replaces invoice A
- Missing: Whether the actuator can be repaired rather than replaced, and a full breakdown of the £372 estimate (landlord's event 012 questions)
- Missing: The landlord's decision on the repair

## Final state
escalated (family: maintenance, urgency: P1)

## Summary
Copper Finch has billed £138 for the diagnosis, which is fine, and £372 for an actuator replacement nobody authorised and the tenant has not seen done. Do not pay either invoice until Petra explains them. The landlord still has to decide on the repair while the heating at a home with a child keeps cutting out. I have emailed the tenant and put the case on hold waiting for the landlord until 14/02. The landlord was already asked at event 023, and the invoice question and the repair decision are escalated P1.
