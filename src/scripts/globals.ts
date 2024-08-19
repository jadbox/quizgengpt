// icon field is a material-symbols icon name
export const activities = [
  { label: "Exercise", icon: "fitness_center", val: "exercise" },
  { label: "Meditate", icon: "self_improvement", val: "meditate" },
  { label: "Read", icon: "menu_book", val: "read" },
  { label: "Learn", icon: "school", val: "learn" },
  { label: "Work", icon: "work", val: "work" },
  { label: "Socialize", icon: "people", val: "socialize" },
  { label: "Cook", icon: "restaurant", val: "cook" },
  { label: "Clean", icon: "cleaning_services", val: "clean" },
  { label: "Relax", icon: "spa", val: "relax" },
  { label: "Plan", icon: "event", val: "plan" },
  { label: "Create", icon: "brush", val: "create" },
  { label: "Journal", icon: "edit_note", val: "journal" },
  { label: "Organize", icon: "inventory_2", val: "organize" },
  { label: "Project", icon: "build", val: "project" },
  { label: "Study", icon: "psychology", val: "study" },
];

// Shows an icon for misc other activities
const OtherActivity = { label: "Other", icon: "more_horiz", val: "other" };

// Define acions that user can select while performing the activity above. These actvity actions tracks.
export const activityActions = [];

// Define status of anny activity actions while performing them. Example: ["starting", "in progress", "paused", "completed"]
// tbd

// Define emotion list of 12 common task feelings while doing the activity. Use a list of objects: [{ label: "happy", icon: "material_icon_name", val: "happy" },]
export const FEELINGS = [
  { label: "happy", icon: "😄", val: "happy" },
  { label: "sad", icon: "😢", val: "sad" },
  { label: "angry", icon: "😡", val: "angry" },
  { label: "excited", icon: "🤩", val: "excited" },
  { label: "bored", icon: "😒", val: "bored" },
  { label: "tired", icon: "😴", val: "tired" },
  { label: "relaxed", icon: "😌", val: "relaxed" },
  { label: "stressed", icon: "😫", val: "stressed" },
  { label: "confused", icon: "😕", val: "confused" },
  { label: "focused", icon: "🧐", val: "focused" },
];

export type ActivityLabel = (typeof activities)[number]["label"];

// Note, this is a fake API call, in a real app you would fetch this data from a server to include custom activities
export async function getActivities() {
  return activities;
}

export async function getFeelings() {
  return FEELINGS;
}
