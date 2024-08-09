const { supabase } = require("./supabase");

// async function getNearbyProfiles(uid: string, radius = 100) {
//   // Get the user's location
//   const { data: locationData, error: locationError } = await supabase
//     .from("profiles")
//     .select("location")
//     .eq("uid", uid)
//     .single();

//   if (locationError || !locationData?.location) {
//     throw new Error("Failed to retrieve user location");
//   }

//   const userLocation = JSON.parse(locationData.location);

//   // Get all profiles within the specified radius
//   const { data: profiles, error: profilesError } = await supabase
//     .from("profiles")
//     .select(
//       "*, ST_Distance(location::geography, ST_MakePoint($1, $2)::geography) AS distance",
//       userLocation.latitude,
//       userLocation.longitude
//     )
//     .lt("distance", radius * 1609.34); // Convert miles to meters

//   if (profilesError) {
//     throw new Error("Failed to retrieve nearby profiles");
//   }

//   // Filter profiles within the radius and add the distance field
//   return profiles
//     .filter((profile) => profile.distance <= radius)
//     .map((profile) => ({
//       ...profile,
//       distance: Math.round(profile.distance / 1609.34), // Convert meters to miles
//     }));
// }
