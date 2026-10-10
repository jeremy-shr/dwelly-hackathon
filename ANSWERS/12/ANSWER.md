# Case 012

## Next action
message_provider → provider (stage: No work results: awaiting completion evidence and invoice from the provider; confidence medium; rules PM-DOC-001, PM-KEY-001, PM-CLOSE-001, PM-AUTH-001, PM-AUTH-005)

## Rationale
Stage: work results not received. The provider says the work is done, but there is no evidence of the visit. The landlord approved the lock work with the agency's provider (event 003), so PM-AUTH-001 is satisfied, and Keypath Repairs (Edrin Moss) holds the job (events 012–018). Edrin's account is not consistent. On 17 September he said he had not found the tenant in and had not collected management keys (event 022). In the calls in events 023 and 025 he said the work was done on 19 September. The history does not show an appointment, a key collection, visit notes, work results or an invoice, so the work is unverified (PM-DOC-001) and the case stays open (PM-CLOSE-001). I have emailed Edrin to ask for the work results: visit date and time, how he got in, what was done to each sash, how many keys were supplied (spare set to the office), whether management keys were collected and returned (PM-KEY-001), and the invoice. I have emailed the tenant to ask whether Keypath attended and whether the locks and keys are now working. I have also emailed the landlord. The update makes no claim that the work is done. The email passes on the tenant's bathroom mould report from event 006, which the history does not show reaching the landlord, and asks how they want to handle it. The mould is logged as a separate P2 request. The job is on hold for the provider until 26/09. If there is no report or invoice by then, chase Edrin. If the tenant says the locks still do not work or nobody attended, go back to Keypath and treat it as a P1 security item.

## Execution status (generated from execution results, not from the agent's text)
- Executed: create_ticket, set_hold, send_message, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- create_ticket#1 create_ticket [success] {"property_id":"Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ","title":"Bathroom mould reported by tenant","category":"damp_mould","urgency":"P2","description":"Tenant Perrin Dall mentioned mould appearing in the bathroom during the call on 09/09/2025 (event 006 of the window lock job). The bathroom sash window was also reported stuck. Treat as a hazard investigation. Landlord Sella Marr emailed 25…
- set_hold#2 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Keypath Repairs sent the invoice and work report (visit date, access, works, keys)? Has Perrin confirmed the locks work? If not by 26/09, chase both. Mould ask with landlord since 25/09.","waiting_for":"contractor","until":"2025-09-26T16:00:00Z"}
- send_message#3 send_message [success] {"to_party":"contractor","to_ref":"Edrin Moss, Keypath Repairs","channel":"email","subject":"Window locks – Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ","body":"Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ\n\nHi Edrin,\n\nThank you for the call today. So that we can close this job, please send your invoice together with a short work report: the date and time of your visit, how you access…
- send_message#6 send_message [success] {"to_party":"tenant","to_ref":"Perrin Dall","channel":"email","subject":"Window locks – Unit 2, 18 Brindlewick Mews","body":"Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ\n\nHi Perrin,\n\nWe are checking on the window lock repair. Could you please let us know whether our contractor, Keypath Repairs, has attended? If so, please tell us the date, and whether the bedroom sash now locks, the b…
- send_message#7 send_message [success] {"to_party":"landlord","to_ref":"Sella Marr","channel":"email","subject":"Unit 2, 18 Brindlewick Mews – window locks update and bathroom mould","body":"Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ\n\nHi Sella,\n\nWe are following up the window lock job with Keypath Repairs. We have asked them for a report on their visit and for their invoice, and we have asked the tenant to confirm whethe…

### Recorded for a human (not executed by the system)
- escalate#auto escalate [recorded for human] {"tier":"P1","decision_required":"Review the proposed actions and the check failures; decide what to execute.","summary":"Automated checks failed: [PM-SAFE-001] safety signals present (property cannot be secured (door or lock) (events 1, 6); window will not open (escape route) (event 1)) but the resolution neither raises urgency, dispatches nor escalates, and does not say why. Default: escalate_sa…


### Actions blocked by guards or checks
- send_message#4 send_message [blocked] {"to_party":"tenant","to_ref":"Perrin Dall","channel":"email","subject":"Window locks – Unit 2, 18 Brindlewick Mews","body":"Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ\n\nHi Perrin,\n\nOur contractor, Keypath Repairs, has told us the window lock work was completed on Friday 19 September. Could you please confirm whether the bedroom sash now locks, whether the bathroom sash opens and its… — withdrawn: superseded by a later action
- send_message#5 send_message [blocked] {"to_party":"landlord","to_ref":"Sella Marr","channel":"email","subject":"Unit 2, 18 Brindlewick Mews – window locks update and bathroom mould","body":"Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ\n\nHi Sella,\n\nKeypath Repairs tell us the window lock work was completed on Friday 19 September. We are waiting for their invoice and work report, and we have asked the tenant to confirm the l… — withdrawn: superseded by a later action


## Not done and why
- Close the case or tell anyone the work is complete: No work results, visit record, invoice or tenant confirmation are on file, and the contractor's account conflicts with event 022 (PM-DOC-001).
- Send another contractor: Keypath Repairs holds the job (PM-AUTH-005). Reconsider only if the tenant or contractor shows the work was not done.
- Instruct a contractor for the mould: The landlord has not approved this item; I have asked them.
- Escalate to a human: Getting completion evidence is routine follow-up the agency handles itself, and nothing shows a current danger.

## Escalation
Tier P1. Decision required from a human: Review the proposed actions and the check failures; decide what to execute. Reason: Automated checks failed: [PM-SAFE-001] safety signals present (property cannot be secured (door or lock) (events 1, 6); window will not open (escape route) (event 1)) but the resolution neither raises urgency, dispatches nor escalates, and does not say why. Default: escalate_safety. Either act on it or cite PM-SAFE-001 in rulesApplied and say in the decision why not..

Handover: Keypath Repairs says verbally that the window locks are done, but there is no evidence of a visit, and on 17 September they said they had not collected keys. I have asked Keypath for the work results and invoice, asked the tenant to confirm, asked the landlord about the bathroom mould, and put the job on hold for the provider until 26/09.

## Communications
- contractor (Edrin Moss, Keypath Repairs) via email: Asked for work results (visit date, access, works per sash, keys supplied with a spare set to the office, management keys) and the invoice.
- tenant (Perrin Dall) via email: Asked whether Keypath attended and whether the sash locks and keys are now working; said the mould report has gone to the landlord.
- landlord (Sella Marr) via email: Told the landlord we are following up with the contractor and tenant; asked whether to send our contractor for the bathroom mould or whether they will deal with it.

## Messages sent (full text)
### To contractor (Edrin Moss, Keypath Repairs) via email — Window locks – Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ
Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ

Hi Edrin,

Thank you for the call today. So that we can close this job, please send your invoice together with a short work report: the date and time of your visit, how you accessed the property, what was done to the bedroom, bathroom and kitchen sash locks, and any photos.

Please also confirm how many window keys were supplied, and drop a spare set at our office for the office file. If you collected our management keys at any point, please confirm when they were returned.

Kind regards
Northbridge Lettings

### To tenant (Perrin Dall) via email — Window locks – Unit 2, 18 Brindlewick Mews
Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ

Hi Perrin,

We are checking on the window lock repair. Could you please let us know whether our contractor, Keypath Repairs, has attended? If so, please tell us the date, and whether the bedroom sash now locks, the bathroom sash opens with working locking buttons, and you have keys for all the window locks, including the kitchen.

If anything is still not working, please let us know and we will follow it up. We have also passed on your report of mould in the bathroom to your landlord.

Kind regards
Northbridge Lettings

### To landlord (Sella Marr) via email — Unit 2, 18 Brindlewick Mews – window locks update and bathroom mould
Address: Unit 2, 18 Brindlewick Mews, Orellin ZZ1 1ZZ

Hi Sella,

We are following up the window lock job with Keypath Repairs. We have asked them for a report on their visit and for their invoice, and we have asked the tenant to confirm whether the locks are working. We will update you once we have both.

Separately, while we were arranging the lock work the tenant mentioned "mould appearing in the bathroom". Please advise if you would like us to send one of our contractors to inspect this and resolve where possible (or quote if significant), or if you would prefer to deal with it yourself.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 022: Edrin had not found the tenant in and had not collected management keys. Events 023 and 025: Edrin says the work was completed on 19 September. Nothing shows how he got in. → Treated as unverified. I have asked the contractor for work results and the tenant for confirmation, and the case stays open.
- Conflict: Tarin Vale (Hearthline Access) said in event 016 that he had agreed a date with the tenant after the job was reassigned. → Tarin was stood down in event 012. Keypath is the provider on the job. I have not contacted Tarin.
- Conflict: The deterministic flag reads 'Thursday 08' as 8 September. → False reading. The tenant offered Thursday 18 September, 08:30–10:30, and 18 September 2025 is a Thursday.
- Missing: Work results: visit date, time, access method and works done on each sash
- Missing: Invoice from Keypath Repairs
- Missing: How many window keys were supplied, and whether management keys were collected and returned
- Missing: Tenant's confirmation that the locks work
- Missing: Landlord's decision on the bathroom mould
- Missing: Which floor the unit is on (whether the bedroom window can be reached from outside)

## Final state
escalated (family: maintenance, urgency: P2)

## Summary
Keypath Repairs says verbally that the window locks are done, but there is no evidence of a visit, and on 17 September they said they had not collected keys. I have asked Keypath for the work results and invoice, asked the tenant to confirm, asked the landlord about the bathroom mould, and put the job on hold for the provider until 26/09.
