import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { format } from 'date-fns';
import sharp from 'sharp';

export const prerender = true;

export async function getStaticPaths() {
  const notes = await getCollection('notes');
  return notes.map((note) => ({
    params: { slug: note.slug },
    props: { note },
  }));
}

// Cache fonts and background image to avoid re-reading on every request
const fontPath = path.resolve('node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff');
const fontData = fs.readFileSync(fontPath);

const fontRegularPath = path.resolve('node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff');
const fontRegularData = fs.readFileSync(fontRegularPath);

// Use pre-converted PNG instead of converting WebP on every build
const bgPath = path.resolve('public/images/og.png');
const bgBuffer = fs.readFileSync(bgPath);
const bgBase64 = `data:image/png;base64,${bgBuffer.toString('base64')}`;

function getTitleFontSize(text: string): string {
  if (text.length > 60) return '56px';
  if (text.length > 40) return '64px';
  return '72px';
}

function getDescriptionFontSize(text: string): string {
  if (!text) return '36px';
  if (text.length > 150) return '28px';
  if (text.length > 100) return '32px';
  return '36px';
}

export async function GET({ props }) {
  const { note } = props;
  const { title, description, createdOn } = note.data;

  const height = 630;
  const width = 1200;

  const titleFontSize = getTitleFontSize(title);
  const descriptionFontSize = getDescriptionFontSize(description || '');

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          height: '100%',
          width: '100%',
          backgroundImage: `url('${bgBase64}')`,
          backgroundSize: '1200px 630px',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Geist Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                maxWidth: '900px',
                height: '100%',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#9ca3af', // Light gray
                      marginBottom: '20px',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                    },
                    children: format(createdOn, 'MMMM dd, yyyy'),
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: titleFontSize,
                      fontWeight: 700,
                      color: '#ffffff', // White
                      marginBottom: '24px',
                      lineHeight: 1.1,
                      letterSpacing: '-1px',
                    },
                    children: title,
                  },
                },
                description ? {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: descriptionFontSize,
                      color: '#d1d5db', // Lighter gray
                      lineHeight: 1.4,
                      fontWeight: 400,
                    },
                    children: description,
                  },
                } : null,
              ].filter(Boolean),
            },
          },
          // Branding footer
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '60px',
                left: '80px',
                fontSize: '24px',
                color: '#9ca3af',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                {
                    type: 'span',
                    props: {
                        style: { color: '#ffffff' },
                        children: 'Yash Agarwal'
                    }
                },
                {
                    type: 'span',
                    props: {
                        style: { margin: '0 10px', color: '#4b5563' },
                        children: '/'
                    }
                },
                {
                    type: 'span',
                    props: {
                        children: 'yashagarwal.in'
                    }
                }
              ],
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        {
          name: 'Geist Sans',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Geist Sans',
          data: fontRegularData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const image = resvg.render();

  // Optimize the PNG output
  const optimizedPng = await sharp(image.asPng())
    .png({ quality: 90, compressionLevel: 9 })
    .toBuffer();

  return new Response(optimizedPng, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}




