# Case 004

## Next action
hold_waiting_for_landlord → landlord (stage: Landlord's own contractor attending; new items with landlord; confidence medium; rules PM-AUTH-004, PM-AUTH-005, PM-AUTH-001, PM-SAFE-001, PM-WORKFLOW-001)

## Rationale
Stage: the landlord's own contractor is doing the job (PM-AUTH-004). The landlord told us to stand down our locksmith and wait for Dorian Wren (events 011, 012, 016, 017). The tenant says Dorian is due today, Tuesday 16 September, after 10:00 (event 023). We do not send a second contractor (PM-AUTH-005). I have emailed the tenant to thank her for the update, ask her to tell us the outcome and ask whether the door can still be secured. I have also emailed the landlord, by email as he asked in event 005. That email updates him on the lock and asks how he wants the three items the tenant raised in event 021 handled: hot water that is too hot (a possible scalding risk), a broken bedroom blind, and the door glazing. The case is on hold Waiting for Landlord until 17/09. The next check is whether Dorian attended and whether the landlord has replied. I escalated P1 because hot water that is too hot is a safety defect and nobody owns it yet, and the landlord is away and only reachable by email. Evidence: events 005, 011, 016, 020, 021, 023.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has the landlord's contractor Dorian Wren attended on 16/09 and replaced the front door lock (check tenant update)? Has the landlord replied on the hot water temperature, bedroom blind and door glazing? If not, chase on 17/09.","waiting_for":"landlord","until":"2025-09-17"}
- send_message#3 send_message [success] {"to_party":"tenant","to_ref":"Nessa Vale","channel":"email","subject":"Front door lock - 18 Larkspur Quay","body":"Address: 18 Larkspur Quay, Morrowfen, ZZ1 1ZZ\n\nHello Nessa,\n\nThank you for letting us know that Dorian is due to attend today, Tuesday 16 September, sometime after 10:00. Please let us know once he has been and whether the lock has been replaced. In the meantime, can you confirm …
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Tomas Elde","channel":"email","subject":"18 Larkspur Quay - front door lock update and further repairs reported","body":"Address: 18 Larkspur Quay, Morrowfen, ZZ1 1ZZ\n\nHi Tomas,\n\nJust to update you on the front door lock. The tenant told us that Dorian attended after 9 September, found that a key he tried also failed, and said a new lock was needed. He left to …

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"Duty manager to own the hot-water-too-hot report as a possible scalding hazard: if the landlord (away, email only) has not replied by Wednesday 17 September, decide whether to phone him or seek authority for a heating engineer to check the hot water temperature. Also act if the tenant reports the front door can no longer be secured or Dorian does not attend today.…




## Not done and why
- Instruct Peregrine Keyworks or any agency locksmith: Landlord instructed us to use his contractor Dorian Wren, who is due today; a second contractor is prohibited.
- Dispatch a contractor for hot water, blind or glazing: No landlord approval on file for these items; asked the landlord first.
- Close the case: Lock replacement not confirmed; other items open.
- Act on skirting-board paint touch-ups: Already agreed by landlord at tenant's own expense (events 005, 011); nothing owed.

## Escalation
Tier P1. Decision required from a human: Own the hot water item: if the landlord has not replied by Wednesday 17 September, phone him or seek authority for a heating engineer; act if the door cannot be secured or Dorian does not attend. Reason: Tenant reports hot water too hot (possible scalding risk) with no owner since 9 September; landlord is away and email-only. Deadline: 2025-09-17T17:00:00+01:00.

Handover: Lock repair with the landlord's contractor Dorian Wren, due 16/09 after 10:00; landlord and tenant emailed 16/09; hold Waiting for Landlord to 17/09.

## Communications
- tenant via email: Thanks her for the visit update; asks her to confirm the outcome and whether the door still secures; tells her the other three items are with the landlord; asks her to take care with the hot water.
- landlord via email: Updates him on the lock and Dorian's visit today; asks whether we send a contractor or he arranges his own for the hot water (flagged as a priority), the blind and the door glazing.

## Messages sent (full text)
### To tenant (Nessa Vale) via email — Front door lock - 18 Larkspur Quay
Address: 18 Larkspur Quay, Morrowfen, ZZ1 1ZZ

Hello Nessa,

Thank you for letting us know that Dorian is due to attend today, Tuesday 16 September, sometime after 10:00. Please let us know once he has been and whether the lock has been replaced. In the meantime, can you confirm that the front door can still be locked and secured? If at any point it cannot, please contact us straight away.

We have also written to your landlord today about the other matters you raised on our call: the broken bedroom blind, the glazing in the door, and the hot water being too hot. We have asked him how he would like each of these dealt with and we will come back to you as soon as we hear. Until the hot water has been looked at, please take care at the taps, particularly with anyone vulnerable in the home.

Kind regards
Northbridge Lettings

### To landlord (Tomas Elde) via email — 18 Larkspur Quay - front door lock update and further repairs reported
Address: 18 Larkspur Quay, Morrowfen, ZZ1 1ZZ

Hi Tomas,

Just to update you on the front door lock. The tenant told us that Dorian attended after 9 September, found that a key he tried also failed, and said a new lock was needed. He left to get one. The tenant has told us this morning that he is due to return today, Tuesday 16 September, sometime after 10:00. She reports the lock is now worse than before, so we will check with her whether it has been replaced and will let you know.

The tenant has also raised three further matters: a broken bedroom blind that lets in light, the glazing in a door, which she understands you had said would be addressed, and hot water that she says is too hot. Water that is too hot can be a scalding risk, so we would like to get this one looked at as a priority. Please advise if you would like us to send one of our contractors to attend to these issues and resolve where possible (or quote if significant), or if you would prefer to deal with them yourself or through Dorian.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: The case-state extraction says the work is completed and the stage is close-out, but event 023 shows the lock has not yet been replaced. → Followed the events: the job is still open and waiting for the landlord's contractor.
- Conflict: Event 006 recorded the landlord's approval for the agency's locksmith; event 011 then told us to use his own contractor. → The later instruction (event 011) governs, and Peregrine was stood down in event 017.
- Missing: Whether Dorian Wren attends today and replaces the lock
- Missing: Whether the front door can currently be secured
- Missing: The landlord's decision on the hot water temperature, the blind and the door glazing
- Missing: Who pays Dorian Wren (presumably the landlord pays directly)

## Final state
escalated (family: maintenance, urgency: P1)

## Summary
I have emailed the landlord about the scalding hot water, the broken blind and the door glazing, and asked him whether to send our contractor or use his own; nobody had taken these on since 9 September. The landlord's contractor Dorian Wren is due today after 10:00 to replace the front door lock, which the tenant says is getting worse. I have asked the tenant whether the door still locks and escalated the hot water to the duty manager (P1).
