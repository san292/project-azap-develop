-- Revert azap:functions/update_library from pg

BEGIN;

-- delete function update_library.
DROP FUNCTION update_library(json);

COMMIT;
