# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio website for Alexander Bolaño (Senior Data Engineer), hosted on GitHub Pages at **datexland.com**. No build tools, bundlers, or frameworks — pure HTML/CSS/JS.

## Development

Open `index.html` directly in a browser. No build step, no dev server required.

## Architecture

Single-page site:

- **index.html** — All content and structure. Sections: Hero (with matrix rain canvas + floating counters), Awards, Featured Articles, Testimonials, Contact. Includes JSON-LD structured data, Open Graph, and Twitter Card meta tags for SEO.
- **style.css** — Dark theme using CSS custom properties (`:root` variables). Responsive breakpoints at 1024px, 768px, and 480px. Floating counters hidden on screens ≤1024px. Scroll reveal animations on sections. CTA glow pulse on primary buttons.
- **script.js** — Animations initialized on DOMContentLoaded: wave text, counter increments, typewriter subtitle, matrix rain canvas (throttled to ~15fps, paused via IntersectionObserver when hero not visible), scroll reveal (IntersectionObserver), and procedural ambient sound (Web Audio API).
- **media/** — Static images (award photos, testimonial headshot, logo).
- **robots.txt** / **sitemap.xml** — SEO crawling directives and sitemap for search engines.

## Key Design Patterns

- CSS custom properties in `:root` control the color scheme (`--accent-color: #00FFFF`, `--bg-color: #121212`) and typography (`Inter` + `Source Code Pro`).
- The "Courses" counter (`center-counter`) wanders randomly via JS repositioning every 6s with CSS transitions; the other two counters use CSS `float` keyframe animation.
- Subtitle phrases array in `script.js` (line ~95) controls the rotating typewriter text — each entry has `text` and a Font Awesome `icon` class. Edit there to update messaging.
- Counter target values are set via `data-target` attributes on `.count` elements in `index.html` (Awards: 2, Courses: 2, Students: 1900+).
- JSON-LD structured data in `index.html` `<head>` must be kept in sync when changing job title, social links, or description.
- **Matrix rain**: `<canvas id="matrix-canvas">` in the hero section, rendered by JS with cyan characters (hex + katakana). Canvas opacity is 0.15 via CSS. IntersectionObserver pauses rendering when hero scrolls off-screen.
- **Ambient sound**: Procedural audio via Web Audio API — 3 layers (55Hz drone, 220Hz shimmer with LFO, bandpass-filtered white noise). Master gain at 0.3 (30%). Triggered only on user click of the sound toggle button (bottom-right fixed). No audio files needed.
- **Scroll reveal**: Sections start with `opacity: 0; transform: translateY(30px)` and get `.revealed` class via IntersectionObserver. Hero section is always visible (excluded).
- External dependencies: Google Fonts, Font Awesome 6.5.1 (CDN), Google Maps embed. No new external deps added.
- Google Analytics (GA4) is loaded via the HTML.

## Deployment

Push to `main` branch → GitHub Pages serves automatically. The `CNAME` file maps to `datexland.com`.
