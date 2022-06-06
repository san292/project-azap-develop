-- Deploy azap:constraints/libray_name to pg

BEGIN;

-- add constraint on library name
ALTER TABLE library
    ADD CONSTRAINT duplicates_library_name UNIQUE (id, name);
    
COMMIT;
