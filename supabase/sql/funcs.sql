create
or replace function get_nearest_profiles (user_id uuid, limit_count integer) returns table (
  id uuid,
  username text,
  last_post timestamp with time zone,
  status text,
  distance float
) as $$ BEGIN RETURN QUERY SELECT profiles.id, profiles.username, profiles.last_post, profiles.status, profiles.location, 
ST_Distance(profiles.location, (SELECT p.location FROM profiles p WHERE p.id = user_id)) * 0.000621371192 AS distance 
FROM profiles WHERE profiles.id != user_id AND profiles.last_post is not null
ORDER BY distance ASC, last_post DESC 
LIMIT limit_count; END; $$ language plpgsql;