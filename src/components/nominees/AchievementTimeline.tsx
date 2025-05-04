
import { NomineeAchievement } from '@/models/nomineeData';

interface AchievementTimelineProps {
  achievements: NomineeAchievement[];
}

const AchievementTimeline = ({ achievements }: AchievementTimelineProps) => {
  // Sort achievements by date (assuming date is a string that can be compared)
  const sortedAchievements = [...achievements].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-face-gold" />
      
      <div className="space-y-8">
        {sortedAchievements.map((achievement) => (
          <div key={achievement.id} className="relative ml-10">
            <div className="absolute -left-12 mt-1.5 h-8 w-8 rounded-full border-4 border-face-gold bg-white flex items-center justify-center">
              <span className="text-xs font-bold">{achievement.date}</span>
            </div>
            
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              {achievement.imageUrl && (
                <img 
                  src={`${achievement.imageUrl}?w=600&h=200&fit=crop`}
                  alt={achievement.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-serif font-bold text-lg">{achievement.title}</h3>
                <p className="mt-2 text-gray-600">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTimeline;
