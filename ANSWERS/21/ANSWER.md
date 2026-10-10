# Case 021

## Next action
request_clarification → tenant (stage: Landlord-managed repair reported complete; waiting for the tenant to confirm; confidence high; rules PM-AUTH-004, PM-DATA-002, PM-CLOSE-001, PM-DOC-001, PM-AUTH-001)

## Rationale
Stage: the landlord is handling this repair through his own plumber, and we are now checking it is done before close-out. Rules: PM-AUTH-004, PM-DATA-002, PM-CLOSE-001, PM-DOC-001. In event 018 the landlord said his plumber fixed the fault on 14 May. That is based only on a text from the plumber: there is no work note and no record of boiler or electrical checks. The tenant has not confirmed the fix since the voicemail and email on 15 May (events 019 and 020). The last word from the tenant was that nothing had been done (events 012 and 017). So the case cannot close yet. I have emailed the tenant, with an SMS pointing her to it, asking whether the boiler has power and the hot water is back. I have also told her the letterbox does not need a separate report. I have emailed the landlord to say we are checking with the tenant and to ask for the plumber's note of what was found. In the same email I passed on the letterbox report (event 017, never raised with him until now) with the standard question: our contractor or his own? The case is on hold for the tenant until 19/05. If she says hot water is still off, we tell Ravi and arrange our contractor, as he allowed in event 015 and asked for in event 018. If she has not replied by then, we call her.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Tenant. Comment: Has Iris confirmed hot water and boiler power are restored? If not by 19/05, call her; if still not working, tell Ravi and arrange our contractor as he agreed (event 015). Also check Ravi's reply on the letterbox and plumber's work note.","waiting_for":"tenant","until":"2025-05-19"}
- send_message#2 send_message [success] {"to_party":"tenant","to_ref":"Iris Vale","channel":"email","subject":"Hot water and letterbox – 17 Wrenfold Quay","body":"Job Id: NBL-021\nAddress: 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ\n\nHi Iris,\n\nYour landlord has told us that his plumber attended on Wednesday 14 May 2025 and fixed the problem. Can you please confirm whether the boiler now has power and you have hot water at the taps and in …
- send_message#3 send_message [success] {"to_party":"tenant","to_ref":"Iris Vale","channel":"sms","body":"Hello, this is Northbridge Lettings! Please check your email regarding the property at 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ."}
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Ravi Sethi","channel":"email","subject":"Hot water update and letterbox – 17 Wrenfold Quay","body":"Job Id: NBL-021\nAddress: 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ\n\nHi Ravi,\n\nThank you for letting us know your plumber attended on Wednesday 14 May. We have asked the tenant to confirm the hot water is now working and will let you know straight away if it is not. …





## Not done and why
- Assign an agency contractor for the hot water now: The landlord reports the fault fixed and his plumber holds the job. Sending a second contractor before the tenant confirms the fault persists would duplicate the landlord's route (PM-AUTH-005). The landlord's leave in event 015 applies once it is confirmed the fault persists.
- Close the case: The fix is not confirmed by the tenant, there is no completion evidence, and the letterbox is still open (PM-CLOSE-001, PM-DOC-001).
- Dispatch for the letterbox: This is a tenant repair with no landlord approval on file yet (PM-AUTH-001).

## Escalation
None required.

## Communications
- tenant via email: Asks her to confirm whether hot water and boiler power are restored, says to tell us if not, and says the letterbox has been passed to the landlord
- tenant via sms: Platform pointer to check her email
- landlord via email: Says we are checking the fix with the tenant, asks for the plumber's note of works, and asks whether we or he should deal with the letterbox

## Messages sent (full text)
### To tenant (Iris Vale) via email — Hot water and letterbox – 17 Wrenfold Quay
Job Id: NBL-021
Address: 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ

Hi Iris,

Your landlord has told us that his plumber attended on Wednesday 14 May 2025 and fixed the problem. Can you please confirm whether the boiler now has power and you have hot water at the taps and in the shower? If it is still not working, please let us know as soon as possible so we can arrange for a contractor to attend.

You do not need to report the letterbox separately. We have passed it to your landlord and will be in touch on how he would like to proceed.

Kind regards
Northbridge Lettings

### To tenant (Iris Vale) via sms
Hello, this is Northbridge Lettings! Please check your email regarding the property at 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ.

### To landlord (Ravi Sethi) via email — Hot water update and letterbox – 17 Wrenfold Quay
Job Id: NBL-021
Address: 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ

Hi Ravi,

Thank you for letting us know your plumber attended on Wednesday 14 May. We have asked the tenant to confirm the hot water is now working and will let you know straight away if it is not. As the boiler had no power, could you please ask your plumber to send a short note of what was found and done, so we have it on file for the property.

The tenant has also reported: "the letterbox is not working". Please advise if you would like us to send one of our contractors to attend to this issue and resolve where possible (or quote if significant), or if you would prefer to deal with it yourself.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: The landlord says the plumber fixed it on 14 May (event 018). The tenant's last reports said nothing had been done (events 012 and 017, before 14 May), and she has not replied since. → The two accounts do not strictly contradict each other in time, but the fix is unverified. I asked the tenant to confirm before anything else is done or the case closes.
- Conflict: The case-state extract says 'work completed' and 'invoice sent to landlord'. → The history does not show any invoice or completion evidence, only the landlord's verbal report. I disregarded the extract on this point.
- Missing: Tenant's confirmation that the boiler has power and hot water is restored
- Missing: Plumber's note of the work done and any boiler or electrical checks
- Missing: Landlord's decision on the letterbox repair
- Missing: Details of the letterbox fault

## Final state
on_hold (family: maintenance, urgency: P1)

## Summary
The landlord says his plumber fixed the hot water on 14 May, but the tenant has not confirmed it and there is no work note. I have emailed and texted the tenant to check, and asked the landlord for the plumber's note and how he wants the letterbox dealt with. The case is on hold for the tenant until 19/05.
