-- Deploy azap:functions/update_user to pg

BEGIN;

-- Create function to update user in database.
CREATE FUNCTION update_user(json) RETURNS void AS $$
    UPDATE "user" SET
		email=($1->>'email')::EMAIL, 
		username=$1->>'username', 
		password=$1->>'password', 
		adult=($1->>'adult')::BOOLEAN,
        role=$1->>'role'
        WHERE id=($1->>'id')::int
$$ LANGUAGE SQL STRICT;

COMMIT;
