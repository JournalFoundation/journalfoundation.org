import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const podcast = await getCollection('podcast');
  
  return rss({
    title: 'Journal Foundation Podcast',
    description: 'Deep conversations about privacy, security, digital sovereignty, and building the post-surveillance web.',
    site: context.site,
    items: podcast.map((episode) => ({
      title: `Episode ${episode.data.episode}: ${episode.data.title}`,
      pubDate: episode.data.date,
      description: episode.data.description,
      link: `/podcast/${episode.slug}/`,
      enclosure: episode.data.audioFile ? {
        url: new URL(episode.data.audioFile, context.site).toString(),
        type: 'audio/mpeg',
        length: 0, // Would need to be calculated from actual file
      } : undefined,
    })),
    customData: `
      <language>en-US</language>
      <category>Technology</category>
      <category>Privacy</category>
      <category>Security</category>
      <itunes:author>John Benac</itunes:author>
      <itunes:subtitle>Building the infrastructure for digital sovereignty</itunes:subtitle>
      <itunes:summary>Deep conversations about privacy, security, digital sovereignty, and building the post-surveillance web.</itunes:summary>
      <itunes:owner>
        <itunes:name>Journal Foundation</itunes:name>
        <itunes:email>podcast@journalfoundation.org</itunes:email>
      </itunes:owner>
      <itunes:explicit>false</itunes:explicit>
      <itunes:category text="Technology">
        <itunes:category text="Privacy"/>
      </itunes:category>
      <itunes:image href="${new URL('/podcast-cover.jpg', context.site)}"/>
    `,
  });
}