# Case 020

## Execution status (generated from execution results, not from the agent's text)
- Executed: nothing
- Failed or unknown: none
- Blocked by guards or checks: none
- Human handover: not required

## Decision
The system could not complete this case autonomously and has escalated it. Failure: TimeoutError: The operation was aborted due to timeout

## Actions taken
- none executed

### Actions proposed but not executed
- escalate#1 escalate [staged] {"tier":"P0","decision_required":"Authorise an emergency make-safe call-out by a qualified electrician tonight at 8 Brindlewick Row (landlord has not given electrician authority and is not answering), or reach Elliot Vane by phone for approval; decide whether the tenant needs further support if the kitchen circuit cannot be isolated.","summary":"Kitchen counter socket warm with persistent faint bu…
- send_message#2 send_message [staged] {"to_party":"tenant","to_ref":"Nora Bell","channel":"portal","subject":"Kitchen socket – safety steps for now","body":"Job Id: NBL-020-01\nAddress: 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ\n\nHi Nora,\n\nThank you for the update, and sorry you have not had safety advice from us before now. Until a qualified electrician has checked it, please follow these steps:\n\nDo not use the socket, plug anything…
- send_message#3 send_message [staged] {"to_party":"landlord","to_ref":"Elliot Vane","channel":"email","subject":"URGENT – 8 Brindlewick Row kitchen socket – electrician needed today","body":"Job Id: NBL-020-01\nAddress: 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ\n\nHi Elliot,\n\nNora is back at the property with her son. She reports a faint burning smell still noticeable near the kitchen counter socket, and the socket area was warm earlier…
- send_message#4 send_message [staged] {"to_party":"landlord","to_ref":"Elliot Vane","channel":"sms","body":"Hello, this is Northbridge Lettings! Please check your email regarding the property at 8 Brindlewick Row, Oakhollow, ZZ1 1ZZ."}
- update_ticket#5 update_ticket [staged] {"ticket_id":"NBL-020-01","status":"escalated","note":"12/04/2025 17:42 BST: Tenant back at property with 10-year-old son; faint burning smell persists, socket uninspected, circuit not isolated. Safety steps sent to tenant via portal (do not use socket, isolate labelled kitchen socket breaker if safe, leave and call 999 on smoke/sparks/stronger smell). Landlord emailed and SMS'd asking for authori…

## Escalation
Tier P0. Decision required from a human: review this case from the raw content and the trace, and process it manually now; a P0 safety flag was raised.

## Final state
escalated (automatic: pipeline failure)
