-- Deploy azap:functions/add_user to pg

BEGIN;

CREATE FUNCTION add_user(json) RETURNS "user" AS $$
    INSERT INTO "user" (email, username, password, adult, role)
    VALUES(
		($1->>'email')::EMAIL, 
		$1->>'username', 
		$1->>'password', 
		($1->>'adult')::BOOLEAN,
        $1->>'role'
	)
    RETURNING *
$$ LANGUAGE SQL STRICT;

COMMIT;
