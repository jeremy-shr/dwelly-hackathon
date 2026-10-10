# Case 022

## Next action
hold_waiting_for_landlord → landlord (stage: Landlord's own contractor arranging replacement; awaiting delivery date; confidence high; rules PM-AUTH-004, PM-AUTH-005, PM-CLOSE-001, PM-DOC-001, PM-PRIV-001, PM-DATA-002)

## Rationale
Stage: the landlord is replacing the machine through her own route. She ordered a new washing machine and arranged its delivery, fitting and the removal of the old one herself (events 027 and 029), with no date given. PM-AUTH-004 applies: the agency sends no contractor of its own. The tenant's "Yes, the job is completed" in event 031 conflicts with their call in event 030, where they said nothing had arrived, and in the same email they ask whether the change is still happening. So the job is not confirmed done and cannot be closed (PM-CLOSE-001, PM-DOC-001). I have emailed the tenant to say the replacement is still going ahead, ask whether the machine has actually been delivered and fitted, and ask for consent to share their number with the landlord's installers (PM-PRIV-001). I have emailed the landlord asking for the delivery and installation date and the installer's name, and passed on the tenant's request for three hours' notice (event 013). The case is on hold, Waiting for Landlord, until 29/09/2025. Next: if the landlord gives a date, tell the tenant and keep holding until the installation. When the tenant or landlord confirms it is installed, complete without payment. If either of them stays silent, chase on 29/09.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has the landlord given the delivery and installation date and the installer's name for the replacement washing machine? Has the tenant said whether it has arrived and agreed to their number being shared? If not, chase both on 29/09.","waiting_for":"landlord","until":"2025-09-29"}
- send_message#2 send_message [success] {"to_party":"tenant","to_ref":"Ari Dalen","channel":"email","subject":"8 Brackenmere Walk – washer-dryer replacement","body":"Address: 8 Brackenmere Walk, Vellumford, ZZ1 1ZZ\n\nHi Ari,\n\nThank you for your email. Yes, the change is still happening. Your landlord has ordered a new washing machine and has arranged for it to be delivered and fitted, and for the old machine to be taken away. We do n…
- send_message#3 send_message [success] {"to_party":"landlord","to_ref":"Nessa Orin","channel":"email","subject":"8 Brackenmere Walk – new washing machine delivery","body":"Address: 8 Brackenmere Walk, Vellumford, ZZ1 1ZZ\n\nHello Nessa,\n\nThank you for arranging the new washing machine, along with its delivery, fitting and the removal of the old one. When we spoke to the tenant yesterday, Wednesday 24 September, the new machine had no…





## Not done and why
- Close the case on the tenant's "job is completed": This conflicts with the call on 24 September (nothing had arrived), and the tenant is still asking whether the change is happening. There is no evidence the job is complete.
- Assign an agency contractor or request a quote for removal and replacement (event 028): The landlord superseded that request in event 029 by arranging delivery, fitting and disposal herself. A second contractor must not be sent (PM-AUTH-004/005).
- Share the tenant's phone number with the landlord's installers: The tenant has not yet consented. I have asked them.
- Escalate the landlord's comment about slow response (event 029): This is not a formal complaint. Noted for the duty manager's awareness only.

## Escalation
None required.

## Communications
- tenant via email: Says the replacement is still happening with no date yet, asks whether it has actually been delivered and fitted, and asks for consent to share their number with the installers.
- landlord via email: Says the tenant reported yesterday that nothing had arrived, asks for the delivery/installation date and the installer's name, and notes the tenant's request for three hours' notice.

## Messages sent (full text)
### To tenant (Ari Dalen) via email — 8 Brackenmere Walk – washer-dryer replacement
Address: 8 Brackenmere Walk, Vellumford, ZZ1 1ZZ

Hi Ari,

Thank you for your email. Yes, the change is still happening. Your landlord has ordered a new washing machine and has arranged for it to be delivered and fitted, and for the old machine to be taken away. We do not have a delivery date yet. We have asked your landlord for it and will let you know as soon as we hear.

So that we have the right picture, can you please confirm whether the new machine has now been delivered and fitted, or whether you are still waiting for it? When we spoke yesterday you said nothing had arrived yet.

Also, are you happy for us to pass your phone number to your landlord's delivery and installation company so they can arrange the delivery with you directly?

Kind regards
Northbridge Lettings

### To landlord (Nessa Orin) via email — 8 Brackenmere Walk – new washing machine delivery
Address: 8 Brackenmere Walk, Vellumford, ZZ1 1ZZ

Hello Nessa,

Thank you for arranging the new washing machine, along with its delivery, fitting and the removal of the old one. When we spoke to the tenant yesterday, Wednesday 24 September, the new machine had not yet arrived. Can you please let us know the delivery and installation date, and the name of the company doing it, so we can make sure the tenant is ready to give access? The tenant has asked for at least three hours' notice before anyone attends.

If the installers would like to contact the tenant directly, we have asked the tenant if they are happy for us to share their number and will pass it on once they agree.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 030 (call): no replacement had arrived and there was no packaging. Event 031 (email): "Yes, the job is completed", while also asking whether the planned machine change is still happening. → I have treated the job as not confirmed. The "completed" reply most likely answered an automated follow-up. I have asked the tenant to confirm the actual status before any close-out.
- Conflict: Event 023 gives the machine heights in cm (820/825); the tenant measured in mm (835 mm). → Clearly a unit slip; mm is correct. The landlord already ordered with this information.
- Conflict: Event 028 asked for a quote for removal and replacement; event 029, the same day, said the landlord had sorted it herself. → The later message governs. No quote requested.
- Missing: Delivery and installation date for the replacement machine
- Missing: Name of the landlord's delivery/installation company
- Missing: Tenant confirmation of whether the machine has been delivered and fitted
- Missing: Tenant consent to share their phone number with the installers

## Final state
on_hold (family: maintenance, urgency: P2)

## Summary
The landlord ordered a replacement washer-dryer and is arranging delivery and fitting herself. The tenant has sent mixed messages ("job completed", but nothing had arrived yesterday). I have emailed the tenant to clarify and the landlord for the delivery date, and the case is on hold until 29/09.
