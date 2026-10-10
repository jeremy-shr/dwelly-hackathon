# Reasoning for case 029

## What the system received
Channel: tenant request. Kind: event. Case time: 2025-05-14T13:48:00.000Z. Source files: index.md, history.md.
Deterministic flags: none.

> # Heating-system visit enquiry Source role: Tenant | Status at export: Requires decision | Created: 2025-05-12 08:10:00 UTC | Property: 62 Brindlewick Row, Vellumby, ZZ1 1ZZ ## Initial request I have received a message about a possible heating-system visit, but I do not have a confirmed appointment. Please check what has been arranged. ## History (20 events, oldest first) ### event 001 — 2025-05-12T08:10:00.000Z — Portal — from Elowen Vey (Tenant) to Tamsin Rook (Property Manager, Northbridge Lettings) Tenant reports that a caller identifying himself as a heating contractor asked her to leave the front-door key in the outside meter cabinet for a possible visit on Wednesday morning, May 14. S…

## Triage and routing
Families: maintenance, landlord, compliance. Urgency: P1. Router confidence: 0.6. Boiler pressure diagnostic visit is unconfirmed, and the contractor's identity is unverified while he repeatedly asks the tenant to leave the key in a shared outside meter cabinet and requests her mobile number without consent, which is a security and safeguarding risk (tenant's 15-year-old son may be home alone) needing action before Saturday; heating currently works so it is not P0, but a generalist may need to handle the contractor vetting, GDPR consent, and landlord authorisation together.
Agent: generalist.
Records prefetched from the system of record: messages/M-011-send_message#5, messages/M-021-send_message#2, messages/M-021-send_message#3, messages/M-021-send_message#4, messages/M-023-send_message#3. Not found: property_address=62 Brindlewick Row, Vellumby, ZZ1 1ZZ not found; "62 Brindlewick Row" matched nothing; "NBL-029" matched nothing.

## What it looked up, staged and executed
| step | tool / action | detail |
|---|---|---|
| staged | set_hold#1 | {"reason":"Reason: Waiting for Landlord. Comment: Has Orren confirmed Bram Alder as his engineer (or asked for ours)? Has Bram sent Gas Safe and company details… |
| staged | record_landlord_decision#2 | {"landlord_id":"Orren Vale","decision":"Authorises a diagnostic visit by a suitably identified heating contractor to investigate intermittent boiler pressure lo… |
| staged | send_message#3 | {"to_party":"tenant","to_ref":"Elowen Vey","channel":"portal","subject":"Boiler pressure visit – 62 Brindlewick Row","body":"Job Id: NBL-029-01\nAddress: 62 Bri… |
| staged | send_message#4 | {"to_party":"landlord","to_ref":"Orren Vale","channel":"email","subject":"Boiler pressure visit – 62 Brindlewick Row","body":"Job Id: NBL-029-01\nAddress: 62 Br… |
| staged | send_message#5 | {"to_party":"contractor","to_ref":"Bram Alder","channel":"email","subject":"62 Brindlewick Row – boiler pressure check","body":"Job Id: NBL-029-01\nAddress: 62 … |
| staged | update_ticket#6 | {"ticket_id":"NBL-029-01","note":"14/05: Tenant told no visit confirmed, no key in shared meter cabinet, no access via son, number not shared. Landlord emailed … |
| control | submit_resolution | {"family":"maintenance","urgency":"P2","decision":"Stage: landlord gate on the landlord's own nominee. The landlord has approved a diagnostic visit only by \"a … |
| exec:success | set_hold#1 |  |
| exec:success | record_landlord_decision#2 |  |
| exec:success | update_ticket#6 |  |
| exec:success | send_message#3 |  |
| exec:success | send_message#4 |  |
| exec:success | send_message#5 |  |

## What it decided and why
Stage: landlord gate on the landlord's own nominee. The landlord has approved a diagnostic visit only by "a suitably identified heating contractor" (event 014). He has not confirmed that Bram Alder is the engineer he means to use, and he has not agreed a key drop or entry while the tenant is out (events 005, 011, 014). My question to him from event 019 is still unanswered. Bram is now offering Saturday 08:00–13:00 directly to the tenant and is asking again for the key to go in a shared outside meter cabinet (events 018, 020). I have recorded the landlord's decision. I have emailed the tenant: nothing is confirmed, no key goes in the cabinet, nobody comes in through her son, and her number has not been shared. I have emailed the landlord the new offer and asked him either to confirm Bram as his engineer or to let us send one of ours, with her Saturday 10:00–12:00 window. I have emailed Bram that there is no key drop and no entry while she is out, that he should arrange through us, and that we need his Gas Safe number and company details. I did not give him the tenant's number, because the consent field is empty (event 017). The case is held Waiting for Landlord until Friday 16/05. Next: once the landlord confirms and Bram sends his details, I confirm Saturday 17 May 10:00–12:00 to both sides. If there is no answer by Friday, I chase the landlord and tell the tenant Saturday is not confirmed. The urgency is P2, not P1: the heating works (event 015), the pressure loss is intermittent and the property is secure as long as no key is left outside, which the tenant has now been told.

## What it escalated
Nothing. The case was within authority and policy.

## What failed
No executed action failed.

## Automated checks
Pass 1: clean

## Final result
awaiting_approval (family maintenance, urgency P2).

Full machine trace: trace.jsonl in this folder (every model step, tool call, guard decision and execution result).
