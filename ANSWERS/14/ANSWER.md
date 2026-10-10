# Case 014

## Next action
escalate_safety → human (stage: Urgent repair: diagnostic instructed; interim heating needs authorising; confidence medium; rules PM-SAFE-001, PM-AUTH-001, PM-AUTH-003, PM-PRIV-001, PM-WORKFLOW-003)

## Rationale
Stage: urgent repair, provider selection, with the cancellation slot due to lapse at 17:30. The heating has failed completely in January. The living room was at 10°C at 16:25 and falling (event 018), and the tenant has a mobility impairment and no safe heater (events 003, 008, 012). In January, London time is the same as UTC. The landlord confirmed his standing £250 urgent-repair authority covers the £168 inc VAT diagnostic (events 007, 014), so I recorded that decision and instructed Brackenridge Heat Services to book the cancellation slot on Wednesday 15 January 2025, 09:00–11:00, before the 17:30 cut-off (event 019). The instruction covers the diagnostic only, and any parts or further work must be quoted first. I emailed Daniel Hart the access conditions: phone Leah directly at least 30 minutes before arriving, call from outside, and allow her extra time to answer the door. No medical details were shared (event 004). I emailed Leah with the slot, asked her to confirm access, told her to keep the faulty heater off and asked whether her niece's entrance is step-free, and sent an SMS pointing her to the email. I emailed the landlord to say the diagnostic has been instructed and asked him to decide on interim heating or transport, which his repair authority does not cover. Because no one holds authority for those costs and a vulnerable tenant faces a cold night, I escalated P0 to the duty manager. The case is on hold waiting for Brackenridge to confirm the booking. Rules: PM-SAFE-001, PM-AUTH-001 satisfied by event 014, PM-AUTH-003, PM-PRIV-001, PM-WORKFLOW-003.

## Execution status (generated from execution results, not from the agent's text)
- Executed: record_landlord_decision, book_contractor (Brackenridge Heat Services), set_hold, send_message, send_message, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P0 handover recorded; on-call page NOT placed (voice not configured in this run)

## Actions taken
- record_landlord_decision#1 record_landlord_decision [success] {"landlord_id":"Owen Pike","decision":"Standing urgent-repair authority of £250 per incident (diagnostic, labour and parts inclusive) remains in place. For this heating failure treated as an urgent repair, the agency may authorise the £168 inc VAT diagnostic call-out without further consent; any later work must stay within the £250 incident limit or be referred for consent. Temporary heaters, tran…
- book_contractor#2 book_contractor [success] {"contractor_id":"Brackenridge Heat Services","property_id":"7 Mallowmere Walk, Larkfen, ZZ1 1ZZ","slot":"2025-01-15 09:00-11:00 (Europe/London)","scope":"Urgent heating diagnostic visit: radiators cold, heating controller unresponsive, boiler display blank, hot water still working. Diagnostic call-out only at the fixed £168 inc VAT; no repair work or parts included. Any remedial work or parts to …
- set_hold#4 set_hold [success] {"reason":"Reason: Waiting for Provider. Comment: Has Brackenridge confirmed the 15/01/2025 09:00–11:00 booking and has Leah confirmed access? Check results after the visit; any quote for parts goes to the landlord. Landlord answer on interim heating/transport also awaited.","waiting_for":"contractor","until":"2025-01-15T12:00:00Z"}
- send_message#5 send_message [success] {"to_party":"contractor","to_ref":"Daniel Hart, Brackenridge Heat Services","channel":"email","subject":"7 Mallowmere Walk, Larkfen, ZZ1 1ZZ – please book the 15 January cancellation slot","body":"Address: 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ\n\nHi Daniel,\nThank you for your call. Please book the cancellation appointment on Wednesday 15 January 2025, 09:00 to 11:00, for the heating diagnostic at t…
- send_message#6 send_message [success] {"to_party":"tenant","to_ref":"Leah Venn","channel":"portal","subject":"Heating repair – appointment Wednesday 15 January","body":"Address: 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ\n\nHello Leah,\nThank you for your update and the temperature reading. Brackenridge Heat Services offered a cancellation appointment on Wednesday 15 January 2025 between 09:00 and 11:00, and we have instructed them to book i…
- send_message#7 send_message [success] {"to_party":"tenant","to_ref":"Leah Venn","channel":"sms","body":"Hello, this is Northbridge Lettings! Please check your email regarding the property at 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ."}
- send_message#8 send_message [success] {"to_party":"landlord","to_ref":"Owen Pike","channel":"email","subject":"7 Mallowmere Walk – heating diagnostic instructed; interim heating decision needed","body":"Address: 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ\n\nHi Owen,\nThank you for clarifying your urgent-repair authority. We have treated the heating failure as an urgent repair and instructed Brackenridge Heat Services for the diagnostic call-…

### Recorded for a human (not executed by the system)
- escalate#3 escalate [recorded for human] {"tier":"P0","decision_required":"Authorise or arrange interim heating (approved-supplier heater delivery) or transport for the tenant tonight; no spending authority exists for temporary equipment, transport or accommodation and the landlord is travelling and may not reply promptly.","summary":"Total heating failure at 7 Mallowmere Walk; living room 10°C at 16:25 and falling; tenant Leah Venn has …




## Not done and why
- Arranging or paying for a temporary heater, transport or accommodation: No spending authority for these (events 007, 017). I asked the landlord and escalated to the duty manager.
- Approving parts or remedial work: The instruction covers the diagnostic only. Any further work is quoted and kept within the £250 limit or referred to the landlord (event 014).
- Sharing the tenant's medical details with the contractor: The tenant asked us not to (event 004). The contractor was told only that she needs extra time to answer the door.
- Treating the niece Erin Vale as a contact for access: She is not authorised to approve work or give access (event 004).
- Sending a gas emergency instruction as the main message: No gas smell was reported (event 003). The tenant message includes a precautionary line with 0800 111 999.

## Escalation
Tier P0. Decision required from a human: Authorise or arrange a temporary heater delivery or transport for the tenant tonight; no authority exists for this and the landlord may not reply promptly. Reason: Vulnerable tenant, no heating in January, indoor temperature 10°C and falling. Deadline: 2025-01-14T19:00:00Z.

Handover: Duty manager Priya Noll offered to check approved heater suppliers and contact the landlord again (event 017)

## Communications
- contractor via email: Book the 15/01 09:00–11:00 slot, diagnostic £168 inc VAT only, quote before any further work, phone Leah directly with 30 minutes' notice and call from outside
- tenant via portal: 15 January slot instructed, please confirm access, keep the faulty heater off, interim options still being worked on, is the niece's entrance step-free, gas emergency number as a precaution
- tenant via sms: Pointer to check email
- landlord via email: Diagnostic instructed under urgent authority; please decide on interim heater or transport at his cost

## Messages sent (full text)
### To contractor (Daniel Hart, Brackenridge Heat Services) via email — 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ – please book the 15 January cancellation slot
Address: 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ

Hi Daniel,
Thank you for your call. Please book the cancellation appointment on Wednesday 15 January 2025, 09:00 to 11:00, for the heating diagnostic at the fixed £168 including VAT, under the landlord's urgent-repair authority. This covers the diagnostic only; if any parts or remedial work are needed, please send us a quote with photos and do not proceed until you have our approval.
The tenant is Leah Venn and her contact details are on the job. Please phone her directly at least 30 minutes before you arrive and call from outside rather than arriving unannounced, as she needs extra time to answer the door. We do not hold a key, so access is only with Leah. Symptoms reported: radiators cold, heating controller unresponsive, boiler display blank, hot water still working, no gas smell or visible leak.
Please reply to confirm the booking is in place.
Kind regards
Northbridge Lettings

### To tenant (Leah Venn) via portal — Heating repair – appointment Wednesday 15 January
Address: 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ

Hello Leah,
Thank you for your update and the temperature reading. Brackenridge Heat Services offered a cancellation appointment on Wednesday 15 January 2025 between 09:00 and 11:00, and we have instructed them to book it for the heating engineer to diagnose the fault. We will confirm as soon as they have confirmed the booking back to us. The engineer has been asked to phone you directly at least 30 minutes before arriving and to call from outside, and that you need extra time to answer the door. Please reply to confirm you can give access in that window.
Please keep the plug-in heater out of use, as the engineer advised. We are still working on the question of a heater delivery or transport to your niece's home and will update you as soon as we have an answer; if you can let us know whether her entrance is step-free, that will help. If at any time you smell gas, please call the National Gas Emergency line on 0800 111 999 straight away.
Kind regards
Northbridge Lettings

### To tenant (Leah Venn) via sms
Hello, this is Northbridge Lettings! Please check your email regarding the property at 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ.

### To landlord (Owen Pike) via email — 7 Mallowmere Walk – heating diagnostic instructed; interim heating decision needed
Address: 7 Mallowmere Walk, Larkfen, ZZ1 1ZZ

Hi Owen,
Thank you for clarifying your urgent-repair authority. We have treated the heating failure as an urgent repair and instructed Brackenridge Heat Services for the diagnostic call-out at £168 including VAT, in a cancellation slot on Wednesday 15 January 2025, 09:00 to 11:00. Any parts or further work will be quoted to us and, if it would take the incident above £250, referred to you for consent.
The living room was at 10°C at 16:25 today and the tenant has no safe alternative heating; the small heater she had is overheating and the engineer advised it should not be used. Temporary heating, transport or accommodation are outside your repair authority, so can you please advise whether you are happy for us to arrange delivery of a temporary heater, or transport for the tenant to stay with family tonight, and at your cost?
Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Landlord asked for a quote before non-emergency spending (event 010), then said his £250 urgent authority still stands and covers the £168 diagnostic (event 014). → Event 014 clarifies event 010. I treated this as an urgent repair and used the authority for the diagnostic only.
- Conflict: Standard slot 17 January (event 006) clashes with the tenant's hospital appointment (event 013); the 15 January cancellation slot suits her if she gets 30 minutes' notice. → Instructed the 15 January slot and asked the tenant to confirm access.
- Missing: Brackenridge's confirmation that the 15 January booking is in place
- Missing: Tenant's confirmation of access for 15 January
- Missing: Whether the niece's entrance is step-free
- Missing: Landlord's decision on paying for an interim heater or transport
- Missing: Cause of the fault and cost of any repair (after the diagnostic)

## Final state
scheduled (family: maintenance, urgency: P0)

## Summary
I asked Brackenridge to book the heating diagnostic for Wednesday 15 January, 09:00–11:00 (£168 inc VAT, within the landlord's £250 urgent authority); the tenant and landlord have been emailed. A duty manager needs to decide tonight on a heater delivery or transport for Leah, who has reduced mobility and no heating (10°C and falling); there is no authority for these costs and the landlord has been asked.
