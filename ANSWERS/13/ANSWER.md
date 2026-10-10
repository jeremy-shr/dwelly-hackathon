# Case 013

## Next action
hold_waiting_for_provider → provider (stage: Waiting for work results / invoice; confidence high; rules PM-DOC-001, PM-CLOSE-001, PM-AUTH-002)

## Rationale
Stage: results/invoice check (post-visit documents). The landlord approved the glazing quote at £180 total in event 010, and event 011 restated it as £150 + VAT. Those two figures agree (£150 + 20% VAT = £180), so there is no real discrepancy. Clearfirth Glazing's invoice NBL-013-INV-09 (event 023) describes supplying and fitting 1 pane of glass but shows no amount. The history does not show a visit date, an appointment confirmation or a completion report: the last contractor update (event 021, 2 September) said the glass had not arrived. Event 022 moved the case to post-visit with no evidence of a visit. Under PM-DOC-001 I cannot forward the invoice to the landlord or close the job until the amount and the completion are confirmed. I have emailed the contractor, with the invoice attached, asking for a revised invoice showing net, VAT and total against the approved £150 + VAT, and for the fitting date and anything seen at the window. I have also asked the tenant to confirm the fit and whether the misting, the water at the frame or any damp continues. The case is on hold, Waiting for Provider, until 12/09/2025. Once both answers are in hand and the invoice matches £180, I will send the landlord the completion email with the invoice attached and run the final checks. If the invoice comes in above £180, it goes back to the landlord for approval first. If the tenant reports continuing water or damp, the landlord will be asked whether to investigate it.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Clearfirth Glazing sent a revised invoice with the amount (approved £150 + VAT, £180 total) and confirmed the fitting date? Has the tenant confirmed the fit and whether water/damp persists? If not, chase on 12/09/2025.","waiting_for":"contractor","until":"2025-09-12"}
- send_message#2 send_message [success] {"to_party":"contractor","to_ref":"Sella Vane (Clearfirth Glazing)","channel":"email","subject":"8 Brackenmere Walk – kitchen glazing invoice NBL-013-INV-09","body":"Address: 8 Brackenmere Walk, Vellumbrook, ZZ1 1ZZ\n\nHi Sella,\n\nThank you for your invoice NBL-013-INV-09 for supplying and fitting 1 pane of glass to the kitchen glazing, copy attached. The copy we have does not show an amount. Can…
- send_message#3 send_message [success] {"to_party":"tenant","to_ref":"Elowen Marr","channel":"email","subject":"8 Brackenmere Walk – kitchen glazing","body":"Address: 8 Brackenmere Walk, Vellumbrook, ZZ1 1ZZ\n\nHi Elowen,\n\nWe have received paperwork from Clearfirth Glazing for the new glass in your kitchen window. Can you please confirm whether the glass has been fitted, and if so on what date? Can you also let us know whether the mi…





## Not done and why
- Send the invoice to the landlord or process payment: The invoice shows no amount and completion is not evidenced; the landlord's approval was conditional on £180 total.
- Close the case: No completion evidence and no priced invoice (PM-DOC-001, PM-CLOSE-001).
- Escalate to a human: This is routine document chasing; there is no dispute or safety defect yet.
- Arrange a damp investigation: No damp or mould is confirmed; the tenant has been asked first, and any investigation needs the landlord's decision.

## Escalation
None required.

## Communications
- contractor (Sella Vane, Clearfirth Glazing) via email: Invoice attached; asked for a revised invoice with net, VAT and total against the approved £150 + VAT, the fitting date, any observations at the window, and photos.
- tenant (Elowen Marr) via email: Asked her to confirm whether and when the glass was fitted, whether the misting has cleared, and whether water or damp persists.

## Messages sent (full text)
### To contractor (Sella Vane (Clearfirth Glazing)) via email — 8 Brackenmere Walk – kitchen glazing invoice NBL-013-INV-09
Address: 8 Brackenmere Walk, Vellumbrook, ZZ1 1ZZ

Hi Sella,

Thank you for your invoice NBL-013-INV-09 for supplying and fitting 1 pane of glass to the kitchen glazing, copy attached. The copy we have does not show an amount. Can you please send us a revised invoice showing the net amount, the VAT and the total? The approved price for this job was £150 + VAT, £180 in total.

Can you also please confirm the date the glass was fitted, and let us know if you noticed anything at the window during the visit, such as water around the frame or damp, so we can pass it on to the landlord. Before and after photos would be helpful if you have them.

Kind regards
Northbridge Lettings

### To tenant (Elowen Marr) via email — 8 Brackenmere Walk – kitchen glazing
Address: 8 Brackenmere Walk, Vellumbrook, ZZ1 1ZZ

Hi Elowen,

We have received paperwork from Clearfirth Glazing for the new glass in your kitchen window. Can you please confirm whether the glass has been fitted, and if so on what date? Can you also let us know whether the misting has cleared and whether water is still gathering around the frame, or if you have noticed any damp or mould in the kitchen, so we can update your landlord.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 010 has the landlord happy at '£180 total'; events 009 and 011 say £150 plus VAT. → Consistent: £150 + 20% VAT = £180. The approval stands at £180 total; any invoice above that needs re-approval.
- Conflict: Event 022 moved the case to post-visit and event 023 has an invoice for fitting, but the last contractor contact (event 021) said the glass had not arrived, and no visit is recorded. → The history does not show a visit. I have asked the contractor and the tenant to confirm the fitting date before the job is treated as complete.
- Missing: Invoice amount (net, VAT, total)
- Missing: Date the glass was fitted / visit evidence
- Missing: Tenant confirmation that the fault is fixed and whether water or damp persists
- Missing: Job id (not shown in the case)

## Final state
on_hold (family: maintenance, urgency: P2)

## Summary
Clearfirth's invoice for the kitchen glass has no amount on it, and nothing in the file shows the glass was actually fitted (the glass was still on order on 2 September). I have asked the contractor for a priced invoice (approved £150 + VAT, £180 total) and the fitting date, asked the tenant to confirm the fit and any continuing damp, and held the case until 12/09.
