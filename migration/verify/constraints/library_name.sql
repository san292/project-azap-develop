-- Verify azap:constraints/libray_name on pg

BEGIN;

SELECT * FROM pg_constraint WHERE conname ='duplicates_library_name';

ROLLBACK;
