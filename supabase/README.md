# Development database setup

Status: draft migration prepared, not executed or connected. Existing demo continues unchanged.

1. Use an owner-controlled Supabase development project (no production records).
2. Review migrations/202611070001_consumer_foundation.sql before applying through the SQL editor or migration CLI. It creates four tables inside one transaction; it intentionally fails if the tables already exist. Do not rerun blindly.
3. Verify tables, constraints and indexes. Anonymous and authenticated roles must have no reads or writes at this stage.
4. Before enabling public reads, add and test policies for published areas, published vendors with sharing enabled, and only their offerings/sessions. Verify hidden-parent records cannot leak through child tables.
5. Add ownership, restricted private records and server-authoritative session mutations before vendor writes. Never grant generic client writes to confirmation timestamps or publication state.
6. Connect the frontend only after permission tests pass. Store development settings in ignored .env; do not commit secrets or place a service-role key in frontend code.

Required database checks: negative/invalid prices rejected; partial/out-of-range coordinates rejected; sharing without consent rejected; expiry beyond session end/two hours rejected; anon/authenticated access denied. These checks are specifications, not executed test results.

No live coordinates, seed vendors, accounts or contact data are inserted. Unknown price is NULL, never zero by inference. Dates use timestamptz and display in Asia/Kolkata. The two-hour ceiling remains provisional. Schedules, exceptions, ownership, reports, audit and storage policies are subsequent migrations.

To continue hosted setup, identify the development project. Do not paste database passwords or service-role keys into chat. Production migration and rollback/recovery require an independently tested restore procedure.

## Running the foundation checks

After applying the migration in a development project, run tests/foundation.sql in the SQL editor as the database administrator. Expect the PASS notice and final ROLLBACK. On error, issue ROLLBACK before further SQL. The script inserts synthetic records inside a transaction, tests invalid prices/coordinates/consent/expiry, verifies a valid expiry boundary and checks RLS plus effective client privileges. It is specific to the initial deny-all foundation; update its expectations when reviewed read policies are introduced.

Local execution is currently unavailable: no psql, Supabase CLI or Docker executable was found on PATH. These checks have been prepared, not run. No connected development project has been supplied. Do not treat this file as evidence that permissions passed.
