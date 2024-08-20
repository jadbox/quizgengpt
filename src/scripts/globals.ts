// icon field is a material-symbols icon name

export const GoalOrNeed: ActivityList = [
  { label: "Goal", icon: "person", val: "goal" },
  { label: "Need", icon: "favorite", val: "need" },
];

export const DefaultActivities: ActivityList = [
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

export const MarshallRosenbergNeeds: ActivityList = [
  { label: "Autonomy", icon: "person", val: "autonomy" },
  { label: "Connection", icon: "favorite", val: "connection" },
  { label: "Wellbeing", icon: "healing", val: "physical_wellbeing" },
  { label: "Honesty", icon: "verified", val: "honesty" },
  { label: "Play", icon: "sports_esports", val: "play" },
  { label: "Meaning", icon: "lightbulb", val: "meaning" },
  { label: "Learning", icon: "school", val: "learning" },
  { label: "Creativity", icon: "palette", val: "creativity" },
  { label: "Community", icon: "groups", val: "community" },
  { label: "Safety", icon: "security", val: "safety" },
  { label: "Rest", icon: "bedtime", val: "rest" },
  { label: "Contribution", icon: "volunteer_activism", val: "contribution" },
  { label: "Purpose", icon: "flag", val: "purpose" },
  { label: "Celebration", icon: "celebration", val: "celebration" },
];

// Shows an icon for misc other activities
export const OtherActivity: Activity = {
  label: "Other",
  icon: "more_horiz",
  val: "other",
};

export type ActivityList = Activity[];
export type Activity = {
  label: string;
  icon: string;
  val: string;
};

export const ActivityDef: string = `
[{
  label: string;
  icon: string; // material-symbols icon name
  val: string;
}]`;

// Define emotion list of 12 common task feelings while doing the activity. Use a list of objects: [{ label: "happy", icon: "material_icon_name", val: "happy" },]
export const FEELINGS: ActivityList = [
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
