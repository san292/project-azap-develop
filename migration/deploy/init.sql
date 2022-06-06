-- Deploy azap:init to pg

BEGIN;

-- Create domain email
CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
    CHECK(VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

-- Create user
CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email EMAIL NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    adult BOOLEAN DEFAULT false,
    role VARCHAR(50) NOT NULL
);

-- Create library
CREATE TABLE library (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    user_id int REFERENCES "user"(id)
);

-- Create movie
CREATE TABLE movie (
    id_themoviedb INT PRIMARY KEY,
    seen BOOLEAN DEFAULT false 
);

-- Create library_has_movie
CREATE TABLE library_has_movie (
    id_themoviedb INT REFERENCES movie(id_themoviedb) ON DELETE CASCADE,
    library_id INT REFERENCES library(id) ON DELETE CASCADE
);


COMMIT;
