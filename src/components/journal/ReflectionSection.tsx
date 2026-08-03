import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TextArea } from '../ui/Input';
import { Trophy, Lightbulb, Target, Sparkles } from 'lucide-react';

interface ReflectionSectionProps {
  win: string;
  setWin: (val: string) => void;
  lesson: string;
  setLesson: (val: string) => void;
  improve: string;
  setImprove: (val: string) => void;
  tomorrow: string;
  setTomorrow: (val: string) => void;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = memo(({
  win,
  setWin,
  lesson,
  setLesson,
  improve,
  setImprove,
  tomorrow,
  setTomorrow,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {/* Win of the Day */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <CardTitle>Win of the Day</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TextArea
            placeholder="What went well today? What accomplishment are you proud of?"
            value={win}
            onChange={(e) => setWin(e.target.value)}
            rows={3}
            aria-label="Win of the day"
          />
        </CardContent>
      </Card>

      {/* Lesson Learned */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-indigo-400" />
            <CardTitle>Key Lesson Learned</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TextArea
            placeholder="What insight, idea, or lesson did today teach you?"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            rows={3}
            aria-label="Key lesson learned"
          />
        </CardContent>
      </Card>

      {/* Area for Improvement */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-emerald-500" />
            <CardTitle>Area for Improvement</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TextArea
            placeholder="What could have gone better? How can you improve tomorrow?"
            value={improve}
            onChange={(e) => setImprove(e.target.value)}
            rows={3}
            aria-label="Area for improvement"
          />
        </CardContent>
      </Card>

      {/* Top Priority for Tomorrow */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <CardTitle>Tomorrow's Top Priority</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TextArea
            placeholder="What is your #1 goal or focus for tomorrow?"
            value={tomorrow}
            onChange={(e) => setTomorrow(e.target.value)}
            rows={3}
            aria-label="Tomorrow's top priority"
          />
        </CardContent>
      </Card>
    </div>
  );
});

ReflectionSection.displayName = 'ReflectionSection';
