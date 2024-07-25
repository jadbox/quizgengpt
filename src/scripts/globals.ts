export const activities = [
  { label: "study", icon: "school" },
  { label: "work", icon: "work" },
  { label: "relax", icon: "self_improvement" },
  { label: "family", icon: "family_restroom" },
  { label: "friends", icon: "people" },
  { label: "date", icon: "favorite" },
  { label: "sport", icon: "directions_run" },
  { label: "party", icon: "celebration" },
  { label: "movies", icon: "movie" },
  { label: "reading", icon: "menu_book" },
  { label: "gaming", icon: "sports_esports" },
  { label: "shopping", icon: "shopping_cart" },
  { label: "good meal", icon: "restaurant" },
  { label: "cleaning", icon: "cleaning_services" },
  { label: "transit", icon: "directions_transit" },
  { label: "school", icon: "edit" },
];

export type ActivityLabel = typeof activities[number]['label'];

// Note, this is a fake API call, in a real app you would fetch this data from a server to include custom activities
export async function getActivities() {
  return activities;
}
