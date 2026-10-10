# Case 020

## Next action
escalate_safety → human (stage: Landlord gate with an open electrical safety signal; confidence medium; rules PM-SAFE-001, PM-SAFE-002, PM-AUTH-001, PM-AUTH-004, PM-AUTH-005)

## Rationale
Stage: landlord gate, with an open electrical safety signal. Rules: PM-SAFE-001, PM-SAFE-002, PM-AUTH-001, PM-AUTH-004, PM-AUTH-005. Evidence: events 001, 004, 006, 011, 015, 016, 020, 021, 023, 024 and 025. The kitchen socket is warm and has had a burning smell for more than eight hours. A child is in the home, the power has not been isolated and nobody has inspected the socket. That is a possible fire hazard, so this is P0. First, I have emailed the tenant through the portal with the safety steps nobody had given her (event 009). She should not use the socket, switch off the kitchen breaker or the main switch if she can reach it safely, leave and call 999 if there is smoke, sparks or a stronger smell, and check the smoke alarm. Second, I have emailed the landlord and sent him a pointer SMS asking for urgent authority for a qualified electrician. His handyman Rowan Pike cannot do fixed-wiring work and did not get in. Third, I have escalated P0 so the on-call manager can decide on an emergency make-safe electrician. I have not dispatched an electrician myself: there is no landlord approval or emergency authority on file, and the landlord's own contractor is on this job.

## Execution status (generated from execution results, not from the agent's text)
- Executed: send_message, send_message, send_message, update_ticket
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P0 handover recorded; on-call page NOT placed (voice not configured in this run)

## Actions taken
- send_message#2 send_message [success] {"to_party":"tenant","to_ref":"Nora Bell","channel":"portal","subject":"Kitchen socket: safety steps to take now","body":"Job Id: NBL-020-01\nAddress: 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ\n\nHi Nora,\n\nThank you for the update, and I'm sorry you have not had safety guidance until now. Please do the following straight away.\n\nDo not use the kitchen counter socket and do not touch its face. Leave…
- send_message#3 send_message [success] {"to_party":"landlord","to_ref":"Elliot Vane","channel":"email","subject":"URGENT: kitchen socket, electrician needed today","body":"Job Id: NBL-020-01\nAddress: 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ\n\nHi Elliot,\n\nFollowing my email and voicemail earlier today: Nora is back at the property with her son, and the burning smell near the kitchen counter socket is still there more than eight hours a…
- send_message#4 send_message [success] {"to_party":"landlord","to_ref":"Elliot Vane","channel":"sms","body":"Hello, this is Northbridge Lettings! Please check your email urgently regarding the property at 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ."}
- update_ticket#5 update_ticket [success] {"ticket_id":"NBL-020-01","note":"Priority raised to P0 (electrical fire risk). At 17:42 BST on 12/04/2025 the tenant was emailed safety guidance through the portal: do not use the socket; switch off the kitchen breaker, or the main switch, if it can be reached safely; leave and call 999 if there is smoke, sparks or a stronger smell; check the smoke alarm. Landlord emailed and texted for urgent au…

### Recorded for a human (not executed by the system)
- escalate#1 escalate [recorded for human] {"tier":"P0","decision_required":"Authorise or refuse an emergency make-safe call-out by a qualified electrician to 8 Brindlewick Row tonight, under the agency's emergency powers, while the landlord cannot be reached. Then confirm the tenant has isolated the power.","summary":"Kitchen counter socket is warm with a lasting faint burning smell. First reported at 09:14 BST and still present at 17:42 …




## Not done and why
- Book or assign an emergency electrician: There is no landlord approval or emergency authority on file and the landlord's own contractor holds the job (PM-AUTH-001/004/005). Passed to the on-call manager to authorise.
- Authorise Rowan Pike to use landlord-held keys: The landlord has not authorised key access (event 021 is ambiguous), and Rowan cannot make an electrical fault safe anyway.
- Tell the tenant an electrician is booked: No electrician has been booked.

## Escalation
Tier P0. Decision required from a human: Authorise an emergency make-safe call-out by a qualified electrician tonight while the landlord cannot be reached, and confirm the tenant has isolated the power. Reason: Possible electrical fire hazard with a child at home; no qualified person has attended and the landlord has not authorised an electrician. Deadline: 2025-04-12T18:00:00Z.

Handover: Tenant has the safety guidance. Landlord has been emailed and texted. Rowan Pike (the landlord's handyman) is not qualified to do fixed-wiring work.

## Communications
- tenant via portal: Safety steps: do not use the socket, switch off the kitchen breaker or the main switch if safe, leave and call 999 if there is smoke, sparks or a stronger smell, check the smoke alarm; landlord and duty manager contacted; please tell us whether the power is off.
- landlord via email: Urgent: the smell persists and nobody has inspected; Rowan cannot do fixed wiring; please confirm today whether we may send a qualified electrician to make safe and inspect, or whether you will arrange your own and tell us who and when.
- landlord via sms: Pointer asking him to check his email urgently.

## Messages sent (full text)
### To tenant (Nora Bell) via portal — Kitchen socket: safety steps to take now
Job Id: NBL-020-01
Address: 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ

Hi Nora,

Thank you for the update, and I'm sorry you have not had safety guidance until now. Please do the following straight away.

Do not use the kitchen counter socket and do not touch its face. Leave the kettle and anything else unplugged from it.

If you can reach your consumer unit (fuse box) safely and it is dry, please switch off the electricity there. If one breaker is clearly labelled for the kitchen or kitchen sockets, switch off that one. If you cannot tell which breaker it is, switch off the main switch. This will turn off the fridge too, so keep the fridge and freezer doors closed and the food should stay cold for several hours. Please do not take off any covers or touch any wiring.

If you see smoke, sparks, scorch marks or flames, or if the smell gets stronger, leave the property with your son straight away and call 999. Do not go back in to deal with the socket. Please also check that your smoke alarm is working.

We have asked your landlord again today for a qualified electrician to attend, and we have passed the case to our duty manager. We will update you as soon as we know who is attending and when. Please reply here to tell us whether you were able to switch off the power, and let us know if anything changes.

Kind regards
Northbridge Lettings

### To landlord (Elliot Vane) via email — URGENT: kitchen socket, electrician needed today
Job Id: NBL-020-01
Address: 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ

Hi Elliot,

Following my email and voicemail earlier today: Nora is back at the property with her son, and the burning smell near the kitchen counter socket is still there more than eight hours after she first reported it. Nobody has inspected the socket. Rowan could not get in, and he has told us he does not do fixed-wiring work and has no electrical test equipment, so he cannot make this safe or diagnose it.

A warm socket with a lasting burning smell is a possible fire risk. It needs a qualified electrician to attend as an emergency to make it safe and find the cause. I have given Nora safety steps, including switching off the power at the consumer unit.

Can you please confirm straight away whether you are happy for us to send a qualified electrician today to make safe and inspect, or whether you will arrange a qualified electrician yourself and tell us who is attending and when. If any repair is needed beyond making it safe, the electrician will quote and we will send the quote to you before any work goes ahead.

Kind regards
Northbridge Lettings

### To landlord (Elliot Vane) via sms
Hello, this is Northbridge Lettings! Please check your email urgently regarding the property at 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ.

## Conflicts and missing information
- Conflict: The landlord's text to Rowan (event 021) says 'have a look if you can get in' but says nothing about using a key. Rowan says he had no clear permission to enter (event 023). → I have treated this as not authorising entry in the tenant's absence. The tenant is now home, so key access no longer matters for tonight.
- Conflict: The tenant first reported warmth by touch (event 001), then warmth without touching (events 017 and 018). → Both accounts point to a possible hazard, so I have dealt with it as a fire risk either way.
- Missing: Landlord's decision on a qualified electrician
- Missing: Whether the tenant has been able to switch off the power
- Missing: Which breaker serves the kitchen sockets

## Final state
escalated (family: maintenance, urgency: P0)

## Summary
Warm kitchen socket with a burning smell for 8+ hours: the tenant and her 10-year-old are at home, the power is not isolated, nobody has inspected it, and the landlord has authorised only an unqualified handyman, who did not get in. I have emailed the tenant safety and isolation steps and emailed and texted the landlord for urgent authority; you need to decide tonight on an emergency make-safe electrician.
