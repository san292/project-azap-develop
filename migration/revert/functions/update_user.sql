-- Revert azap:functions/update_user from pg

BEGIN;

-- delete function update_user.
DROP FUNCTION update_user(json);

COMMIT;
