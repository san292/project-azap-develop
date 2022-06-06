-- Revert azap:functions/add_user from pg

BEGIN;

DROP FUNCTION add_user(json);

COMMIT;
