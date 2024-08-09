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
