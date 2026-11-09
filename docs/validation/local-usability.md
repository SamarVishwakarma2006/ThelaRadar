# Local usability sessions

Prepared 9 November 2026. This is a moderated prototype test, not the Step 17 beta launch.

## Setup

Run npm start and open http://127.0.0.1:5190. Use a separate browser profile with fictional sample data, no personal passwords or vendor details. Keep one editing tab. Explain that all vendors are fictional, directions are disabled and accounts are previews. Internet is needed for remote photos/fonts. Do not publish or expose the local server to the internet.

Recruit a first round of three people who explore local food and two people familiar with running a stall. These numbers are a practical first round, not a statistically representative sample. Observe each person on your computer; localhost links do not work on their devices.

## Tasks (15–20 minutes)

1. Find a breakfast vendor and explain whether it is confirmed to be serving now.
2. Find its menu/price and explain what happens when Directions is unavailable.
3. Save it, navigate to Saved, reload and find it again.
4. Add a fictional price correction; describe where it goes.
5. In Vendor demo, mark one item sold out, reload and restore it. Explain the difference between finished and stop sharing.
6. In Local review demo, find the correction, mark reviewed, reopen and dismiss it. Check whether the listing changed automatically.
7. Find login/register. Ask what these screens currently do; use dummy input only if trying them. A human participant may complete the sample challenge.

Avoid coaching before an attempt. Record completed unaided / completed with help / failed, elapsed time, confusion and the participant's own explanation. Stop if they believe a fictional vendor or demo account is real and clarify immediately.

## Notes template

Participant code (no name/contact):
Role: consumer / vendor
Date and device:
Task results:
Most confusing wording or control:
Could they distinguish schedule from confirmation?
Did they understand local-only reports and account previews?
Top requested change and why:
Observer's proposed fix:
Retest result:

Keep identifiable research material out of Git. Summarise anonymised findings in docs/research. Do not claim interviews or sessions happened until notes exist.

## Decision after the first round

Fix any task-stopping bug or false interpretation of availability/privacy before another session. Rank repeated issues by task impact. Do not infer market demand from liking the design. Select the pilot locality and complete earlier field-validation work before the real beta.

## Before public beta

Real authentication and role policies, CAPTCHA verification, consented real listings and directions, moderation responsibility, database permission tests, restore rehearsal, privacy/retention review and image permission checks remain required. Supabase is deferred by the owner; this local test can proceed without it.
