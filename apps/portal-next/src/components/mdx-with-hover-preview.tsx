'use client';

import { MDXContent } from '@/components/mdx-content';
import { WikiLinkPreview } from '@/components/biblioteca/wikilink-preview';
import type { ComponentProps } from 'react';

type AnchorProps = ComponentProps<'a'>;

/** Interceptor: si <a> tiene class 'wikilink', usa WikiLinkPreview con HoverCard. */
function SmartAnchor({ href, className, children, ...rest }: AnchorProps) {
  const isWikiLink = typeof className === 'string' && className.includes('wikilink');
  if (isWikiLink && typeof href === 'string') {
    return (
      <WikiLinkPreview href={href} className={className}>
        {children}
      </WikiLinkPreview>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

const HOVER_COMPONENTS = {
  a: SmartAnchor as never,
};

/** Drop-in replacement for MDXContent that activates hover-preview en wikilinks. */
export function MDXWithHoverPreview({ code }: Readonly<{ code: string }>) {
  return <MDXContent code={code} components={HOVER_COMPONENTS} />;
}
