# Contributing to ThelaRadar

## Work tracking

Use an issue for research, product, operational and engineering work. State the outcome, evidence, acceptance criteria and dependencies. Link it to the corresponding roadmap milestone. Treat assumptions and observed findings separately.

Use Backlog, Ready, In progress, Review, Blocked and Done on the project board. Done requires the acceptance criteria and evidence, not just a closed conversation.

## File and data rules

Keep the original proposal as a historical record. Put product refinements in the direction document and substantial decisions in numbered records under `docs/decisions/` when needed. Use relative links within documentation.

Commit anonymised findings and sample data. Keep credentials, private contact details, consent records and live location histories outside Git. Obtain permission for published photos and quotations. A gitignore is not a substitute for reviewing staged files.

## Git workflow

The owner performs staging, commits and pushes manually. Work on `main` for small documentation changes, or use a `codex/` feature branch and pull request for larger changes. Avoid destructive history changes.

From the project directory, review and stage only the intended files:

```powershell
git status --short
git diff
# Replace paths with the specific files for this change.
git add <file-paths>
git diff --cached
git commit -m "Describe what changed in plain language"
git push
```

For a new branch, the first push uses `git push -u origin <branch-name>`.

## Verification and handoff

Check changed documentation links and `git diff --check`. Run relevant application checks once code exists. Never claim a check passed if it was not run. Summarise the step, what happened, verification, Git state, next step and recommended model by name.

Update `docs/ROADMAP.md` when milestone evidence changes. Significant milestones should record expected versus observed results, decisions and next actions. A public licence must be explicitly chosen before adding a LICENSE file; none is selected yet.
