# Case 027

## Next action
message_landlord → landlord (stage: Quote sent to landlord – waiting for landlord; confidence high; rules PM-AUTH-002, PM-WORKFLOW-001, PM-OCC-001)

## Rationale
Stage: quote sent to landlord (events 013–016). The landlord was emailed the total at 14:53 BST, and the call at 17:25 BST (event 017) got through to no one, so the 3-day landlord timer has only just started. Under PM-AUTH-002 nobody can be instructed while the £3,865.68 quote is with the landlord, and the earlier general agreement mentioned in events 002 and 004 does not cover this specific figure above the approval threshold (event 015). The forwarding email in event 014 gave only the total. So I have emailed Owen the quotation and the checkout report as attachments. The email lists every quoted item and says the quote has no per-item prices and does not state VAT. It also names the checkout items the quote leaves out: flooring and laminate, the curtain pole, curtains and bulbs, the worktop and water ingress, the other rusting radiators, the carpets, and the taped boiler casing, which needs a Gas Safe engineer. This way he is not approving without knowing about those defects. I have asked Iris to confirm VAT, give per-item prices and confirm the exclusions, and told her not to start any work. The case is on hold, Waiting for Landlord, until 18/09. The property is vacant (event 003), so no tenant messages.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Owen approved or rejected Alderwick quote NBL-027-Q1 (£3,865.68) and said how to handle the excluded items and the boiler inspection? If not, resend or SMS on 18/09. Also check that Iris has replied with VAT and per-item prices.","waiting_for":"landlord","until":"2025-09-18"}
- send_message#2 send_message [success] {"to_party":"landlord","to_ref":"Owen Vale (Landlord)","channel":"email","subject":"46 Fernwick Lane – move-out works quotation","body":"Address: 46 Fernwick Lane, Aldermead, ZZ1 1ZZ\n\nHi Owen,\n\nFurther to my earlier email, I tried to call you this afternoon. Please find attached Alderwick Property Works' quotation (ref NBL-027-Q1) for the move-out works, together with the checkout report. The …
- send_message#3 send_message [success] {"to_party":"contractor","to_ref":"Iris Bell (Contractor, Alderwick Property Works)","channel":"email","subject":"46 Fernwick Lane – quotation NBL-027-Q1","body":"Address: 46 Fernwick Lane, Aldermead, ZZ1 1ZZ\n\nHi Iris,\n\nThank you for your quotation of £3,865.68, which has gone to the landlord. Please can you confirm whether that figure includes VAT and send a price for each item, so the landlo…





## Not done and why
- Instruct Alderwick Property Works or book a visit: The quote is with the landlord and has not been approved (PM-AUTH-002).
- Book a Gas Safe engineer for the boiler casing: This is outside the quote and needs the landlord's decision. The property is vacant, so there is no immediate risk to anyone; it must be resolved before re-letting.
- Message any tenant: The property is vacant (event 003).
- Escalate: This is a routine quote loop with the landlord timer just started.

## Escalation
None required.

## Communications
- landlord via email: Quote and checkout report attached; quoted items listed; no VAT or per-item prices on the quote; excluded items named; boiler casing needs a Gas Safe engineer; asked to approve or reject the £3,865.68 and say how to handle the rest.
- contractor via email: Asked Iris to confirm VAT, give per-item prices and confirm the exclusions; told her not to start any work before approval.

## Messages sent (full text)
### To landlord (Owen Vale (Landlord)) via email — 46 Fernwick Lane – move-out works quotation
Address: 46 Fernwick Lane, Aldermead, ZZ1 1ZZ

Hi Owen,

Further to my earlier email, I tried to call you this afternoon. Please find attached Alderwick Property Works' quotation (ref NBL-027-Q1) for the move-out works, together with the checkout report. The quotation gives a single total of £3,865.68 for labour and materials. It does not break the cost down by item or say whether VAT is included, and I have asked the contractor to confirm both.

The quotation covers: repair the damaged newel post, address screw damage to a door frame, fill holes in the uPVC window frames, make good wall damage, fit a new door threshold and toilet-roll holder, renew the smoke detector, rehang the kitchen radiator, renew two extractor fans, renew the en-suite radiator, stain-block the water-damaged ceilings and reinstate decoration.

Some items in the checkout report are not in the quotation: the kitchen flooring and chipped living-room laminate, the curtain pole, curtains and bulbs, the warped kitchen worktop and the reported water ingress, the other rusting radiators, the carpet replacement, and the boiler casing that appears to be held with tape. The boiler casing will need a Gas Safe registered engineer to inspect it, not a handyman. The smoke detector and boiler need to be dealt with before the property is re-let.

Can you please advise if you approve for me to raise an order for these works at £3,865.68? Please also let me know how you would like us to handle the items not covered, including whether you would like us to arrange a Gas Safe engineer to inspect the boiler.

Kind regards
Northbridge Lettings

### To contractor (Iris Bell (Contractor, Alderwick Property Works)) via email — 46 Fernwick Lane – quotation NBL-027-Q1
Address: 46 Fernwick Lane, Aldermead, ZZ1 1ZZ

Hi Iris,

Thank you for your quotation of £3,865.68, which has gone to the landlord. Please can you confirm whether that figure includes VAT and send a price for each item, so the landlord can consider the items separately if needed. Please also confirm that the quotation excludes the kitchen flooring and living-room laminate, the curtain pole, curtains and bulbs, the kitchen worktop, the rusting radiators other than the en-suite one, and the carpets.

This is not an instruction. Please do not start any work until you hear from us with the landlord's approval.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Events 002 and 004 say the move-out works were agreed with the landlord, but event 015 says landlord approval is needed because this quote is above the threshold. → Treated as not approved: the specific figure needs the landlord's yes before anyone is instructed.
- Conflict: The quote omits several checkout items and gives no VAT basis or per-item prices. → I have raised this with both the landlord and the contractor; no figures beyond the stated total have been given to anyone.
- Missing: Landlord's decision on quote NBL-027-Q1
- Missing: Whether £3,865.68 includes VAT
- Missing: Per-item prices
- Missing: How the landlord wants the excluded items and the boiler casing inspection handled

## Final state
awaiting_approval (family: maintenance, urgency: P2)

## Summary
Owen has emailed details of Alderwick's £3,865.68 move-out quote, including the items it leaves out and the boiler casing that needs a Gas Safe engineer. Iris has been asked to confirm VAT and give per-item prices. Nothing is instructed; the case is on hold for Owen's decision until 18/09.
