-- Revert azap:functions/add_library from pg

BEGIN;

-- Delete function add_library.
DROP FUNCTION add_library(json);

COMMIT;
