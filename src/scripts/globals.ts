export const activities = [
  { label: "exercise", icon: "fitness_center" },
  { label: "meditate", icon: "spa" },
  { label: "read", icon: "menu_book" },
  { label: "learn", icon: "school" },
  { label: "work", icon: "work" },
  { label: "socialize", icon: "people" },
  { label: "cook", icon: "restaurant" },
  { label: "clean", icon: "cleaning_services" },
  { label: "relax", icon: "self_improvement" },
  { label: "plan", icon: "event" },
  { label: "create", icon: "create" },
  { label: "connect", icon: "connect_without_contact" },
  { label: "reflect", icon: "emoji_objects" },
  { label: "organize", icon: "format_list_bulleted" },
  { label: "explore", icon: "explore" },
];

export type ActivityLabel = (typeof activities)[number]["label"];

// Note, this is a fake API call, in a real app you would fetch this data from a server to include custom activities
export async function getActivities() {
  return activities;
}
