-- Deploy azap:functions/add_library to pg

BEGIN;

-- Create function for the library
CREATE FUNCTION add_library(json) RETURNS "library" AS $$
    INSERT INTO "library" (name, user_id)
    VALUES(
		$1->>'name', 
		($1->>'user_id')::int
	)
    RETURNING *
$$ LANGUAGE SQL STRICT;

COMMIT;
