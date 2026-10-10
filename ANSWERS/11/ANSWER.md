# Case 011

## Next action
escalate_human_review → human (stage: Work paused; specialist assessment cost needed for landlord decision; confidence medium; rules PM-AUTH-003, PM-AUTH-002, PM-SAFE-001)

## Rationale
Stage: work paused on site, with a landlord decision needed on a scope beyond the approved quote. The landlord approved only the quoted plumbing scope (event 013) and refused to fund a material assessment until she has the likely cost and timing (event 022). The repair cannot go ahead safely until the possible-asbestos lining is identified (events 017, 018, 023). The agency already asked her for a decision at event 024, so I have not written to her again. What she is missing is a specialist cost, which Mossbarrow Pipe Services cannot give (event 023). No asbestos specialist is named in the case, so I have handed the choice of surveyor to a human, with a P1 escalation to get the figures to the landlord quickly. I have recorded the landlord's decision. I sent the tenant a safety update: keep the tap out of use, stay away from the hatch, and report any new dripping. The case is held Waiting for Landlord until 16/06/2025. Urgency is P1, not P0: the leak is small and only happens when the tap is used, the tap is out of use, sockets are dry, there is no light under the patch and the ceiling is not sagging (events 003, 020). It is still a recurring leak waiting on a safety check, in a home with a young child. Rules: PM-AUTH-003, PM-AUTH-002, PM-SAFE-001.

## Execution status (generated from execution results, not from the agent's text)
- Executed: set_hold, record_landlord_decision, send_message
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: P1 handover recorded for the duty manager (no page required)

## Actions taken
- set_hold#2 set_hold [success] {"reason":"Reason: Waiting for Landlord. Comment: Has Ossa replied to the event 024 request, and is there a specialist cost and date to send her? If not, chase on 16/06/2025.","waiting_for":"landlord","until":"2025-06-16T09:00:00Z"}
- record_landlord_decision#4 record_landlord_decision [success] {"landlord_id":"Ossa Fenlow","decision":"Approval from event 013 covers the quoted plumbing scope only (up to the estimate amount, done safely). No approval for a specialist material assessment or any other work. Landlord wants the likely cost and timing before she considers any further spend.","source":"Landlord emails, event 013 (12/06/2025) and event 022 (13/06/2025)"}
- send_message#5 send_message [success] {"to_party":"tenant","to_ref":"Iven Rell","channel":"portal","subject":"16 Brindlewick Mews – kitchen ceiling leak","body":"Address: 16 Brindlewick Mews, Fenbarrow, ZZ1 1ZZ\n\nHi Iven,\n\nThank you for keeping the kitchen tap out of use and for leaving the hatch alone. The plumber has not opened the ceiling. The lining needs to be identified before anyone works near it, and we are now arranging th…

### Recorded for a human (not executed by the system)
- propose_action#1 propose_action [recorded for human] {"action_type":"source_specialist_quote","target":"Licensed asbestos surveyor or analyst (specialist trade, not named in the case)","parameters":"Ask for a written cost and the earliest date for a survey or sample analysis of the pale fibrous lining behind the painted kitchen ceiling board, next to the access hatch above the sink at 16 Brindlewick Mews, Fenbarrow, ZZ1 1ZZ. The aim is to confirm wh…
- escalate#3 escalate [recorded for human] {"tier":"P1","decision_required":"Choose a licensed asbestos surveyor or analyst and get a cost and earliest date for testing the kitchen ceiling lining today or the next working day, then send the figures to the landlord for approval. The leaking joint cannot be repaired until then.","summary":"16 Brindlewick Mews: a compression joint above the kitchen ceiling leaks whenever the kitchen tap is us…




## Not done and why
- Instruct any opening, drilling or sampling of the ceiling: The material has not been identified, and the landlord approved only the plumbing scope (events 013, 022). Doing this is unsafe and unapproved.
- Send the landlord another approval request: Event 024 asked her at the case time. There is no cost to give her yet, so a second message would add nothing.
- Name or book an asbestos surveyor: No specialist is named in the case. Choosing one is a human step, so it is handed over.
- Instruct Mossbarrow beyond the quote: Rule PM-AUTH-003: the approval is conditional and the scope has changed.

## Escalation
Tier P1. Decision required from a human: Choose a licensed asbestos surveyor or analyst, get a cost and earliest date, and send them to the landlord for approval. Reason: Recurring leak with the repair blocked by a possible asbestos lining. The specialist is not named in the case. Deadline: 2025-06-16T12:00:00Z.

Handover: Landlord decision recorded. Tenant updated. Case held Waiting for Landlord until 16/06/2025.

## Communications
- tenant via portal: Ceiling not opened. The lining must be identified first and this is being arranged with the landlord. Keep the tap out of use, avoid the hatch, and report any dripping, sagging or water near electrics.

## Messages sent (full text)
### To tenant (Iven Rell) via portal — 16 Brindlewick Mews – kitchen ceiling leak
Address: 16 Brindlewick Mews, Fenbarrow, ZZ1 1ZZ

Hi Iven,

Thank you for keeping the kitchen tap out of use and for leaving the hatch alone. The plumber has not opened the ceiling. The lining needs to be identified before anyone works near it, and we are now arranging this with your landlord. Please keep not using that tap and keep away from the hatch. If dripping starts again, the stain spreads, the ceiling sags, or water gets near any electrical fitting, let us know straight away. We will be in touch as soon as we have the next appointment to agree with you.

Kind regards
Northbridge Lettings

## Conflicts and missing information
- Conflict: Triage hint says P0. The case shows a small drip only when the tap is used, the tap out of use, dry sockets and no sagging. → Set P1: a recurring leak waiting on a safety assessment, with no immediate danger.
- Conflict: The landlord approved the plumbing scope 'provided the work is carried out safely' (event 013), but the safe route now needs an assessment she has not approved (event 022). → Treated as a scope change that needs a new decision with figures attached. Nothing further is instructed.
- Missing: What the ceiling lining is made of (no survey on file)
- Missing: Cost and timing of a specialist asbestos assessment
- Missing: Landlord's answer to event 024
- Missing: Amount of the Mossbarrow estimate (event 011 does not show the figure)

## Final state
escalated (family: maintenance, urgency: P1)

## Summary
A kitchen pipe joint at 16 Brindlewick Mews leaks when the tap is used. The plumber has stopped because a lining that may contain asbestos is in the way. The landlord will only consider an assessment once she has a cost and timing. Please choose a licensed asbestos surveyor, get their price and earliest date, and send them to Ossa Fenlow.
