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

// Define acions that user can select while performing the activity above. These actvity actions tracks.
// export const activityActions = {
//   exercise: ["run", "yoga", "walk", "swim", "cycle"],
//   meditate: ["breath", "mindfulness", "guided", "chanting", "mantra"],
//   read: ["book", "article", "blog", "research", "study"],
//   learn: ["course", "workshop", "tutorial", "seminar", "webinar"],
//   work: ["project", "meeting", "email", "call", "presentation"],
//   socialize: ["meet", "call", "chat", "party", "event"],
//   cook: ["meal", "snack", "dessert", "drink", "bake"],
//   clean: ["room", "closet", "kitchen", "bathroom", "garage"],
//   relax: ["nap", "bath", "massage", "movie", "music"],
//   plan: ["day", "week", "month", "year", "life"],
//   create: ["art", "craft", "music", "dance", "writing"],
//   connect: ["friend", "family", "colleague", "community", "stranger"],
//   reflect: ["journal", "meditate", "walk", "talk", "write"],
//   organize: ["desk", "closet", "kitchen", "bathroom", "garage"],
//   explore: ["nature", "city", "culture", "food", "history"],
// };

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
