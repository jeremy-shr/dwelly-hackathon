# Case 009

## Next action
hold_waiting_for_landlord → landlord (stage: Landlord's own contractor; completion being confirmed; confidence medium; rules PM-AUTH-004, PM-CLOSE-001, PM-DATA-001, PM-DOC-001)

## Rationale
Stage: the landlord used his own contractor (events 014, 016, 018). The tenant now says the work is done (event 020), but nobody has confirmed it yet. PM-AUTH-004 applies: the landlord chose his own route, so the agency sends no contractor and pays no invoice. PM-CLOSE-001 and PM-DATA-001 stop me closing today for two reasons. First, the gas safety record the landlord forwarded (event 019) shows an address that is not this property. Second, Richard's report has not arrived and the landlord has not confirmed the work is done. I have emailed the landlord asking him to confirm the window is finished, send Richard's report, say whether there is an invoice or he pays Richard directly, and send a gas safety record that shows 24 Bramblewick Lane. My email does not quote the other address. I have sent the tenant a one-line acknowledgement and put the case on hold, waiting for the landlord, until 15/09/2025. Next steps: if Dorian replies, close the job without payment once he confirms completion, and file the correct gas safety record. If he does not reply by 15/09, chase him by email or SMS. The EICR he forwarded (event 011) needs to be checked against the file before it is filed, because the history does not show what it says.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Dorian confirmed the window is complete, sent Richard's report, said how the contractor is paid, and sent a gas safety record showing 24 Bramblewick Lane? If not, chase on 15/09/2025, then close without payment once completion is confirmed.","waiting_for":"landlord","until":"2025-09-15"}
- send_message#2 send_message [success] {"to_party":"landlord","to_ref":"Dorian Pike","channel":"email","subject":"24 Bramblewick Lane – bedroom window and gas safety record","body":"Address: 24 Bramblewick Lane, Alderfen, ZZ1 1ZZ\n\nHi Dorian,\n\nElena has let us know this evening that the bedroom window work has been done, and that Richard said he would send a report. Can you please confirm the window is now complete and forward Richa…
- send_message#3 send_message [success] {"to_party":"tenant","to_ref":"Elena Voss","channel":"email","subject":"24 Bramblewick Lane – bedroom window","body":"Address: 24 Bramblewick Lane, Alderfen, ZZ1 1ZZ\n\nHi Elena,\n\nThank you for letting us know the window work has been done. We have informed your landlord and asked him for the contractor's report so we can close the request.\n\nKind regards\nNorthbridge Lettings"}





## Not done and why
- Close the case without payment: The landlord has not confirmed completion, Richard's report has not arrived, and the gas safety record has an address conflict that is still open (PM-CLOSE-001).
- Assign a panel contractor: The landlord's own contractor did the work, so sending a second contractor is not allowed (PM-AUTH-004, PM-AUTH-005).
- File the gas safety record against this property: The record shows a different property's address.
- File the EICR: The history does not show what the EICR from event 011 says or which address it covers. Someone needs to check it before it is filed.

## Escalation
None required.

## Communications
- landlord via email: Asked him to confirm the window is complete, send Richard's report, say how the contractor is paid, and send a gas safety record for this property, because the forwarded one shows a different address.
- tenant via email: Thanked her for the update and said we have asked the landlord for the contractor's report so we can close the request.

## Messages sent (full text)
### To landlord (Dorian Pike) via email — 24 Bramblewick Lane – bedroom window and gas safety record
Address: 24 Bramblewick Lane, Alderfen, ZZ1 1ZZ

Hi Dorian,

Elena has let us know this evening that the bedroom window work has been done, and that Richard said he would send a report. Can you please confirm the window is now complete and forward Richard's report when you have it, so we can close the job on our side? Please also let us know if there is any invoice you would like us to process, or if you are paying Richard directly.

Thank you for forwarding the Landlord Gas Safety Record this morning. The property address shown on that record does not match 24 Bramblewick Lane, so we are unable to file it against this property. Could you please check with the engineer and send us the gas safety record for 24 Bramblewick Lane?

Kind regards
Northbridge Lettings

### To tenant (Elena Voss) via email — 24 Bramblewick Lane – bedroom window
Address: 24 Bramblewick Lane, Alderfen, ZZ1 1ZZ

Hi Elena,

Thank you for letting us know the window work has been done. We have informed your landlord and asked him for the contractor's report so we can close the request.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: The gas safety record forwarded in event 019 (ref NBL-009-GSR-25, dated 8 September 2025, outcome satisfactory) names 8 Thistledown Mews, Vellumby. The property on this case is 24 Bramblewick Lane, Alderfen. → I have not filed it against this property. I have asked the landlord for the right record without naming the other address in my email.
- Conflict: The tenant says the work is done (event 020). The landlord has not confirmed it and the contractor's report is not on file. → I am treating the tenant's word as strong evidence and have asked the landlord to confirm and send the report before closing.
- Missing: Richard's completion report
- Missing: Whether there is an invoice or the landlord pays the contractor directly
- Missing: A gas safety record for 24 Bramblewick Lane
- Missing: What the EICR forwarded in event 011 says and which address it covers

## Final state
on_hold (family: maintenance, urgency: P2)

## Summary
The tenant says the landlord's contractor Richard has finished the bedroom window. I have asked the landlord to confirm this and send Richard's report, and the case is on hold until 15/09. The gas safety record the landlord forwarded on 10 September shows a different property's address, so I have not filed it and have asked him for the right one.
