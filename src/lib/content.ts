import { getCollection, type CollectionEntry } from 'astro:content';
import readingTime, { type ReadTimeResults } from 'reading-time';
import { compareDesc } from 'date-fns';

/**
 * Types
 */
export type NoteEntry = CollectionEntry<'notes'>;
export type NoteData = NoteEntry['data'];

/**
 * Get all notes, sorted by createdOn date (DESC)
 */
export async function getNotes(): Promise<NoteEntry[]> {
  const notes = await getCollection('notes');
  return notes.sort((a, b) =>
    compareDesc(a.data.createdOn, b.data.createdOn)
  );
}

/**
 * Get only published notes, sorted by date
 */
export async function getPreviewNotes(): Promise<NoteEntry[]> {
  const notes = await getNotes();
  return notes.filter((note) => note.data.status === 'published');
}

/**
 * Get a single note by slug
 */
export async function getNoteBySlug(slug: string): Promise<NoteEntry | undefined> {
  const notes = await getCollection('notes');
  return notes.find((note) => note.slug === slug);
}

/**
 * Calculate reading time for content
 */
export function getReadingTime(content: string): ReadTimeResults {
  return readingTime(content);
}

/**
 * Get all unique tags from published notes
 */
export async function getAllTags(): Promise<string[]> {
  const notes = await getPreviewNotes();
  const tags = new Set<string>();

  notes.forEach((note) => {
    note.data.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get all unique categories from published notes
 */
export async function getAllCategories(): Promise<string[]> {
  const notes = await getPreviewNotes();
  const categories = new Set<string>();

  notes.forEach((note) => {
    if (note.data.category) {
      categories.add(note.data.category);
    }
  });

  return Array.from(categories).sort();
}

/**
 * Get notes filtered by specific tag
 */
export async function getNotesByTag(tag: string): Promise<NoteEntry[]> {
  const notes = await getPreviewNotes();
  return notes.filter((note) =>
    note.data.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get notes filtered by category
 */
export async function getNotesByCategory(category: string): Promise<NoteEntry[]> {
  const notes = await getPreviewNotes();
  return notes.filter((note) =>
    note.data.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get related notes (naive implementation based on matching tags)
 * Returns up to 3 related notes
 */
export async function getRelatedNotes(slug: string): Promise<NoteEntry[]> {
  const allNotes = await getPreviewNotes();
  const currentNote = allNotes.find((note) => note.slug === slug);

  if (!currentNote) return [];

  const currentTags = currentNote.data.tags || [];

  return allNotes
    .filter((note) => note.slug !== slug) // Exclude current note
    .map((note) => {
      const intersection = (note.data.tags || []).filter((tag) =>
        currentTags.includes(tag)
      );
      return { note, score: intersection.length };
    })
    .sort((a, b) => b.score - a.score) // Sort by most matching tags
    .filter((item) => item.score > 0) // Must have at least one common tag
    .map((item) => item.note)
    .slice(0, 3);
}

/**
 * Get notes in the same series, sorted by series order
 */
export async function getSeriesNotes(seriesTitle: string): Promise<NoteEntry[]> {
  const notes = await getPreviewNotes();
  return notes
    .filter((note) => note.data.series?.title === seriesTitle)
    .sort((a, b) =>
      (a.data.series?.order || 0) - (b.data.series?.order || 0)
    );
}

/**
 * Get all notes that link to a specific slug (backlinks)
 * This searches for the slug in the raw content body
 */
export async function getBacklinks(slug: string): Promise<NoteEntry[]> {
  const notes = await getPreviewNotes();
  const searchSlugs = [`/notes/${slug}`, `/${slug}`, `(${slug})`];

  return notes.filter((note) => {
    if (note.slug === slug) return false;
    return searchSlugs.some(s => note.body.includes(s));
  });
}
