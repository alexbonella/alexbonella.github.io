# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio website for Alexander Bolaño (Senior Data Engineer), hosted on GitHub Pages at **datexland.com**. No build tools, bundlers, or frameworks — pure HTML/CSS/JS.

## Development

Open `index.html` directly in a browser. No build step, no dev server required.

## Architecture

Single-page site with four files:

- **index.html** — All content and structure. Sections: Hero (with floating counters), Awards, Testimonials, Contact. Includes JSON-LD structured data for SEO.
- **style.css** — Dark theme using CSS custom properties (`:root` variables). Responsive breakpoints at 1024px, 768px, and 480px. Floating counters hidden on screens ≤1024px.
- **script.js** — Three animations initialized on DOMContentLoaded: wave text effect on the title, counter increment animations on the floating circles, and a typewriter effect cycling through subtitle phrases.
- **media/** — Static images (award photos, testimonial headshot, logo).

## Key Design Patterns

- CSS custom properties in `:root` control the color scheme (`--accent-color: #00FFFF`, `--bg-color: #121212`) and typography (`Inter` + `Source Code Pro`).
- The "Courses" counter (`center-counter`) wanders randomly via JS repositioning every 6s with CSS transitions; the other two counters use CSS `float` keyframe animation.
- Subtitle phrases array in `script.js` (line ~97) controls the rotating typewriter text — edit there to update messaging.
- External dependencies: Google Fonts, Font Awesome 6.4.0 (CDN), Google Maps embed.
- Google Analytics (GA4) is loaded via the HTML.

## Deployment

Push to `main` branch → GitHub Pages serves automatically. The `CNAME` file maps to `datexland.com`.
