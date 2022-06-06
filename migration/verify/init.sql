-- Verify azap:init on pg

BEGIN;

-- Verify all table.
SELECT * FROM pg_type WHERE typname = 'email'; -- vérication de la création du domaine (pg_type est une table "caché" créé par postgres)
SELECT * FROM "user" WHERE false;
SELECT * FROM library WHERE false;
SELECT * FROM movie WHERE false;
SELECT * FROM library_has_movie WHERE false;

ROLLBACK;
