import React, { memo } from 'react';
import { Card, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, FileText, FileType, FileCode } from 'lucide-react';

interface ExportCardProps {
  isExporting: boolean;
  onExportPDF: () => void;
  onExportDOCX: () => void;
  onExportTXT: () => void;
}

export const ExportCard: React.FC<ExportCardProps> = memo(({
  isExporting,
  onExportPDF,
  onExportDOCX,
  onExportTXT,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* PDF Export Card */}
      <Card hoverable className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
            <FileType className="w-6 h-6" />
          </div>
          <CardTitle>PDF Document</CardTitle>
          <CardDescription>
            Export a clean, formatted PDF version of your journal entries for printing or archiving.
          </CardDescription>
        </div>

        <Button
          variant="accent"
          size="md"
          icon={<Download className="w-4 h-4" />}
          onClick={onExportPDF}
          className="w-full"
        >
          Export PDF
        </Button>
      </Card>

      {/* Word (.docx) Export Card */}
      <Card hoverable className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <FileCode className="w-6 h-6" />
          </div>
          <CardTitle>Word Document (.docx)</CardTitle>
          <CardDescription>
            Export editable Microsoft Word .docx files structured by date and headings.
          </CardDescription>
        </div>

        <Button
          variant="secondary"
          size="md"
          icon={<Download className="w-4 h-4" />}
          disabled={isExporting}
          onClick={onExportDOCX}
          className="w-full"
        >
          {isExporting ? 'Generating...' : 'Export DOCX'}
        </Button>
      </Card>

      {/* Plain Text (.txt) Export Card */}
      <Card hoverable className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <CardTitle>Plain Text (.txt)</CardTitle>
          <CardDescription>
            Lightweight plain text export suitable for reading in any text editor or note app.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="md"
          icon={<Download className="w-4 h-4" />}
          onClick={onExportTXT}
          className="w-full"
        >
          Export TXT
        </Button>
      </Card>
    </div>
  );
});

ExportCard.displayName = 'ExportCard';
