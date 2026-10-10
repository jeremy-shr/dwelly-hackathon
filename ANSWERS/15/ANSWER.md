# Case 015

## Next action
request_clarification → landlord (stage: Quote loop - waiting for landlord to clarify approval; confidence medium; rules PM-AUTH-001, PM-AUTH-003, PM-DATA-002, PM-AUTH-002, PM-OCC-001)

## Rationale
Stage: quote loop on an agency-raised job for post-tenancy preparation of a vacant property. The landlord approval on file is conditional and unclear. On events 008 and 010 Nessa approved the £665 Brindlewick quote only if the cost is recovered from the bond. The deposit held is £650 and the claim is still being prepared (event 011), so nobody can guarantee recovery. Her later "approved quote" (event 016) does not say which quote it covers, and a separate maintenance quote was also with her (event 015). Under PM-AUTH-001, PM-AUTH-003 and PM-DATA-002 I have not treated this as clear approval and have not instructed the contractor. I emailed the landlord to ask which quote she approved and whether the work can go ahead without a guaranteed bond recovery. The email lists every quoted line, attaches the quote, and says VAT and the disturbed soil are not covered. I did not promise that the cost will come from the deposit. I emailed Brindlewick to keep the hold in place (event 021), send dates from 30/09, confirm whether the price includes VAT and price the soil work separately with no commitment. The case is on hold Waiting for Landlord until 30/09, which matches the three-working-day wait in event 021. I escalated P1 because the move-in on 28 September is at risk and the move-in decision is not mine to make. Next steps in order: the landlord replies. If she gives a clear yes, I send Brindlewick the go-ahead once the separate maintenance is done and hold Waiting for Provider. If there is no reply by 30/09, I chase her.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Nessa confirmed which quote \"approved quote\" (event 016) meant and that the £665 work can go ahead without a guaranteed bond recovery? Has the separate maintenance been completed (event 021 wait ends 30/09)? Has Brindlewick sent dates, VAT position and the soil price? If not, chase on 30/09.","waiting_for":"landlord","until":"2025-09-30"}
- send_message#3 send_message [success] {"to_party":"landlord","to_ref":"Nessa Quill","channel":"email","subject":"18 Thistlevaunt Lane - post-tenancy works quote","body":"Address: 18 Thistlevaunt Lane, Orvelune, ZZ1 1ZZ\n\nHello Nessa,\n\nThank you for your update of Wednesday 17 September saying \"approved quote\". So that we instruct the right work, please can you confirm which quote you approved: the Brindlewick Turnover Services po…
- send_message#4 send_message [success] {"to_party":"contractor","to_ref":"Elian Wren (Brindlewick Turnover Services)","channel":"email","subject":"18 Thistlevaunt Lane - post-tenancy works","body":"Address: 18 Thistlevaunt Lane, Orvelune, ZZ1 1ZZ\n\nHi Elian,\n\nThank you for your patience. Please keep the post-tenancy work on hold for now and do not book or attend until we confirm. In the meantime, please can you send us the dates you…

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"Decide whether the prospective tenant's move-in on Sunday 28 September 2025 can still go ahead. The post-tenancy sanitation is not booked, the separate major maintenance has no recorded schedule or completion date, and event 021 says to wait three more working days (to 30/09).","summary":"18 Thistlevaunt Lane is vacant. Brindlewick quoted £665 for the sanitation a…




## Not done and why
- Give Brindlewick the go-ahead or book a visit: The approval depends on a bond recovery that cannot be guaranteed and does not clearly name this quote. Event 021 also says to wait until the separate maintenance is complete.
- Tell the landlord the cost will come out of the deposit: The deposit scheme decides deductions, and £665 is more than the £650 deposit. Saying otherwise would commit the landlord to a position the agency cannot guarantee.
- Email the former or prospective tenants: The property is vacant and this job does not need them. The move-in decision is with a human.
- Instruct the disturbed-soil work: It is outside the quoted scope. I asked for a price only, for the landlord to consider.

## Escalation
Tier P1. Decision required from a human: Whether the 28 September move-in stands, given the sanitation is unbooked and the separate maintenance is not scheduled. Reason: The move-in date is at risk and the landlord's approval depends on a deposit outcome that cannot be guaranteed. Deadline: 2025-09-26T17:00:00+01:00.

Handover: Landlord and contractor emailed. Case on hold Waiting for Landlord until 30/09.

## Communications
- landlord via email: Asks which quote 'approved quote' meant and whether the £665 work can go ahead without guaranteed bond recovery from the £650 deposit. Lists the quoted lines, notes that VAT and the disturbed soil are not covered, and attaches the quote.
- contractor via email: Keep the work on hold and do not book. Send dates from 30/09, confirm VAT on the £665, and price the disturbed-soil work separately as a price only, not an instruction.

## Messages sent (full text)
### To landlord (Nessa Quill) via email — 18 Thistlevaunt Lane - post-tenancy works quote
Address: 18 Thistlevaunt Lane, Orvelune, ZZ1 1ZZ

Hello Nessa,

Thank you for your update of Wednesday 17 September saying "approved quote". So that we instruct the right work, please can you confirm which quote you approved: the Brindlewick Turnover Services post-tenancy quote of £665.00, or the quote for the separate maintenance works?

Please find attached the Brindlewick quote (ref NBL-015-Q1, £665.00). It covers degreasing the oven, hob and extractor; shampooing the carpets in bedroom one, the stairs and landings; removing the rubbish; treating kitchen grease and bathroom limescale; general sanitation to the remaining areas; and weeding, cutting the grass and tidying the rear garden. The quote does not say whether VAT is included, and it does not cover making good the soil disturbed by digging in the rear garden. I have asked Brindlewick about both points.

On your condition about the bond: the deposit held is £650 and we are preparing a claim for the full amount through the deposit process. The outcome of that claim is decided through the deposit scheme, so we cannot guarantee how much will be recovered, and the quote is higher than the deposit. Please can you confirm whether you are happy for the post-tenancy work to go ahead on that basis.

Brindlewick will not book anything until we hear from you.

Kind regards
Northbridge Lettings

### To contractor (Elian Wren (Brindlewick Turnover Services)) via email — 18 Thistlevaunt Lane - post-tenancy works
Address: 18 Thistlevaunt Lane, Orvelune, ZZ1 1ZZ

Hi Elian,

Thank you for your patience. Please keep the post-tenancy work on hold for now and do not book or attend until we confirm. In the meantime, please can you send us the dates you could attend from Tuesday 30 September, so we can move quickly once we have the go-ahead.

Please can you also confirm whether your quote of £665.00 (ref NBL-015-Q1) includes VAT. Separately, the inspection noted soil in the rear garden disturbed by digging, which your quote does not mention. Please send us a price for levelling and making good that area, for the landlord to consider. This is not an instruction to carry out that work.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Event 008 gives a conditional approval tied to bond recovery. Event 011 shows the costs are higher than the £650 deposit and the claim is still pending. → Not treated as clear approval. I asked the landlord to confirm whether the work can go ahead without guaranteed recovery.
- Conflict: Event 016 says 'approved quote' without naming the quote, while both the £665 quote and the separate maintenance quote were with the landlord. → I asked the landlord which quote she meant. I have not acted on it for the £665 work.
- Conflict: Event 017 asked the contractor to propose dates, but events 018 to 021 hold the work until the separate maintenance is done. → I told the contractor the hold stays in place and asked for dates from 30/09 only.
- Conflict: The case state lists a £650 'quote' at event 011. → £650 is the deposit held, not a quote. The only quote on file is £665.
- Missing: Which quote the landlord's 'approved quote' (event 016) refers to
- Missing: Whether the landlord accepts the £665 work without guaranteed bond recovery
- Missing: Whether the £665 includes VAT
- Missing: A price for making good the disturbed soil
- Missing: Schedule and completion date for the separate major maintenance
- Missing: Whether the 28 September move-in still stands
- Missing: Whether Brindlewick hold an office key set (the history only says keys could be collected)

## Final state
awaiting_approval (family: maintenance, urgency: P2)

## Summary
The £665 Brindlewick work is not instructed. The landlord's approval depends on recovering the cost from a £650 deposit claim, and her "approved quote" does not say which quote she meant, so I have asked her to confirm both points and asked Brindlewick for dates, the VAT position and a price for the disturbed soil. The move-in on Sunday 28 September is at risk because the sanitation is unbooked and the separate maintenance is not scheduled, so a person needs to decide whether that date stands.
