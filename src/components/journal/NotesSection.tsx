import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TextArea } from '../ui/Input';
import { FileText } from 'lucide-react';

interface NotesSectionProps {
  notes: string;
  setNotes: (val: string) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = memo(({ notes, setNotes }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 accent-text" />
          <CardTitle>Freeform Journal Notes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <TextArea
          placeholder="Write down any extra thoughts, ideas, or reflection for today..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          aria-label="Freeform journal notes"
        />
      </CardContent>
    </Card>
  );
});

NotesSection.displayName = 'NotesSection';
