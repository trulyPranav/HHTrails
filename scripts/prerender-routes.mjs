import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SITE_URL =
  readEnvValue('VITE_SITE_URL')?.replace(/\/$/, '') || 'https://hhtrails.com';
const API_BASE_URL = readEnvValue('VITE_API_BASE_URL')?.replace(/\/$/, '');
const SKIP_ARTICLE_PRERENDER =
  (readEnvValue('SKIP_ARTICLE_PRERENDER') || '')
    .toString()
    .toLowerCase() === 'true' ||
  process.env.SKIP_ARTICLE_PRERENDER === 'true';

const BLOG_ROUTE = '/blog/';
const DEFAULT_OG_IMAGE_WIDTH = '1200';
const DEFAULT_OG_IMAGE_HEIGHT = '630';
const BLOG_META = {
  title: 'Blog - Stories from the Himalayas | Heritage Himalaya Trails',
  description:
    'Read travel stories, cultural insights, and heritage guides from Heritage Himalaya Trails. Explore articles about Ladakh, Buddhist traditions, and Himalayan life.',
  image: `${SITE_URL}/Blog.jpeg`,
  imageType: 'image/jpeg',
  imageWidth: '2560',
  imageHeight: '1338',
};

const distDir = path.resolve(process.cwd(), 'dist');
const sourceHtmlPath = path.join(distDir, 'index.html');

if (!existsSync(sourceHtmlPath)) {
  throw new Error(
    `Cannot prerender blog metadata because file does not exist: ${sourceHtmlPath}`,
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readEnvValue(key) {
  if (process.env[key]) {
    return process.env[key];
  }

  const envFilePaths = [
    path.resolve(process.cwd(), '.env.production'),
    path.resolve(process.cwd(), '.env'),
  ];

  for (const filePath of envFilePaths) {
    if (!existsSync(filePath)) continue;
    const raw = readFileSync(filePath, 'utf8');
    const lines = raw.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const index = trimmed.indexOf('=');
      if (index === -1) continue;

      const envKey = trimmed.slice(0, index).trim();
      if (envKey !== key) continue;

      const value = trimmed.slice(index + 1).trim();
      return value.replace(/^['"]|['"]$/g, '');
    }
  }

  return undefined;
}

function escapeAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertMetaTag(html, attr, key, content) {
  const safeKey = escapeRegExp(key);
  const tagRegex = new RegExp(
    `<meta\\s+[^>]*${attr}=["']${safeKey}["'][^>]*>`,
    'i',
  );
  const replacement = `    <meta ${attr}="${key}" content="${escapeAttr(content)}" />`;

  if (tagRegex.test(html)) {
    return html.replace(tagRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

function removeMetaTag(html, attr, key) {
  const safeKey = escapeRegExp(key);
  const tagRegex = new RegExp(
    `\\s*<meta\\s+[^>]*${attr}=["']${safeKey}["'][^>]*>\\s*`,
    'i',
  );

  return html.replace(tagRegex, '\n');
}

function upsertLinkTag(html, rel, href) {
  const safeRel = escapeRegExp(rel);
  const tagRegex = new RegExp(`<link\\s+[^>]*rel=["']${safeRel}["'][^>]*>`, 'i');
  const replacement = `    <link rel="${rel}" href="${escapeAttr(href)}" />`;

  if (tagRegex.test(html)) {
    return html.replace(tagRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

function upsertJsonLdTag(html, schemaId, value) {
  const safeId = escapeRegExp(schemaId);
  const tagRegex = new RegExp(
    `<script\\s+[^>]*type=["']application/ld\\+json["'][^>]*data-hht-schema=["']${safeId}["'][^>]*>[\\s\\S]*?<\\/script>`,
    'i',
  );
  const replacement =
    `    <script type="application/ld+json" data-hht-schema="${schemaId}">\n` +
    `${JSON.stringify(value, null, 2)}\n` +
    '    </script>';

  if (tagRegex.test(html)) {
    return html.replace(tagRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

function upsertTitleTag(html, title) {
  const replacement = `    <title>${escapeAttr(title)}</title>`;
  const titleRegex = /<title>[^<]*<\/title>/i;

  if (titleRegex.test(html)) {
    return html.replace(titleRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

function toAbsoluteUrl(url) {
  if (!url) return BLOG_META.image;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

function inferImageType(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    if (pathname.endsWith('.png')) return 'image/png';
    if (pathname.endsWith('.webp')) return 'image/webp';
    if (pathname.endsWith('.gif')) return 'image/gif';
    if (pathname.endsWith('.svg')) return 'image/svg+xml';
  } catch {
    // Fall back to jpeg if URL parsing fails.
  }

  return 'image/jpeg';
}

function formatRoute(route) {
  if (!route.startsWith('/')) return `/${route}`;
  return route;
}

function ensureTrailingSlashPath(routePath) {
  if (routePath === '/') return routePath;
  return routePath.endsWith('/') ? routePath : `${routePath}/`;
}

function encodeRouteSegment(segment) {
  const raw = String(segment || '').trim();
  if (!raw) return '';

  try {
    return encodeURIComponent(decodeURIComponent(raw));
  } catch {
    return encodeURIComponent(raw);
  }
}

function normalizePublishedDate(value) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function buildCollectionPageSchema(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${meta.url}#webpage`,
    name: meta.title,
    description: meta.description,
    url: meta.url,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: meta.image,
    },
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  };
}

function buildArticleSchema(meta, article) {
  const publishedAt = normalizePublishedDate(article.publishedDate);
  const updatedAt = normalizePublishedDate(article.updatedAt) || publishedAt;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${meta.url}#article`,
    headline: article.title || meta.title,
    description: meta.description,
    image: [meta.image],
    datePublished: publishedAt,
    dateModified: updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': meta.url,
    },
    author: {
      '@type': 'Person',
      name: article.authorName || 'Heritage Himalaya Trails',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Heritage Himalaya Trails',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/Logo_test.png`,
      },
    },
  };
}

function applySeoMetadata(sourceHtml, meta) {
  let html = sourceHtml;

  html = upsertTitleTag(html, meta.title);
  html = upsertMetaTag(html, 'name', 'description', meta.description);
  html = upsertMetaTag(
    html,
    'name',
    'robots',
    'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  );

  html = upsertMetaTag(html, 'property', 'og:type', meta.type);
  html = upsertMetaTag(html, 'property', 'og:site_name', 'Heritage Himalaya Trails');
  html = upsertMetaTag(html, 'property', 'og:title', meta.title);
  html = upsertMetaTag(html, 'property', 'og:description', meta.description);
  html = upsertMetaTag(html, 'property', 'og:image', meta.image);
  html = upsertMetaTag(html, 'property', 'og:image:secure_url', meta.image);
  html = upsertMetaTag(html, 'property', 'og:image:url', meta.image);
  html = upsertMetaTag(html, 'property', 'og:image:type', meta.imageType);
  html = upsertMetaTag(html, 'property', 'og:image:width', meta.imageWidth);
  html = upsertMetaTag(html, 'property', 'og:image:height', meta.imageHeight);
  html = upsertMetaTag(html, 'property', 'og:url', meta.url);

  html = upsertMetaTag(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMetaTag(html, 'name', 'twitter:site', '@HHTHimalaya');
  html = upsertMetaTag(html, 'name', 'twitter:title', meta.title);
  html = upsertMetaTag(html, 'name', 'twitter:description', meta.description);
  html = upsertMetaTag(html, 'name', 'twitter:image', meta.image);
  html = upsertMetaTag(html, 'name', 'twitter:image:src', meta.image);

  html = upsertLinkTag(html, 'canonical', meta.url);

  if (meta.type === 'article' && meta.publishedTime) {
    html = upsertMetaTag(
      html,
      'property',
      'article:published_time',
      meta.publishedTime,
    );
  } else {
    html = removeMetaTag(html, 'property', 'article:published_time');
  }

  if (meta.structuredData) {
    html = upsertJsonLdTag(html, 'hht-page-schema', meta.structuredData);
  }

  return html;
}

function writeRouteHtml(route, html) {
  const normalizedRoute = ensureTrailingSlashPath(formatRoute(route));
  const routeWithoutLeadingSlash = normalizedRoute.replace(/^\//, '');
  const targetPath = path.join(distDir, routeWithoutLeadingSlash, 'index.html');

  mkdirSync(path.dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, html, 'utf8');

  return targetPath;
}

function toPageMeta({
  route,
  title,
  description,
  image,
  type = 'website',
  imageType,
  imageWidth,
  imageHeight,
  publishedTime,
  structuredData,
}) {
  const normalizedRoute = ensureTrailingSlashPath(formatRoute(route));
  const absoluteImage = toAbsoluteUrl(image);

  return {
    title,
    description,
    image: absoluteImage,
    type,
    imageType: imageType || inferImageType(absoluteImage),
    imageWidth: imageWidth || DEFAULT_OG_IMAGE_WIDTH,
    imageHeight: imageHeight || DEFAULT_OG_IMAGE_HEIGHT,
    url: `${SITE_URL}${normalizedRoute}`,
    publishedTime,
    structuredData,
  };
}

function getApiBaseUrl() {
  if (API_BASE_URL) {
    return API_BASE_URL.replace(/\/$/, '');
  }

  return undefined;
}

async function fetchBlogsForPrerender() {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    const message =
      'Skipping article metadata prerender: VITE_API_BASE_URL is not configured.';

    if (SKIP_ARTICLE_PRERENDER) {
      console.warn(message + ' SKIP_ARTICLE_PRERENDER is enabled.');
      return [];
    }

    throw new Error(
      `${message} Set VITE_API_BASE_URL to a working API endpoint or SKIP_ARTICLE_PRERENDER=true to skip article prerendering.`,
    );
  }

  const blogs = [];
  let page = 1;
  const limit = 100;
  let totalPages = 1;

  while (page <= totalPages) {
    const endpoint = `${baseUrl}/blogs?page=${page}&limit=${limit}`;

    try {
      const response = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      const pageBlogs = payload?.data?.blogs;
      const pagination = payload?.data?.pagination;

      if (!Array.isArray(pageBlogs)) {
        throw new Error('Unexpected response shape from /blogs endpoint.');
      }

      blogs.push(...pageBlogs);

      if (typeof pagination?.totalPages === 'number' && pagination.totalPages > 0) {
        totalPages = pagination.totalPages;
      }

      page += 1;
    } catch (error) {
      const message = `Unable to fetch blog data for metadata prerender (${endpoint}): ${String(error)}`;
      console.error(message);

      if (SKIP_ARTICLE_PRERENDER) {
        console.warn(
          message +
            ' SKIP_ARTICLE_PRERENDER is enabled; article metadata prerendering will be skipped.',
        );
        return [];
      }

      throw new Error(
        `${message}\n` +
          'Blog metadata prerender failed. Ensure VITE_API_BASE_URL is configured to a working API endpoint during builds.',
      );
    }
  }

  return blogs;
}

async function main() {
  const sourceHtml = readFileSync(sourceHtmlPath, 'utf8');

  const blogIndexMeta = toPageMeta({
    route: BLOG_ROUTE,
    title: BLOG_META.title,
    description: BLOG_META.description,
    image: BLOG_META.image,
    imageType: BLOG_META.imageType,
    imageWidth: BLOG_META.imageWidth,
    imageHeight: BLOG_META.imageHeight,
  });
  blogIndexMeta.structuredData = buildCollectionPageSchema(blogIndexMeta);

  const blogHtml = applySeoMetadata(sourceHtml, blogIndexMeta);
  const blogOutputPath = writeRouteHtml(BLOG_ROUTE, blogHtml);
  console.log(`Prerendered metadata file: ${blogOutputPath}`);

  const blogs = await fetchBlogsForPrerender();
  if (blogs.length === 0) {
    console.log(
      'No blog articles were prerendered. Blog listing metadata is still generated.',
    );
    return;
  }

  let generatedCount = 0;

  for (const blog of blogs) {
    const encodedId = encodeRouteSegment(blog?.id);
    if (!encodedId || !blog?.title) continue;

    const route = `/blog/${encodedId}/`;
    const publishedTime = normalizePublishedDate(blog.publishedDate);
    const articleMeta = toPageMeta({
      route,
      title: `${blog.title} | Heritage Himalaya Trails`,
      description: blog.shortDescription || BLOG_META.description,
      image: blog.coverImageUrl || BLOG_META.image,
      type: 'article',
      publishedTime,
    });
    articleMeta.structuredData = buildArticleSchema(articleMeta, blog);

    const articleHtml = applySeoMetadata(sourceHtml, articleMeta);
    writeRouteHtml(route, articleHtml);
    generatedCount += 1;
  }

  console.log(
    `Prerendered article metadata pages: ${generatedCount} (out of ${blogs.length} blogs).`,
  );
}

await main();
