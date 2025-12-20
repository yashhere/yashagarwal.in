import { getCollection } from 'astro:content';
import { format } from 'date-fns';
import { generateOGImage } from '../../lib/og-image';

export const prerender = true;

export async function getStaticPaths() {
  const notes = await getCollection('notes');
  return notes.map((note) => ({
    params: { slug: note.slug },
    props: { note },
  }));
}

export async function GET({ props }) {
  const { note } = props;
  const { title, description, createdOn } = note.data;

  const image = await generateOGImage({
    title,
    description,
    date: format(createdOn, 'MMMM dd, yyyy'),
  });

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}




