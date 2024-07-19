import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";

const activities = [
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
  { label: "edit/new", icon: "add_circle" },
];

const ActivitySelector: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleIconClick = (activity: string) => {
    setSelectedActivity(activity);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4 md:grid-cols-5 mt-4">
        {activities.map((activity) => (
          <div
            key={activity.label}
            className={`flex flex-col items-center text-center text-purple-500 cursor-pointer`}
            onClick={() => handleIconClick(activity.label)}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-2 ${selectedActivity === activity.label ? 'border-4 border-purple-500' : 'border-2 border-gray-200'}`}>
              <span className="material-icons text-3xl">{activity.icon}</span>
            </div>
            <p className="text-xs">{activity.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 my-4">
        <Switch
          checked={toggle}
          onClick={() => setToggle(toggle => !toggle)}
          className='data-[state=checked]:bg-green-600'
        />
        <span className="text-slate-600">Set goal or Goal Completed?</span>
      </div>
    </>
  );
};

export default ActivitySelector;
