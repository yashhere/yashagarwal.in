
import { DiscussionEmbed } from 'disqus-react';

interface CommentsProps {
  url: string;
  slug: string;
}

export default function Comments({ url, slug }: CommentsProps) {
  const disqusShortname = "yashhere";
  const disqusConfig = {
    url,
    identifier: slug,
  };

  return (
    <div className="comments mt-8">
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}
