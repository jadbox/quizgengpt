export const activities = [
  { label: "exercise", icon: "fitness_center", val: "exercise" },
  { label: "meditate", icon: "spa", val: "meditate" },
  { label: "read", icon: "menu_book", val: "read" },
  { label: "learn", icon: "school", val: "learn" },
  { label: "work", icon: "work", val: "work" },
  { label: "socialize", icon: "people", val: "socialize" },
  { label: "cook", icon: "restaurant", val: "socialize" },
  { label: "clean", icon: "cleaning_services", val: "clean" },
  { label: "relax", icon: "self_improvement", val: "relax" },
  { label: "make plan", icon: "event", val: "plan" },
  { label: "create", icon: "create", val: "create" },
  { label: "connect", icon: "connect_without_contact", clean: "connect" },
  { label: "reflect", icon: "emoji_objects", val: "reflect" },
  { label: "organize", icon: "format_list_bulleted", val: "organize" },
  { label: "explore", icon: "explore", val: "explore" },
];

export type ActivityLabel = (typeof activities)[number]["label"];

// Note, this is a fake API call, in a real app you would fetch this data from a server to include custom activities
export async function getActivities() {
  return activities;
}
