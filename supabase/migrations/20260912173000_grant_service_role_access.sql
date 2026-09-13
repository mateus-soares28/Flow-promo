grant usage on schema public to service_role;
grant select, insert, update, delete on public.profiles to service_role;
grant select, insert, update, delete on public.plans to service_role;
grant select, insert, update, delete on public.subscriptions to service_role;
grant select, insert, update, delete on public.whatsapp_connections to service_role;
grant select, insert, update, delete on public.groups to service_role;
grant select, insert, update, delete on public.offers to service_role;
grant select, insert, update, delete on public.dispatches to service_role;
grant usage, select on all sequences in schema public to service_role;
