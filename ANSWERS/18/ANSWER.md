# Case 018

## Next action
message_landlord → landlord (stage: Landlord's own contractor – proofing works stalled, chasing landlord; confidence medium; rules PM-AUTH-004, PM-WORKFLOW-002, PM-SAFE-001, PM-AUTH-005)

## Rationale
Stage: the landlord is handling the job with his own contractor (events 006–008), but the job has stalled. Rules: PM-AUTH-004, PM-WORKFLOW-002, PM-SAFE-001. Evidence: events 010, 014, 017 and 018. Pest treatment finished on 07/09. The proofing contractor expected on 08/09 did not attend and has not been rebooked, so the openings by the sink and drain are still unsealed. The landlord has not written since 18/08. Rats inside the kitchen are a health hazard, so this is P1, not routine. I did not send our own contractor because the landlord chose his own route, and sending a second contractor or dispatching without his approval is not allowed. I emailed the landlord asking who is doing the proofing, what they will do, when they will attend, and for the pest report. I also offered our contractor to inspect and quote if he prefers. I sent him an SMS pointer, updated the tenant by email with an SMS pointer, and held the case for the landlord until 12/09. I escalated P1 so a person can phone the landlord, because he asked for calls, and the tenant, who prefers phone. Next steps in order: the landlord replies or is phoned on 12/09. If he names a contractor and a date, tell the tenant and hold until the visit, then close without payment once he confirms it is done. If he wants our contractor, assign one under his recorded approval.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, send_message, send_message, send_message, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#1 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Gareth confirmed who is sealing the kitchen openings and the date? If not, phone him on 07700 900184 on 12/09/2025 and update the tenant by phone.","waiting_for":"landlord","until":"2025-09-12T10:00:00Z"}
- send_message#3 send_message [success] {"to_party":"landlord","to_ref":"Gareth Vale (Landlord)","channel":"email","subject":"Rat activity in the kitchen – proofing works update","body":"Address: 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ\n\nHi Gareth,\n\nI am following up on the rat activity in the kitchen at the above property. Elise has told us that pest control attended on Sunday 7 September and removed their equipment. She understo…
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"07700 900184","channel":"sms","body":"Hello, this is Northbridge Lettings! Please check your email for 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ."}
- send_message#5 send_message [success] {"to_party":"tenant","to_ref":"Elise Rowan (Tenant)","channel":"email","subject":"Kitchen openings – update","body":"Address: 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ\n\nHello Elise,\n\nThank you for letting us know that nobody attended on Monday 8 September to deal with the openings. We have chased your landlord today and asked him who will carry out the work and when. We will be in further con…
- send_message#6 send_message [success] {"to_party":"tenant","to_ref":"Elise Rowan (Tenant)","channel":"sms","body":"Hello, this is Northbridge Lettings! Please check your email regarding the property at 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ."}

### Recorded for a human (not executed by the system)
- escalate#2 escalate [recorded for human] {"tier":"P1","decision_required":"Phone the landlord (07700 900184, he asked for calls in event 004) for the proofing contractor and date; if he cannot give a date, decide whether to offer our own contractor to inspect and quote for sealing the openings, with his approval.","summary":"Rats have got into the kitchen at 14 Mosswold Crescent. The landlord took on the works himself on 18/08 (events 00…




## Not done and why
- Assign an agency pest or proofing contractor: The landlord chose to arrange the works himself (event 007). Sending our contractor without his approval would mean two contractors on one job (PM-AUTH-004/005). I offered it as an option in the chase instead.
- Close the case: The openings are not sealed and there is no completion evidence or pest report on file.
- Phone the landlord or tenant: I have no phone tool, so the calls are in the P1 handover.

## Escalation
Tier P1. Decision required from a human: Phone the landlord for the proofing date. If none is given, decide whether to offer our contractor, with his approval. Reason: Rats are inside the kitchen, which is a health hazard. The landlord's contractor missed the visit and has not been rebooked, and the landlord has not replied since 18/08. Deadline: 2025-09-12T17:00:00+01:00.

Handover: Landlord: 07700 900184. The tenant prefers phone contact.

## Communications
- landlord via email: Chased him for the proofing contractor, scope, date and pest report after the 08/09 visit did not happen, and offered our contractor to inspect and quote.
- landlord via sms: Pointer to check his email.
- tenant via email: Thanked her for reporting the missed visit, said we have chased the landlord, and asked her to report any more activity or contact.
- tenant via sms: Pointer to check her email.

## Messages sent (full text)
### To landlord (Gareth Vale (Landlord)) via email — Rat activity in the kitchen – proofing works update
Address: 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ

Hi Gareth,

I am following up on the rat activity in the kitchen at the above property. Elise has told us that pest control attended on Sunday 7 September and removed their equipment. She understood that a separate contractor would attend on Monday 8 September to deal with the openings, but nobody came. As far as we know, the openings by the kitchen sink and drain are still not sealed, and we have no completion confirmation or pest control report on file.

Can you please let us know who is carrying out the proofing work, what they will be doing and when they will attend? Please also send us the pest controller's report if you have it. If you would prefer us to send one of our contractors to inspect and quote for sealing the openings, please let us know and we will arrange this.

As there have been rats inside the kitchen, we would be grateful for a reply as soon as possible.

Kind regards
Northbridge Lettings

### To landlord (07700 900184) via sms
Hello, this is Northbridge Lettings! Please check your email for 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ.

### To tenant (Elise Rowan (Tenant)) via email — Kitchen openings – update
Address: 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ

Hello Elise,

Thank you for letting us know that nobody attended on Monday 8 September to deal with the openings. We have chased your landlord today and asked him who will carry out the work and when. We will be in further contact as soon as we hear back.

In the meantime, if you see any more rat activity or anyone contacts you to arrange a visit, please let us know.

Kind regards
Northbridge Lettings

### To tenant (Elise Rowan (Tenant)) via sms
Hello, this is Northbridge Lettings! Please check your email regarding the property at 14 Mosswold Crescent, Brindlewick, ZZ1 1ZZ.

## Conflicts and missing information
- Conflict: Event 010 says the openings are under the kitchen sink. Event 014 says contractors were due to open up or work on a wall area. Event 001 mentions openings outside near the drains. → The scope is unclear. I asked the landlord to say exactly what work is planned and did not assume any scope.
- Conflict: The automated case state says 'close out' with no landlord approval. → Wrong. The landlord took on the works himself on 18/08 (event 007), and those works are not complete, so the case stays open.
- Missing: Who the landlord's proofing contractor is, what they will do, and when they will attend
- Missing: Pest controller's written report
- Missing: Confirmation that the openings have been sealed

## Final state
escalated (family: maintenance, urgency: P1)

## Summary
Rats are getting into the kitchen through openings that are still unsealed. The landlord's proofing contractor did not turn up on 08/09 and the landlord has not replied since 18/08. I chased him today by email and SMS and updated the tenant, and the case is on hold until 12/09; please phone the landlord on 07700 900184 and the tenant, who prefers calls.
