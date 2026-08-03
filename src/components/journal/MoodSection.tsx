import React, { memo } from 'react';
import type { MoodRating } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { MoodSelector } from '../ui/MoodSelector';

interface MoodSectionProps {
  mood: MoodRating;
  onChange: (mood: MoodRating) => void;
}

export const MoodSection: React.FC<MoodSectionProps> = memo(({ mood, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>1. How was your day?</CardTitle>
          <CardDescription>Select your overall mood for today</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <MoodSelector value={mood} onChange={onChange} />
      </CardContent>
    </Card>
  );
});

MoodSection.displayName = 'MoodSection';
