create table "public"."profile" (
    "id" uuid not null,
    "username" text not null,
    "created_at" timestamp with time zone not null default now(),
    "full_name" text
);
alter table "public"."profile" enable row level security;
CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);
CREATE UNIQUE INDEX profile_username_key ON public.profile USING btree (username);
alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";
alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."profile" validate constraint "profile_id_fkey";
alter table "public"."profile" add constraint "profile_username_key" UNIQUE using index "profile_username_key";
create policy "Enable read access for all users"
on "public"."item"
as permissive
for select
to public
using (true);
create policy "Enable read access for all users"
on "public"."movie_detail"
as permissive
for select
to public
using (true);
create policy "authenticated users can read all profiles"
on "public"."profile"
as permissive
for select
to authenticated
using (true);
create policy "Authenticated users can see sent and received recommendations"
on "public"."recommendation"
as permissive
for select
to authenticated
using (((auth.uid() = sender_id) OR (auth.uid() = receiver_id)));
create policy "Authenticated users can send recommendations"
on "public"."recommendation"
as permissive
for insert
to authenticated
with check ((auth.uid() = sender_id));
