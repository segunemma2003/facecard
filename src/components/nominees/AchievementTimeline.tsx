// Using API Achievement interface
interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url: string | null;
}

interface AchievementTimelineProps {
  achievements: Achievement[];
}

const AchievementTimeline = ({ achievements }: AchievementTimelineProps) => {
  // Sort achievements by date (newest first)
  const sortedAchievements = [...achievements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getYearFromDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString().slice(-2);
  };

  if (achievements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-face-grey/60 font-manrope">No achievements recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-face-sky-blue" />
      
      <div className="space-y-8">
        {sortedAchievements.map((achievement, index) => (
          <div key={achievement.id} className="relative ml-10">
            <div className="absolute -left-12 mt-1.5 h-8 w-8 rounded-full border-4 border-face-sky-blue bg-face-white flex items-center justify-center">
              <span className="text-xs font-bold text-face-sky-blue font-manrope">
                '{getYearFromDate(achievement.date)}
              </span>
            </div>
            
            <div className="rounded-lg border border-face-sky-blue/20 overflow-hidden bg-face-white shadow-sm hover:shadow-md transition-shadow">
              {achievement.image_url && (
                <img 
                  src={`${achievement.image_url}?w=600&h=200&fit=crop`}
                  alt={achievement.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-clash font-bold text-lg text-face-grey">{achievement.title}</h3>
                  <span className="text-xs text-face-sky-blue font-medium bg-face-sky-blue/10 px-2 py-1 rounded font-manrope">
                    {formatDate(achievement.date)}
                  </span>
                </div>
                <p className="text-face-grey/80 font-manrope leading-relaxed">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTimeline;