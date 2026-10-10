# Case 001

## Next action
message_landlord → landlord (stage: Quote loop - corrected quote requested from provider; confidence medium; rules PM-AUTH-002, PM-DATA-001, PM-SAFE-001, PM-WORKFLOW-001)

## Rationale
Stage: quote loop. The quote has not been approved and the landlord has asked for clarification (event 023). Under PM-AUTH-002 nothing can be ordered, and the landlord is only asked to approve once every line, price and VAT figure is on file and adds up. There is one quote from Hearthline: £2,370 + VAT £474 = £2,844 (event 016). Their breakdown at event 021 (materials £1,270 + labour £1,170 = £2,440 before VAT, plus a 10% commission and a 50% deposit with no basis given) does not match it, and the quote PDF names a different property. In order: (1) I have replied to Orin explaining there is one quote, setting out both sets of figures and the gap, and saying a corrected quote is coming and nothing is ordered. (2) I have asked Hearthline for a corrected, itemised quote with the right address, the commission explained, the deposit in pounds and a price for a temporary fix to stop the leak, as a request for prices only. (3) I have updated the tenant and asked her to report any spread of water or water near electrics. (4) The case is on hold for the contractor until 25/09. When the corrected quote arrives, it goes straight to Orin with every line and VAT shown, followed by a hold for the landlord. Urgency is P1 because the leak has been active and unrepaired since 4 September and the wall damage is getting worse (PM-SAFE-001). I have escalated P1 so the duty manager can decide whether to press for an interim fix and can check the commission. Evidence: events 004, 005, 016, 017, 018, 021, 022, 023.

## Execution status (generated from execution results, not from the agent's text)
- Executed: request_quote, set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- request_quote#1 request_quote [success] {"contractor_ref":"Ewan Rook, Hearthline Plumbing & Bath","property":"4 Thistlewick Rise, Larkcombe, ZZ1 1ZZ","scope":"Please send one corrected, itemised quotation for the bathroom works you inspected at 4 Thistlewick Rise, Larkcombe, ZZ1 1ZZ. The quotation document we have (ref NBL-001-Q1) shows a different property address, so please reissue it with this address. The quotation shows a subtotal …
- set_hold#2 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Hearthline sent the corrected itemised quote (correct address, reconciled total, commission, deposit in £) and the interim leak-fix price? If not, chase on 25/09. Once received, send to Orin Vale for approval.","waiting_for":"contractor","until":"2025-09-25"}
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Orin Vale","channel":"email","subject":"4 Thistlewick Rise - shower leak quotation","body":"Address: 4 Thistlewick Rise, Larkcombe, ZZ1 1ZZ\n\nHi Orin,\n\nSorry for the confusion. There is one quotation, from Hearthline Plumbing & Bath, following their inspection of the leak behind the shower. The scope is to remove the existing shower screen, bath taps and shower …
- send_message#5 send_message [success] {"to_party":"tenant","to_ref":"Nessa Quill","channel":"email","subject":"4 Thistlewick Rise - shower leak update","body":"Address: 4 Thistlewick Rise, Larkcombe, ZZ1 1ZZ\n\nHello Nessa,\n\nThank you for your patience. After the inspection, the contractor sent a quotation for the repair. Your landlord is reviewing it and has asked for some further detail, which we have requested from the contractor…

### Recorded for a human (not executed by the system)
- escalate#3 escalate [recorded for human] {"tier":"P1","decision_required":"Should the landlord be pressed for a decision on an interim make-safe of the active leak, given the damp hazard, if the corrected quote is delayed? Also, the \"Northbridge commission at 10%\" Hearthline mentioned needs checking against agency terms before figures go to the landlord.","summary":"Active shower-pipe leak with damp coming through the bathroom wall at …




## Not done and why
- Asking the landlord to approve £2,844 or attaching the quote PDF: The figures do not reconcile, and the PDF shows a different property address (8 Wrenfold Mews). The landlord approves only a corrected, consistent quote.
- Instructing Hearthline or paying any deposit: There is no landlord approval of the repair work (PM-AUTH-002). Event 005 approved the inspection and quote only.
- Querying the 10% Northbridge commission with the landlord: This needs checking against agency terms first, so it is in the P1 handover.

## Escalation
Tier P1. Decision required from a human: Whether to press the landlord for an interim make-safe if the corrected quote is delayed, and checking the 10% commission against agency terms. Reason: The leak and damp have been active and unrepaired for 19 days. The quote does not reconcile, and the contractor has mentioned an agency commission. Deadline: 2025-09-25.

Handover: The case is on hold for Hearthline until 25/09. When the corrected quote arrives, send it to Orin with every line and VAT shown.

## Communications
- landlord via email: Explained there is one Hearthline quote of £2,370 + VAT = £2,844, set out the £2,440 breakdown that does not match it and the commission and deposit questions, said a corrected quote and an interim fix price have been requested, and confirmed nothing is ordered.
- contractor via email: Asked for a corrected itemised quote with the right address, reconciled figures, the commission explained, the deposit in pounds and an interim leak-fix price. Prices only; no approval to proceed.
- tenant via email: Update: the quote is with the landlord, more detail and a temporary fix have been requested, and she should report any spread of water or water near electrics.

## Messages sent (full text)
### To landlord (Orin Vale) via email — 4 Thistlewick Rise - shower leak quotation
Address: 4 Thistlewick Rise, Larkcombe, ZZ1 1ZZ

Hi Orin,

Sorry for the confusion. There is one quotation, from Hearthline Plumbing & Bath, following their inspection of the leak behind the shower. The scope is to remove the existing shower screen, bath taps and shower valve, install a wall-and-riser cladding system with chrome trims, fit new bath taps and a new shower valve, and refit the existing screen. Their quotation of Thursday 18 September is £2,370.00 + VAT (£474.00), £2,844.00 in total.

When we asked for an itemised breakdown, Hearthline replied with materials £1,270 and labour £1,170 (two people, half a day each), plus VAT at 20%, and said a 50% deposit would be needed to proceed. Those two lines add up to £2,440 before VAT, which does not match the £2,370 on the quotation, and they did not give a revised total or say how the deposit would be worked out. They also mentioned a 10% commission without saying how it applies. I have gone back to Hearthline today and asked for one corrected, itemised quotation with the final total including VAT and the deposit amount in pounds. I have also asked them to price a temporary fix to stop the leak while you decide, because the tenant reports it is still leaking and the wall is getting worse.

I will send you the corrected quotation as soon as I have it. Nothing has been approved or ordered in the meantime.

Kind regards
Northbridge Lettings

### To tenant (Nessa Quill) via email — 4 Thistlewick Rise - shower leak update
Address: 4 Thistlewick Rise, Larkcombe, ZZ1 1ZZ

Hello Nessa,

Thank you for your patience. After the inspection, the contractor sent a quotation for the repair. Your landlord is reviewing it and has asked for some further detail, which we have requested from the contractor. We have also asked the contractor about a temporary fix to stop the leak in the meantime. We will be in further contact as soon as possible.

If the leak gets worse, or you see water spreading outside the bathroom or near any electrics, please let us know straight away.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: The quote shows a subtotal of £2,370 (event 016 and the PDF). The breakdown at event 021 gives £1,270 + £1,170 = £2,440, plus an unexplained 10% commission and a 50% deposit with no basis stated. → Neither figure is treated as final. I have asked the contractor for a single reconciled quote and explained both sets of figures to the landlord.
- Conflict: The quotation PDF names the property as 8 Wrenfold Mews, Brindlewick. The case header is 4 Thistlewick Rise, Larkcombe. → The case header address is used throughout. I have asked the contractor to reissue the quote with the correct address. The mismatch is not mentioned in any message to the tenant.
- Conflict: The case state reads event 004 as an approval, but Orin only asked to see a quote, and event 005 authorised the inspection and quote, not the works. → There is no approval of the works on file.
- Missing: A reconciled itemised quote and final total including VAT
- Missing: How the 10% commission applies
- Missing: The 50% deposit amount and what it is calculated on
- Missing: Whether an interim fix to stop the leak is possible, and its cost
- Missing: How far the moisture has spread behind the wall

## Final state
escalated (family: maintenance, urgency: P1)

## Summary
The shower leak with damp at 4 Thistlewick Rise has been active for 19 days. The landlord asked "which quote?" because Hearthline's £2,844 quote does not match their £2,440 + VAT breakdown, and their commission and deposit terms are unclear. I have explained this to the landlord and asked Hearthline for a corrected itemised quote and an interim fix price, and the case is on hold until 25/09, with a P1 handover covering the damp risk and the commission query.
