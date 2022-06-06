-- Deploy azap:functions/update_library to pg

BEGIN;

-- Create function to update library in database.
CREATE FUNCTION update_library(json) RETURNS void AS $$
    UPDATE "library" SET
		name=$1->>'name', 
		user_id=($1->>'user_id')::int
		WHERE id=($1->>'id')::int
$$ LANGUAGE SQL STRICT;

COMMIT;
