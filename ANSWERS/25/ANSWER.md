# Case 025

## Next action
message_provider → provider (stage: Awaiting work results, invoice amount and key return; confidence medium; rules PM-DOC-001, PM-KEY-001, PM-CLOSE-001, PM-AUTH-001)

## Rationale
Stage: waiting for work results. The landlord approved the tap work in event 003. A contractor visit was arranged for 10 September (events 015 to 018), but the history does not show the date they attended or any work results. Bracken & Vale's corrected invoice NBL-025-INV-15 (event 022) describes a new mono kitchen sink tap supplied and installed, with the postcode corrected, but it gives no amount. The case is not ready to close. So I have done these things: (1) emailed Ivo asking for confirmation of the attendance date and that the work is complete, any photos or job sheet, the invoice amount with VAT shown, confirmation that the key is back at the office, and anything he noticed about the cloudy water; (2) emailed the landlord to say the invoice has arrived and we are confirming completion and the charge, and asked how he wants the loose drawer from event 012 handled (our contractor or his own); (3) emailed the tenant asking whether the tap has been fitted and fixed and whether the water is still cloudy, and telling her the drawer report is with the landlord; (4) the case is on hold, Waiting for Provider, with a chase on Wednesday 17 September 2025. Next: once the contractor confirms completion and sends the amount, email the landlord with the invoice attached, run final checks including the key return, and close. The drawer follows the landlord's answer. Rules: PM-DOC-001, PM-KEY-001, PM-CLOSE-001, PM-AUTH-001.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Bracken & Vale sent the invoice with the amount and confirmed the key is back at the office? If not, chase on 17/09. Also check for landlord reply on the drawer and tenant confirmation of the tap/cloudy water.","waiting_for":"contractor","until":"2025-09-17"}
- send_message#6 send_message [success] {"to_party":"contractor","to_ref":"Ivo Fenlock, Bracken & Vale Plumbing","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - corrected invoice NBL-025-INV-15","body":"Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ\n\nHi Ivo,\n\nThank you for the corrected invoice NBL-025-INV-15, the postcode is now right. Please could you update me on this job. Can you confirm the date you attended,…
- send_message#7 send_message [success] {"to_party":"landlord","to_ref":"Orin Bell","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap and kitchen drawer","body":"Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ\n\nHi Orin,\n\nBracken & Vale Plumbing have sent an invoice describing a new mono kitchen sink tap supplied and fitted. We are confirming with them that the work is complete and getting the final charge…
- send_message#8 send_message [success] {"to_party":"tenant","to_ref":"Nia Calder","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap","body":"Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ\n\nHi Nia,\n\nCan you please let us know whether the plumber has attended and fitted a new kitchen tap, whether the tap is still dripping, and whether the water still looks cloudy when you fill a glass.\n\nWe have passed y…

### Recorded for a human (not executed by the system)
- propose_action#2 propose_action [recorded for human] {"action_type":"internal_check","target":"Property manager (Tessa Wren)","parameters":"Check with the relevant engineer what boiler work, if any, was done at 18 Thistlewick Row, as said on the call in event 021.","rationale":"The boiler matter came up on the call but there is nothing about it on the file for this tap job; the manager said they would check it."}
- escalate#auto escalate [recorded for human] {"tier":"P1","decision_required":"Review the proposed actions and the check failures; decide what to execute.","summary":"Automated checks failed: [PM-DOC-001] the text says the work is done (\"Can you confirm the date you attended, that the work is complete and the tap is no longer dripping, \") but the case holds no work results or completion evidence. Default: message_provider..","what_was_trie…


### Actions blocked by guards or checks
- send_message#3 send_message [blocked] {"to_party":"contractor","to_ref":"Ivo Fenlock, Bracken & Vale Plumbing","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - corrected invoice NBL-025-INV-15","body":"Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ\n\nHi Ivo,\n\nThank you for the corrected invoice NBL-025-INV-15, the postcode is now right. The invoice does not show the amount charged, so please can you resend it with… — withdrawn: superseded by a later action
- send_message#4 send_message [blocked] {"to_party":"landlord","to_ref":"Orin Bell","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap and kitchen drawer","body":"Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ\n\nHi Orin,\n\nJust to make you aware that Bracken & Vale Plumbing have invoiced for supplying and fitting a new mono kitchen sink tap to replace the dripping one. We have asked them for the final charg… — withdrawn: superseded by a later action
- send_message#5 send_message [blocked] {"to_party":"tenant","to_ref":"Nia Calder","channel":"email","subject":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap","body":"Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ\n\nHi Nia,\n\nOur plumber has let us know that a new kitchen tap has been fitted. Can you please confirm the tap is no longer dripping, and let us know whether the water still looks cloudy when you fill a glass.\n\nWe have… — withdrawn: superseded by a later action


## Not done and why
- Close the case or send the landlord the completion email with the invoice attached: There is no completion evidence or invoice amount yet, and the key return is unconfirmed (PM-DOC-001, PM-KEY-001).
- Instruct anyone for the drawer: There is no landlord approval for this new item (PM-AUTH-001).
- Action anything on the boiler: No boiler work is on file for this job. It is listed as an internal check for the manager.

## Escalation
Tier P1. Decision required from a human: Review the proposed actions and the check failures; decide what to execute. Reason: Automated checks failed: [PM-DOC-001] the text says the work is done ("Can you confirm the date you attended, that the work is complete and the tap is no longer dripping, ") but the case holds no work results or completion evidence. Default: message_provider..

Handover: Bracken & Vale's corrected invoice describes a new kitchen tap fitted but shows no amount, and the history does not show their attendance or work results. I have asked them to confirm completion, send the amount and confirm the key is back, asked the tenant to confirm the fix, and asked the landlord about the loose drawer. The case is on hold until Wednesday 17 September 2025.

## Communications
- contractor via email: Asked for confirmation of completion, photos or job sheet, the invoice amount with VAT, the key return and any observation on the cloudy water
- landlord via email: Told him the invoice has arrived and completion and the charge are being confirmed; asked about the drawer
- tenant via email: Asked whether the tap was fitted and fixed and whether the water is still cloudy; told her the drawer report is with the landlord

## Messages sent (full text)
### To contractor (Ivo Fenlock, Bracken & Vale Plumbing) via email — 18 Thistlewick Row, Fenmere, ZZ1 1ZZ - corrected invoice NBL-025-INV-15
Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ

Hi Ivo,

Thank you for the corrected invoice NBL-025-INV-15, the postcode is now right. Please could you update me on this job. Can you confirm the date you attended, that the work is complete and the tap is no longer dripping, and send any photos or job sheet you have. The invoice does not show the amount charged, so please resend it with the price for the tap and the labour, with VAT shown separately if you charge it.

Can you also confirm that the spare key you used has been returned to our office, and let us know if you noticed anything about the cloudy water the tenant mentioned.

Kind regards
Northbridge Lettings

### To landlord (Orin Bell) via email — 18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap and kitchen drawer
Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ

Hi Orin,

Bracken & Vale Plumbing have sent an invoice describing a new mono kitchen sink tap supplied and fitted. We are confirming with them that the work is complete and getting the final charge, and will update you with the invoice once we have it.

The tenant has also reported: "the top kitchen drawer is loose and its metal front brackets appear snapped" and asked if it can be repaired. Please advise if you would like us to send one of our contractors to attend to this and resolve where possible (or quote if significant), or if you would prefer to deal with it yourself.

Kind regards
Northbridge Lettings

### To tenant (Nia Calder) via email — 18 Thistlewick Row, Fenmere, ZZ1 1ZZ - kitchen tap
Address: 18 Thistlewick Row, Fenmere, ZZ1 1ZZ

Hi Nia,

Can you please let us know whether the plumber has attended and fitted a new kitchen tap, whether the tap is still dripping, and whether the water still looks cloudy when you fill a glass.

We have passed your report about the loose kitchen drawer to your landlord and we await his response. We will be in further contact as soon as possible.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: The first invoice (event 019) had a different postcode, and there was confusion over the address on the call in event 013. → The corrected invoice in event 022 matches the case header address, which is the one I used.
- Conflict: The invoice describes the work as done, but the history does not show the attendance or any work results, and the invoice gives no amount. → I have asked the contractor and the tenant to confirm. I have not given the landlord any figure.
- Missing: Attendance date and completion confirmation from the contractor
- Missing: Invoice amount and VAT
- Missing: Key return confirmation
- Missing: Tenant confirmation of the fix and the cloudy water
- Missing: Landlord decision on the drawer
- Missing: What boiler matter came up on the call in event 021

## Final state
escalated (family: maintenance, urgency: P2)

## Summary
Bracken & Vale's corrected invoice describes a new kitchen tap fitted but shows no amount, and the history does not show their attendance or work results. I have asked them to confirm completion, send the amount and confirm the key is back, asked the tenant to confirm the fix, and asked the landlord about the loose drawer. The case is on hold until Wednesday 17 September 2025.
