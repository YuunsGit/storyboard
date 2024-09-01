create extension pg_graphql;

create role anon;

grant usage on schema public to anon;
alter default privileges in schema public grant all on tables to anon;
alter default privileges in schema public grant all on functions to anon;
alter default privileges in schema public grant all on sequences to anon;

grant usage on schema graphql to anon;
grant all on function graphql.resolve to anon;

alter default privileges in schema graphql grant all on tables to anon;
alter default privileges in schema graphql grant all on functions to anon;
alter default privileges in schema graphql grant all on sequences to anon;


-- GraphQL Entrypoint
create function graphql(
    "operationName" text default null,
    query text default null,
    variables jsonb default null,
    extensions jsonb default null
)
    returns jsonb
    language sql
as $$
    select graphql.resolve(
        query := query,
        variables := coalesce(variables, '{}'),
        "operationName" := "operationName",
        extensions := extensions
    );
$$;

CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL,
    version_number INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES public.lessons(id)
);

CREATE TABLE public.storyboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    position INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES public.lessons(id),
    FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storyboard_id UUID NOT NULL,
    name TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storyboard_id) REFERENCES public.storyboards(id)
);

CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storyboard_id UUID NOT NULL,
    user_id UUID NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storyboard_id) REFERENCES public.storyboards(id),
    FOREIGN KEY (user_id) REFERENCES public.users(id)
);

insert into public.users(email, username, password, created_at)
values
    ('yunus@st.com', 'yunusemre', 'topsecretpass', now()),
    ('emre@st.com', 'emre', 'indestructiblepass', now());

insert into public.lessons(title, created_at)
values
    ('Welcome', now()),
    ('Lesson 2', now()),
    ('Lesson 3', now());

insert into public.versions(lesson_id, version_number, created_at)
values
    ((SELECT id FROM public.lessons WHERE title = 'Welcome'), 1, now()),
    ((SELECT id FROM public.lessons WHERE title = 'Welcome'), 2, now()),
    ((SELECT id FROM public.lessons WHERE title = 'Lesson 2'), 1, now()),
    ((SELECT id FROM public.lessons WHERE title = 'Lesson 3'), 1, now());

comment on schema public is '@graphql({"inflect_names": true})';