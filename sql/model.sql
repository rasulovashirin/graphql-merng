create database merng_app;

create extension pgcrypto;

create table users(
    user_id serial not null primary key,
    username varchar(64) not null,
    user_password varchar(60) not null,
    user_email varchar(200) not null,
    token text,
    created_at timestamptz default current_timestamp
);

create table posts (
    post_id serial not null primary key,
    user_id int not null references users(user_id),
    post_body text not null,
    created_at timestamptz default current_timestamp
);

create table comments (
    comment_id serial not null primary key,
    user_id int not null references users(user_id),
    comment_body text not null,
    post_id int not null references posts(post_id),
    created_at timestamptz default current_timestamp
);

create table likes (
    like_id serial not null primary key,
    user_id int not null references users(user_id),
    post_id int not null references posts(post_id),
    created_at timestamptz default current_timestamp
);

insert into users(username, user_password, user_email) values ('Janny Doe', crypt('12345', gen_salt('bf')), 'janny@gmail.com');

insert into posts(user_id, post_body) values (1, 'In the statement, we only specified a value for the message column, therefore, other columns got the default values. Third, check whether the row was inserted into the log table with the created_at column populated correctly by using the following query');

insert into comments(user_id, comment_body, post_id) values (2, 'How useful post', 1);

insert into likes(user_id, post_id) values (3, 1);