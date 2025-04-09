drop table if exists projects;

drop type if exists project_status;
create type current_status as enum ( 'in_progress', 'completed');
create table projects (
    id bigint primary key generated always as identity not null,
    created_at timestamp with time zone default now(),
    name text not null,
    description text not null,
    slug text unique not null,
    status current_status not null default 'in_progress',
    collaborators text array not null default array[]::varchar[]
);