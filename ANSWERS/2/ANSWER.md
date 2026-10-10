# Case 002

## Next action
request_landlord_approval → landlord (stage: Landlord gate: boiler lockout diagnostic; gas record awaited from provider; confidence medium; rules PM-AUTH-001, PM-AUTH-002, PM-DATA-002, PM-SAFE-001, PM-WORKFLOW-002)

## Rationale
Stage: landlord gate on the boiler lockout diagnostic, with Flintmere's signed gas safety record still outstanding. Rules: PM-AUTH-001 and PM-AUTH-002 (no diagnostic or spend without the landlord; events 005, 016 and 023), PM-DATA-002 (Flintmere must say what it is checking and when) and PM-SAFE-001 (no gas smell; the safety line is given as a reminder only). Evidence: events 002, 009, 012–015, 017, 019, 021, 022 and 024, and gas-portal-record.pdf. The annual check was done on 9 October 2025 and the engineer recorded it as satisfactory for the boiler and cooker. The signed record has not been issued because of Flintmere's quality desk query, and no date has been given. The portal screenshot shows "Customer document: Processing", so it is not the certificate, and I have told the tenant so. I have emailed Flintmere to chase the signed record, ask what installation detail it is checking and get a date, and asked for a price for a lockout diagnostic with no instruction to attend. I have answered the landlord's event 023 question about what is outstanding, given her the tenant's 28-day deadline (6 November 2025) and asked whether she wants us to arrange a Gas Safe engineer for the lockouts or will arrange her own. I have updated the tenant through the portal, with the 0800 111 999 line as a reminder. The case is held Waiting for Landlord until 21/10. It is P2, not the P0 the gas flag suggests: the tenant has said three times that there is no gas smell (events 003, 017, 022), the boiler restarts after a reset and the heating is working, and the check on 9 October was satisfactory.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, record_landlord_decision, send_message, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P0 handover recorded; on-call page NOT placed (voice not configured in this run)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Nessa decided on the lockout diagnostic (Gas Safe engineer from us or her own)? Has Flintmere sent the signed gas record, a date for it and a diagnostic price? If not, chase both on 21/10. The tenant must have the signed record by 06/11/2025.","waiting_for":"landlord","until":"2025-10-21"}
- record_landlord_decision#2 record_landlord_decision [success] {"landlord_id":"Nessa Wold","decision":"No separate boiler lockout diagnostic or further charge approved yet. Landlord wants to know what is still outstanding from Flintmere Gas Services before any more money is spent. Earlier instruction stands: do not authorise extra charges without her agreement (events 005, 016).","source":"Email from Nessa Wold (Landlord), event 023, 17 October 2025"}
- send_message#3 send_message [success] {"to_party":"contractor","to_ref":"Riva Morn (Service Coordinator, Flintmere Gas Services)","channel":"email","subject":"8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ – signed gas safety record (job ref NBL-48217)","body":"Address: 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ\n\nHi Riva,\n\nThank you for your update of 14 October. We still have no signed gas safety record from the visit on Thursday 9 October…
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Nessa Wold (Landlord)","channel":"email","subject":"8 Brindlewick Row – what is outstanding from Flintmere, and the boiler lockouts","body":"Address: 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ\n\nHello Nessa,\n\nThank you for your email. Here is what is still outstanding from Flintmere. Their engineer recorded the check on 9 October as satisfactory for the boiler and …
- send_message#5 send_message [success] {"to_party":"tenant","to_ref":"Iona Pell (Tenant)","channel":"portal","subject":"8 Brindlewick Row – gas safety paperwork and boiler","body":"Address: 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ\n\nHello Iona,\n\nThank you for your messages. The item the landlord found is the gas engineer's job record from the visit on 9 October. It is not the signed gas safety record. Flintmere's office is still proc…

### Recorded for a human (not executed by the system)
- escalate#auto escalate [recorded for human] {"tier":"P0","decision_required":"Review the proposed actions and the check failures; decide what to execute.","summary":"Automated checks failed: flag gas_or_co requires urgency P0, resolution says P2 (mark it a false positive with a reason if the pattern is wrong).","what_was_tried":"Automated checks failed: flag gas_or_co requires urgency P0, resolution says P2 (mark it a false positive with a …




## Not done and why
- Book or assign a lockout diagnostic: The landlord has not approved it (events 005, 016, 023), and the boiler restarts after a reset with the heating working and no gas smell, so there is no emergency authority.
- Send the portal screenshot to the tenant as the gas safety record: It shows the customer document as 'Processing'. It is a job record, not the signed record.
- Escalate to a human: The 28-day deadline for the tenant's copy (6 November) has not passed, and the landlord's question has been answered. If Flintmere gives no date by the next chase, or the installation query turns into a defect, escalate P1.
- Treat as P0 gas emergency: The gas_or_co flag is a false positive: the tenant has repeatedly said there is no gas smell. The emergency line was still given to the tenant as a precaution.

## Escalation
Tier P0. Decision required from a human: Review the proposed actions and the check failures; decide what to execute. Reason: Automated checks failed: flag gas_or_co requires urgency P0, resolution says P2 (mark it a false positive with a reason if the pattern is wrong).

Handover: The 9 October gas check was satisfactory, but Flintmere has not issued the signed record (quality desk query, no date). The tenant needs it by 6 November, and I have chased Flintmere for it and for a lockout diagnostic price. The landlord has the full picture and has been asked whether to send an engineer for the intermittent boiler lockouts (heating working, no gas smell). The case is held for her until 21/10.

## Communications
- Contractor (Riva Morn, Flintmere Gas Services) via email: Chase for the signed gas record, the installation detail being checked and an issue date, plus a price for a lockout diagnostic with no instruction to attend.
- Landlord (Nessa Wold) via email: What is outstanding from Flintmere, that the screenshot is not the certificate, the 6 November deadline for the tenant's copy, the further lockouts with access after 21 October, and whether she wants us to arrange a Gas Safe engineer or will arrange her own.
- Tenant (Iona Pell) via portal: The screenshot is the job record, not the signed record, which is being chased; lockouts passed to the landlord and we await her response; gas emergency line given as a precaution.

## Messages sent (full text)
### To contractor (Riva Morn (Service Coordinator, Flintmere Gas Services)) via email — 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ – signed gas safety record (job ref NBL-48217)
Address: 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ

Hi Riva,

Thank you for your update of 14 October. We still have no signed gas safety record from the visit on Thursday 9 October 2025 (job ref NBL-48217). Please can you tell us what installation detail your quality desk is checking, whether you need any information from us or the landlord to resolve it, and the date the signed record will be issued. The tenant must be given a copy, so we need it as soon as possible.

Separately, the tenant has reported more boiler lockouts since the visit, on 13 and 16 October. The boiler restarts after a reset. For the landlord to consider, please send us your price for a lockout diagnostic visit. This is not an instruction to attend and no work is approved. Please do not book anything until you hear from us.

Kind regards
Northbridge Lettings

### To landlord (Nessa Wold (Landlord)) via email — 8 Brindlewick Row – what is outstanding from Flintmere, and the boiler lockouts
Address: 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ

Hello Nessa,

Thank you for your email. Here is what is still outstanding from Flintmere. Their engineer recorded the check on 9 October as satisfactory for the boiler and cooker. However, the signed gas safety record has not been issued. Their quality desk has paused it while it checks an appliance installation detail against the information they hold for the address, and they have not given a date. The portal screenshot you sent shows the customer document as "Processing", so it is the job record, not the signed certificate. The previous record on file is dated 16 October 2024, so we need the signed record for the file. The tenant must also receive a copy within 28 days of the check, which means by Thursday 6 November 2025. I have chased Flintmere today for the record, the detail they are checking and a date.

The tenant has reported more boiler lockouts on 13 and 16 October. Each time the boiler restarted after a reset, and she has not noticed any gas smell. She can give access after 21 October. I have also asked Flintmere for a price for a lockout diagnostic, so you can decide with a figure in front of you. Nothing has been booked or approved. Can you please advise whether you would like us to arrange a Gas Safe engineer to diagnose the lockout once we have that price, or whether you would prefer to arrange it yourself?

Kind regards
Northbridge Lettings

### To tenant (Iona Pell (Tenant)) via portal — 8 Brindlewick Row – gas safety paperwork and boiler
Address: 8 Brindlewick Row, Vellum Quay, ZZ1 1ZZ

Hello Iona,

Thank you for your messages. The item the landlord found is the gas engineer's job record from the visit on 9 October. It is not the signed gas safety record. Flintmere's office is still processing that document. We have chased them today and will send you a copy as soon as we receive it.

Thank you for letting us know about the further lockouts and that you can give access after 21 October. We have passed this on to your landlord and we await her response on the next step. We will be in further contact as soon as possible.

As a general safety reminder, if you ever smell gas or think there may be a carbon monoxide problem, please call the National Gas Emergency line on 0800 111 999 straight away. Open the windows and do not use any electrical switches.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: The landlord's portal screenshot is labelled 'Gas Safety Record', but its customer document field says 'Processing', and Flintmere says the signed paperwork is paused (events 012, 019). → Treated as a job record only. The signed record is still outstanding and is being chased.
- Conflict: The engineer's entry is satisfactory, but the quality desk is reconciling an appliance installation detail (events 019, 021). → Flintmere has been asked to say what the detail is and whether we or the landlord need to provide anything.
- Conflict: The routing hint and gas flag suggest P0. The facts show no gas smell (events 003, 017, 022), the heating working after a reset, and a satisfactory check on 9 October. → Set to P2 on the facts. The gas emergency advice was still given to the tenant.
- Missing: Signed gas safety record from Flintmere and the date it will be issued
- Missing: What appliance installation detail Flintmere's quality desk is checking
- Missing: Price for a boiler lockout diagnostic
- Missing: Landlord's decision on the lockout diagnostic

## Final state
escalated (family: compliance, urgency: P0)

## Summary
The 9 October gas check was satisfactory, but Flintmere has not issued the signed record (quality desk query, no date). The tenant needs it by 6 November, and I have chased Flintmere for it and for a lockout diagnostic price. The landlord has the full picture and has been asked whether to send an engineer for the intermittent boiler lockouts (heating working, no gas smell). The case is held for her until 21/10.
