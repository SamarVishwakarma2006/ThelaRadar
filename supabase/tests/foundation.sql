-- Run as project database administrator after the foundation migration.
-- Synthetic rows are rolled back. Any unexpected success aborts the test.
begin;
do $$
declare
 area uuid;
 vendor uuid;
 role_name text;
 table_name text;
 privilege_name text;
begin
 insert into public.areas(name) values('TEST ONLY') returning id into area;
 insert into public.vendors(area_id,name) values(area,'TEST ONLY') returning id into vendor;
 insert into public.offerings(vendor_id,name,category,price_inr) values(vendor,'Unknown price','snacks',null);
 begin
  insert into public.offerings(vendor_id,name,category,price_inr) values(vendor,'Invalid price','snacks',-1);
  raise exception 'FAIL: negative price accepted';
 exception when check_violation then null;
 end;
 begin
  update public.vendors set latitude=19 where id=vendor;
  raise exception 'FAIL: partial coordinates accepted';
 exception when check_violation then null;
 end;
 begin
  update public.vendors set latitude=91,longitude=0 where id=vendor;
  raise exception 'FAIL: invalid latitude accepted';
 exception when check_violation then null;
 end;
 begin
  update public.vendors set latitude=0,longitude=0,sharing=true where id=vendor;
  raise exception 'FAIL: sharing without consent accepted';
 exception when check_violation then null;
 end;
 begin
  insert into public.selling_sessions(vendor_id,confirmed_at,ends_at,expires_at)
  values(vendor,now(),now()+interval '4 hours',now()+interval '3 hours');
  raise exception 'FAIL: excessive freshness accepted';
 exception when check_violation then null;
 end;
 begin
  insert into public.selling_sessions(vendor_id,confirmed_at,ends_at,expires_at)
  values(vendor,now(),now()+interval '30 minutes',now()+interval '1 hour');
  raise exception 'FAIL: expiry beyond session end accepted';
 exception when check_violation then null;
 end;
 insert into public.selling_sessions(vendor_id,confirmed_at,ends_at,expires_at)
 values(vendor,now(),now()+interval '2 hours',now()+interval '2 hours');
 foreach table_name in array array['areas','vendors','offerings','selling_sessions'] loop
  if not (select relrowsecurity from pg_class where oid=format('public.%I',table_name)::regclass) then
   raise exception 'FAIL: RLS disabled on %',table_name;
  end if;
  foreach role_name in array array['anon','authenticated'] loop
   foreach privilege_name in array array['SELECT','INSERT','UPDATE','DELETE','TRUNCATE','REFERENCES','TRIGGER'] loop
    if has_table_privilege(role_name,format('public.%I',table_name),privilege_name) then
     raise exception 'FAIL: % has % on %',role_name,privilege_name,table_name;
    end if;
   end loop;
  end loop;
 end loop;
 raise notice 'PASS: foundation constraints and client privilege checks';
end $$;
rollback;
