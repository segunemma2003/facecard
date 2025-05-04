
import { Globe, Users, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CategoryStatsProps {
  stats: {
    countries: { name: string; percentage: number }[];
    gender: { male: number; female: number; other: number };
    impactLevel: { high: number; medium: number; emerging: number };
  };
}

const CategoryStats = ({ stats }: CategoryStatsProps) => {
  return (
    <>
      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <Globe className="h-4 w-4 mr-2" /> Country Distribution
        </h4>
        <div className="space-y-2">
          {stats.countries.map((country, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{country.name}</span>
                <span>{country.percentage}%</span>
              </div>
              <Progress value={country.percentage} className="h-1" />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <Users className="h-4 w-4 mr-2" /> Gender Breakdown
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 p-2 rounded-md text-center">
            <div className="font-medium text-blue-600">{stats.gender.male}%</div>
            <div className="text-xs text-gray-600">Male</div>
          </div>
          <div className="bg-red-50 p-2 rounded-md text-center">
            <div className="font-medium text-red-600">{stats.gender.female}%</div>
            <div className="text-xs text-gray-600">Female</div>
          </div>
          <div className="bg-purple-50 p-2 rounded-md text-center">
            <div className="font-medium text-purple-600">{stats.gender.other}%</div>
            <div className="text-xs text-gray-600">Other</div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <BarChart2 className="h-4 w-4 mr-2" /> Industry Impact Level
        </h4>
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>High Impact</span>
              <span>{stats.impactLevel.high}%</span>
            </div>
            <Progress value={stats.impactLevel.high} className="h-1 bg-gray-100" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Medium Impact</span>
              <span>{stats.impactLevel.medium}%</span>
            </div>
            <Progress value={stats.impactLevel.medium} className="h-1 bg-gray-100" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Emerging Impact</span>
              <span>{stats.impactLevel.emerging}%</span>
            </div>
            <Progress value={stats.impactLevel.emerging} className="h-1 bg-gray-100" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryStats;
