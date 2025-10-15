# Journal Foundation Website

Complete Astro project for journalfoundation.org with blog, podcast, specs, and whitepapers.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:4321
```

## Project Structure

- **Blog**: Markdown posts in `src/content/blog/`
- **Podcast**: Episodes in `src/content/podcast/`
- **Specs**: RFCs in `src/content/specs/`
- **Whitepapers**: Academic papers in `src/content/whitepapers/`

## Content Management

### Adding Blog Posts

Create files in `src/content/blog/` with frontmatter:

```markdown
---
title: "Post Title"
description: "Brief description"
date: 2025-01-15
author: "John Benac"
tags: ["tag1", "tag2"]
---

Content here...
```

### Adding RFCs

Create files in `src/content/specs/` with frontmatter:

```markdown
---
rfc: 2
title: "RFC Title"
status: "Draft"
date: 2025-01-15
authors: ["John Benac"]
abstract: "Brief abstract"
---

RFC content...
```

## Deployment

### Local Testing
```bash
npm run build
npm run preview
```

### Production Deploy
```bash
npm run build
# Deploy dist/ directory to your static host
```

## Privacy & Security

- Zero trackers by default
- Self-hostable
- No JavaScript required
- Security headers configured
- Privacy-first design

## License

Apache 2.0