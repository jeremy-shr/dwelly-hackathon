# Case 016

## Next action
escalate_safety → human (stage: Landlord's own contractor, stalled; on hold Waiting for Landlord; confidence medium; rules PM-SAFE-001, PM-AUTH-004, PM-AUTH-005, PM-PRIV-001, PM-WORKFLOW-002)

## Rationale
Stage: the landlord's own contractor is on the job (PM-AUTH-004), but the job has stalled. It is a safety item, so it is P1, not routine. Evidence: the landlord chose his own electrician (events 004 and 007) and promised completion by mid-August. The fitter could not refit the alarm (event 010). There is no completion or test evidence (event 014). The tenant was in hospital and asked for less contact (events 011 to 013). An unverified caller came on 20/09 (events 015 and 016). Nobody has written to the landlord since event 007, so I have emailed him. I asked for the electrician's name and a visit date, whether the 20/09 caller was his, and whether he would rather have our contractor. The visit details come through us so the tenant can check who is coming, and none of the tenant's contact details are shared (PM-PRIV-001). I sent the tenant one short email: an acknowledgement that we are checking who the caller was, with no calls, to respect her request. I recorded the landlord's decision and put the case on hold for the landlord until 24/09. I escalated P1 (PM-SAFE-001) because a missing smoke alarm for a recently hospitalised tenant cannot be left on the landlord's slow timeline. A human must decide on the agency stepping in if no firm date arrives, and must check the caller with the building-management contact. No contractor is sent while the landlord's contractor holds the job (PM-AUTH-005).

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, record_landlord_decision, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Ronan confirmed the electrician's name and visit date, and whether the caller on 20/09 was his? If not, chase on 24/09. The smoke alarm is still unmounted.","waiting_for":"landlord","until":"2025-09-24T09:00:00Z"}
- record_landlord_decision#3 record_landlord_decision [success] {"landlord_id":"Ronan Vale","decision":"Landlord to use his own electrician to refit the smoke alarm (no name, scope or date given). Later said the electrician would contact the tenant and complete by the following weekend at the latest. Neither the history nor any record shows the work was completed.","source":"Emails from Ronan Vale, event 004 (07/08/2025) and event 007 (12/08/2025)"}
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Ronan Vale","channel":"email","subject":"NBL-016 – 26 Tallowmere Close – smoke alarm still not refitted","body":"Job Id: NBL-016\nAddress: 26 Tallowmere Close, Fenbarrow, ZZ1 1ZZ\n\nHi Ronan,\n\nI am following up on the smoke alarm. The tenant tells us a fitter came but could not refit the alarm because there was no bracket in the box. The alarm is still not fixed …
- send_message#5 send_message [success] {"to_party":"tenant","to_ref":"Elise Rowan","channel":"email","subject":"NBL-016 – 26 Tallowmere Close – caller on Saturday","body":"Job Id: NBL-016\nAddress: 26 Tallowmere Close, Fenbarrow, ZZ1 1ZZ\n\nHello Elise,\n\nThank you for telling us about the caller on Saturday morning. You were right not to let in anyone you could not verify. We are asking your landlord whether the caller had anything t…

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"Decide whether the agency should press the landlord to accept our contractor, or arrange a refit, if Ronan Vale gives no firm date by 24/09/2025. The smoke alarm has been off the ceiling since 07/08/2025, the landlord's own electrician has not finished the job, and the tenant was recently in hospital. Also confirm with the building-management contact whether the u…




## Not done and why
- Assign an agency contractor: The landlord chose his own electrician (event 004). Sending a second contractor without his agreement is not allowed (PM-AUTH-004/005). I have offered him ours instead.
- Phone the tenant or send repeated chasers: The tenant asked for less contact while recovering (events 013 and 014). One short email answers her 20/09 call.
- Share the tenant's contact details with the landlord's electrician: We have no consent, and the electrician is not identified (PM-PRIV-001).
- Tell the tenant who the 20/09 caller was: The caller has not been verified. We will not guess.

## Escalation
Tier P1. Decision required from a human: Whether the agency steps in with its own contractor if there is no firm date by 24/09; verify the 20/09 caller with the building-management contact. Reason: Smoke alarm safety defect left unresolved for 6+ weeks by the landlord's own contractor, with a vulnerable tenant and an unverified caller. Deadline: 2025-09-24T17:00:00Z.

Handover: Dorian Pike / duty manager

## Communications
- Landlord (Ronan Vale) via email: The alarm is still unmounted. Asked for the electrician's name and visit date, whether the 20/09 caller was his, and whether he wants our contractor instead.
- Tenant (Elise Rowan) via email: Thanked her for reporting the caller and said she was right not to let them in. We are checking with the landlord and will only contact her again with confirmed visit details.

## Messages sent (full text)
### To landlord (Ronan Vale) via email — NBL-016 – 26 Tallowmere Close – smoke alarm still not refitted
Job Id: NBL-016
Address: 26 Tallowmere Close, Fenbarrow, ZZ1 1ZZ

Hi Ronan,

I am following up on the smoke alarm. The tenant tells us a fitter came but could not refit the alarm because there was no bracket in the box. The alarm is still not fixed to the ceiling, and we have no confirmation that it has been refitted and tested. A smoke alarm is a safety item, so this needs completing as soon as possible.

Can you please tell us your electrician's name and the date and time they will attend? Please also confirm whether you sent anyone to the property on the morning of Saturday 20 September. Someone called without notice and said they were there to check something. The tenant did not let them in because they could not confirm who they were. Please send us the visit details and we will pass them to the tenant so they know who to expect.

If you would prefer, we can send one of our contractors to refit the alarm instead. Please let us know which you would like.

Kind regards
Northbridge Lettings

### To tenant (Elise Rowan) via email — NBL-016 – 26 Tallowmere Close – caller on Saturday
Job Id: NBL-016
Address: 26 Tallowmere Close, Fenbarrow, ZZ1 1ZZ

Hello Elise,

Thank you for telling us about the caller on Saturday morning. You were right not to let in anyone you could not verify. We are asking your landlord whether the caller had anything to do with the smoke alarm work. We will only contact you again when we have confirmed who will attend and when.

We hope you are recovering well.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 003 says an inspection noted the alarm had been put up recently and came down, and the agency had no record of the installation. Event 001 is a tenant report. → Either way the alarm is unmounted. I am working from the tenant's report and event 014.
- Conflict: The landlord promised completion by the weekend after 12/08 (event 007). Event 009 gives a date of 31/08. The fitter came about 02/09 but did not finish (event 010). → I am treating the work as not done. There is no completion evidence.
- Conflict: An unverified caller came on 20/09. Event 016 says another agency contact passed it to a building-management contact. → The caller is unverified. I have asked the landlord, and the escalation asks a human to check with building management.
- Missing: Landlord's electrician: name, contact and visit date
- Missing: Who the caller on 20/09 was and why they came
- Missing: Whether the property has other working smoke alarms
- Missing: Whether the alarm is mains-wired or battery

## Final state
escalated (family: maintenance, urgency: P1)

## Summary
The smoke alarm at 26 Tallowmere Close has been off the ceiling since 7 August. The landlord's own electrician has not finished, the tenant has just come out of hospital, and an unverified caller came on 20 September. I have emailed the landlord for the electrician's name, a date and whether the caller was his, sent the tenant one short email, and set the case on hold until 24/09. I have also escalated P1 for a decision on stepping in if he gives no firm date.
