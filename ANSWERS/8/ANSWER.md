# Case 008

## Next action
escalate_safety → human (stage: Emergency make-safe; source-flat access unresolved; confidence high; rules PM-SAFE-001, PM-SAFE-002, PM-AUTH-001, PM-PRIV-001)

## Rationale
Stage: emergency make-safe. The source flat cannot be accessed. PM-SAFE-001, PM-SAFE-002, PM-AUTH-001, PM-PRIV-001. Evidence: events 002, 012, 017, 023 (water still coming through a light fitting and the ceiling bulge growing), 014 and 018 (electrician due, fitting not yet tested), 016 and 021 (no source or isolation point found), 009 and 020 (Yara refuses entry until 17:30 and asked for the plumber's details in writing), 006, 011 and 019 (landlord has not authorised entry), 022 (no delegated entry authority, escalation route is the director). I did the safe actions first. I emailed Yara the plumber's name and the proposed work, as she asked in event 020, and asked her to agree access or call. I emailed Niko an update, as he asked in event 006, and asked for the full tenancy agreement. I texted Bevin the safety advice again, including when to call 999. Then I escalated P0 to the director: they need to decide on Flat 3 access and whether to get advice from emergency services. Nobody enters Flat 3 and no key is used without consent or lawful authority. Order of next steps: (1) the duty manager or director decides on access and on emergency services advice; (2) we get Vellum Electrical's findings on the Flat 2 fitting; (3) if Yara agrees, Daro attends Flat 3 with someone from our team present, and Niko is told first; (4) any repair beyond tracing and isolating the leak goes to Niko for approval.

## Execution status (generated from execution results, not from the agent's text)
- Executed: send_message, send_message, send_message, update_ticket
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P0 handover recorded; on-call page NOT placed (voice not configured in this run)

## Actions taken
- send_message#1 send_message [success] {"to_party":"tenant","to_ref":"Yara Mallow (Tenant, Flat 3)","channel":"email","subject":"Water coming into the flat below: plumber details and proposed work","body":"Address: Flat 3, 8 Tallowmere Row, Ossin Vale, ZZ1 1ZZ\n\nHi Yara,\n\nThank you for speaking with us today. As you asked, here are the details in writing.\n\nThe plumber is Daro Fen of Brindle Flow Plumbing. The first job would be to…
- send_message#2 send_message [success] {"to_party":"landlord","to_ref":"Niko Pell (Landlord, Flat 3)","channel":"email","subject":"Update: water coming into Flat 2 below your flat","body":"Address: Flat 3, 8 Tallowmere Row, Ossin Vale, ZZ1 1ZZ\n\nHi Niko,\n\nHere is an update, as you asked to be kept informed. Water is still dripping through the bedroom ceiling of the flat below, next to a light fitting, and the ceiling is bulging. Bri…
- send_message#3 send_message [success] {"to_party":"other","to_ref":"Bevin Orlo (Tenant, Flat 2)","channel":"sms","body":"Hello, this is Northbridge Lettings. Thank you for the update. Please keep everyone out of the bedroom and away from the light fitting, switches and ceiling. If the ceiling starts to give way, or you see sparks, smoke or water reaching sockets, leave the room and call 999 straight away. We are still working on acces…
- update_ticket#5 update_ticket [success] {"ticket_id":"Water ingress affecting two flats - Flat 3, 8 Tallowmere Row","status":"escalated","note":"13:55 BST: Emailed Yara the plumber details and proposed work, asking for consent or a call. Emailed Niko an update and asked for the full tenancy agreement. SMS to Bevin with safety and 999 advice. Escalated P0 for director decision on Flat 3 access and emergency services advice. Next check: V…

### Recorded for a human (not executed by the system)
- escalate#4 escalate [recorded for human] {"tier":"P0","decision_required":"Agency director decision today on access to Flat 3: review the full tenancy agreement (access and emergency repair wording) and decide whether any lawful emergency access exists despite the tenant refusing (events 009, 020) and the landlord not authorising it (events 006, 011, 019), or whether to wait for Yara's return at 17:30. Also decide whether to contact emer…




## Not done and why
- Entering Flat 3 or using a key: Tenant refused consent, landlord has not authorised it, and no emergency-entry authority has been verified (events 009, 019, 020, 022).
- Operating riser valves: No valve has been confirmed as serving only Flat 3 (events 010, 016); turning off the wrong supply could affect other flats.
- Booking further work or a second plumber: Brindle Flow Plumbing is already on the job. Without access to the source no further work can be scoped, and no landlord approval is on file for repairs.
- Sharing Bevin's details with Yara or Niko: Bevin asked for details to stay within the maintenance team (event 007).
- Telling anyone the electrician has attended: The history does not show whether Vellum Electrical attended in their 12:30–13:15 window or what they found.

## Escalation
Tier P0. Decision required from a human: Director decision on lawful access to Flat 3 after reviewing the full tenancy agreement, and whether to get advice from emergency services now given the growing ceiling bulge next to a wet light fitting. Reason: Water near electrics and a growing ceiling bulge, with the source in a flat we cannot enter; staff have no delegated authority (event 022). Deadline: 2025-06-18T13:30:00Z.

Handover: Safety advice has been given to Flat 2; the electrician was due 12:30–13:15 and their outcome is not on file; the plumber found no source; Yara has been emailed the details she asked for; Niko has been asked for the tenancy agreement.

## Communications
- Tenant, Flat 3 (Yara Mallow) via email: Plumber's name (Daro Fen, Brindle Flow Plumbing) and the proposed work (trace the leak and find a safe isolation point) in writing, as she asked. Asks her to agree to access with our team present before 17:30, or as soon as she is home, and to call.
- Landlord (Niko Pell) via email: Update on the leak getting worse and on the plumber and building manager attendances, confirmation that nobody has entered Flat 3, and a request for the full tenancy agreement.
- Tenant, Flat 2 (Bevin Orlo) via sms: Keep out of the bedroom and away from the fitting and ceiling; call 999 if the ceiling gives way or there are sparks, smoke or water at sockets.

## Messages sent (full text)
### To tenant (Yara Mallow (Tenant, Flat 3)) via email — Water coming into the flat below: plumber details and proposed work
Address: Flat 3, 8 Tallowmere Row, Ossin Vale, ZZ1 1ZZ

Hi Yara,

Thank you for speaking with us today. As you asked, here are the details in writing.

The plumber is Daro Fen of Brindle Flow Plumbing. The first job would be to trace where the water is coming from and find a safe point to turn off any supply that is leaking. Water is still coming through the ceiling of the flat below and the ceiling is getting worse, and the plumber could not find the source from the flat below or the common riser.

Nobody has entered Flat 3 and no key has been used. Could you please tell us if you would agree to the plumber attending, with someone from our team present, before you get back at 17:30, or if not, whether we can arrange for him to come as soon as you are home? If you can, please call us as soon as you see this.

Kind regards
Northbridge Lettings

### To landlord (Niko Pell (Landlord, Flat 3)) via email — Update: water coming into Flat 2 below your flat
Address: Flat 3, 8 Tallowmere Row, Ossin Vale, ZZ1 1ZZ

Hi Niko,

Here is an update, as you asked to be kept informed. Water is still dripping through the bedroom ceiling of the flat below, next to a light fitting, and the ceiling is bulging. Brindle Flow Plumbing and the building manager attended the flat below and the common riser this morning but could not find the source or a valve that definitely serves Flat 3. An electrician has been asked to check the light fitting in the flat below.

Yara has not agreed to entry before she gets home at 17:30. We have sent her the plumber's name and the proposed work in writing, as she asked. Nobody has entered Flat 3 and no entry will be made without proper authority.

Could you please send us a full copy of the tenancy agreement so the access and emergency repair wording can be checked? We will update you before any access to Flat 3 is arranged.

Kind regards
Northbridge Lettings

### To other (Bevin Orlo (Tenant, Flat 2)) via sms
Hello, this is Northbridge Lettings. Thank you for the update. Please keep everyone out of the bedroom and away from the light fitting, switches and ceiling. If the ceiling starts to give way, or you see sparks, smoke or water reaching sockets, leave the room and call 999 straight away. We are still working on access to the flat above and will keep you updated.

## Conflicts and missing information
- Conflict: The tenancy refers to access by arrangement and separately to emergency repairs; the landlord is unsure whether entry after a refusal is allowed (events 011, 019). → Not treated as authority to enter. I asked for the full agreement and escalated it to the director, as event 022 sets out.
- Conflict: Event 018 gives the electrician's window as 12:30–13:15. 'Now' is 13:55 BST, and it is unclear whether those times are UTC or local. → I have not assumed they attended. Their outcome is listed as missing information.
- Missing: Whether Vellum Electrical attended and whether the Flat 2 lighting circuit is isolated and safe
- Missing: Full tenancy agreement wording on access and emergency repairs
- Missing: Source of the leak (Flat 3 suspected, not confirmed)
- Missing: Whether Yara will agree to access before 17:30
- Missing: Who pays for the Flat 2 attendances (landlord of Flat 3 or another party), to be decided once the source is known

## Final state
escalated (family: maintenance, urgency: P0)

## Summary
Water is still coming through a ceiling light in Flat 2 and the bulge is growing. The electrical check is not confirmed and the source in Flat 3 cannot be reached because the tenant refuses entry until 17:30 and the landlord has not authorised it. I have emailed Yara the plumber's details in writing and sent Niko an update asking for the tenancy agreement. A director needs to decide today on access and on getting advice from emergency services.
