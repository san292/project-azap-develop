-- Revert azap:init from pg

BEGIN;

-- Drop all table.
DROP TABLE library_has_movie;
DROP TABLE movie;
DROP TABLE library;
DROP TABLE "user";
DROP DOMAIN email;
DROP EXTENSION citext;

COMMIT;
