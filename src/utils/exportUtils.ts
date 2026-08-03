import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import type { JournalEntry, UserSettings } from '../types/journal';
import { formatDisplayDate } from './dateUtils';
import { db } from '../db/database';

const moodEmojiMap: Record<number, string> = {
  1: 'Terrible 😖',
  2: 'Low 🙁',
  3: 'Okay 😐',
  4: 'Good 🙂',
  5: 'Great 🤩',
};

/**
 * Downloads a blob file in the browser.
 */
function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports entries as clean plain TXT.
 */
export function exportToTXT(entries: JournalEntry[]) {
  if (!entries || entries.length === 0) return;

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let textContent = `DAILY FORGE — JOURNAL EXPORT\n`;
  textContent += `Generated: ${new Date().toLocaleString()}\n`;
  textContent += `Total Entries: ${sorted.length}\n`;
  textContent += `===========================================\n\n`;

  for (const entry of sorted) {
    const formattedDate = formatDisplayDate(entry.date, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const moodStr = moodEmojiMap[entry.mood] || 'Good';

    textContent += `DATE: ${formattedDate} (${entry.date})\n`;
    textContent += `MOOD: ${moodStr}\n`;

    if (entry.win) textContent += `WIN OF THE DAY: ${entry.win}\n`;
    if (entry.lesson) textContent += `KEY LESSON: ${entry.lesson}\n`;
    if (entry.improve) textContent += `AREA FOR IMPROVEMENT: ${entry.improve}\n`;
    if (entry.tomorrow) textContent += `TOMORROW'S FOCUS: ${entry.tomorrow}\n`;

    if (entry.habits && entry.habits.length > 0) {
      textContent += `HABITS:\n`;
      for (const h of entry.habits) {
        textContent += `  [${h.completed ? 'X' : ' '}] ${h.name}\n`;
      }
    }

    if (entry.tasks && entry.tasks.length > 0) {
      textContent += `TASKS:\n`;
      for (const t of entry.tasks) {
        textContent += `  [${t.completed ? 'X' : ' '}] ${t.text}\n`;
      }
    }

    if (entry.notes) {
      textContent += `NOTES:\n${entry.notes}\n`;
    }

    textContent += `-------------------------------------------\n\n`;
  }

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  downloadFile(blob, `DailyForge_Journal_${new Date().toISOString().split('T')[0]}.txt`);
}

/**
 * Exports entries as structured PDF using jsPDF.
 */
export function exportToPDF(entries: JournalEntry[]) {
  if (!entries || entries.length === 0) return;

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const doc = new jsPDF();
  let y = 20;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129); // Emerald accent
  doc.text('Daily Forge — Journal Export', 14, y);
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | Total Entries: ${sorted.length}`, 14, y);
  y += 12;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);
  y += 10;

  for (const entry of sorted) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    const dateStr = formatDisplayDate(entry.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const moodStr = moodEmojiMap[entry.mood] || 'Good';

    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`${dateStr} — Mood: ${moodStr}`, 14, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);

    if (entry.win) {
      const winLines = doc.splitTextToSize(`Win: ${entry.win}`, 180);
      doc.text(winLines, 14, y);
      y += winLines.length * 5;
    }

    if (entry.lesson) {
      const lessonLines = doc.splitTextToSize(`Lesson: ${entry.lesson}`, 180);
      doc.text(lessonLines, 14, y);
      y += lessonLines.length * 5;
    }

    if (entry.notes) {
      const notesLines = doc.splitTextToSize(`Notes: ${entry.notes}`, 180);
      doc.text(notesLines, 14, y);
      y += notesLines.length * 5;
    }

    y += 6;
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y, 196, y);
    y += 8;
  }

  doc.save(`DailyForge_Journal_${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Exports entries as Microsoft Word .docx document using docx.
 */
export async function exportToDOCX(entries: JournalEntry[]) {
  if (!entries || entries.length === 0) return;

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: 'Daily Forge — Journal Export',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Export Date: ${new Date().toLocaleDateString()} | Total Entries: ${sorted.length}`,
          italics: true,
          color: '64748B',
        }),
      ],
      spacing: { after: 400 },
    }),
  ];

  for (const entry of sorted) {
    const formattedDate = formatDisplayDate(entry.date, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const moodStr = moodEmojiMap[entry.mood] || 'Good';

    paragraphs.push(
      new Paragraph({
        text: `${formattedDate} — Mood: ${moodStr}`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
      })
    );

    if (entry.win) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Win of the Day: ', bold: true }),
            new TextRun(entry.win),
          ],
          spacing: { after: 80 },
        })
      );
    }

    if (entry.lesson) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Key Lesson: ', bold: true }),
            new TextRun(entry.lesson),
          ],
          spacing: { after: 80 },
        })
      );
    }

    if (entry.notes) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Notes: ', bold: true }),
            new TextRun(entry.notes),
          ],
          spacing: { after: 120 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadFile(blob, `DailyForge_Journal_${new Date().toISOString().split('T')[0]}.docx`);
}

/**
 * Exports complete JSON backup file for data migration & backup.
 */
export function exportToJSON(entries: JournalEntry[], settings: UserSettings) {
  const backupData = {
    version: 1,
    appName: 'Daily Forge',
    exportedAt: new Date().toISOString(),
    settings,
    entries,
  };

  const jsonString = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, `DailyForge_Backup_${new Date().toISOString().split('T')[0]}.json`);
}

export interface ImportResult {
  success: boolean;
  importedCount: number;
  updatedCount: number;
  message: string;
}

/**
 * Validates whether an imported journal entry object satisfies the schema.
 */
function isValidJournalEntry(obj: unknown): obj is JournalEntry {
  if (typeof obj !== 'object' || obj === null) return false;
  const e = obj as Record<string, unknown>;

  if (typeof e.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) return false;
  if (typeof e.mood !== 'number' || e.mood < 1 || e.mood > 5) return false;

  if (e.habits !== undefined && !Array.isArray(e.habits)) return false;
  if (e.tasks !== undefined && !Array.isArray(e.tasks)) return false;

  return true;
}

/**
 * Imports JSON backup file into Dexie IndexedDB with strict schema & version validation.
 */
export async function importFromJSON(jsonString: string): Promise<ImportResult> {
  try {
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(jsonString);
    } catch {
      return { success: false, importedCount: 0, updatedCount: 0, message: 'Invalid JSON file structure.' };
    }

    if (!data || typeof data !== 'object') {
      return { success: false, importedCount: 0, updatedCount: 0, message: 'Backup file is empty or corrupted.' };
    }

    // Version & App Validation
    if (data.appName && data.appName !== 'Daily Forge') {
      return { success: false, importedCount: 0, updatedCount: 0, message: 'Backup file belongs to a different app.' };
    }

    if (data.version !== 1) {
      return { success: false, importedCount: 0, updatedCount: 0, message: 'Unsupported backup schema version.' };
    }

    if (!Array.isArray(data.entries)) {
      return { success: false, importedCount: 0, updatedCount: 0, message: 'Missing "entries" array in backup file.' };
    }

    let createdCount = 0;
    let updatedCount = 0;

    for (const item of data.entries) {
      if (!isValidJournalEntry(item)) {
        continue; // Skip invalid entries silently
      }

      const existing = await db.journalEntries.where('date').equals(item.date).first();
      if (existing && existing.id) {
        // Strip id from imported item to preserve local primary key
        const { id: _ignoredId, ...entryToUpdate } = item;
        await db.journalEntries.update(existing.id, entryToUpdate);
        updatedCount++;
      } else {
        const { id: _ignoredId, ...entryToAdd } = item;
        await db.journalEntries.add(entryToAdd as JournalEntry);
        createdCount++;
      }
    }

    const totalProcessed = createdCount + updatedCount;
    if (totalProcessed === 0) {
      return { success: false, importedCount: 0, updatedCount: 0, message: 'No valid journal entries found in backup file.' };
    }

    return {
      success: true,
      importedCount: createdCount,
      updatedCount,
      message: `Import complete! Added ${createdCount} new entry(s), updated ${updatedCount} existing entry(s).`,
    };
  } catch (err) {
    console.error('Import error:', err);
    return { success: false, importedCount: 0, updatedCount: 0, message: 'An unexpected error occurred during import.' };
  }
}
