-- Revert azap:constraints/libray_name from pg

BEGIN;

ALTER TABLE library
    DROP CONSTRAINT duplicates_library_name;

COMMIT;
