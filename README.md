# chaitali · coffee chat portfolio

My personal portfolio. Plain HTML, CSS and JavaScript, no build step, hosted free on GitHub Pages.

## What's inside

```
index.html     all the page content
styles.css     colors, fonts, layout, animations
script.js      mobile menu, project filters, scroll fade-ins
images/        photos, favicon, social preview image
```

## Put it online with GitHub Pages

1. Sign in to GitHub and create a new **public** repository named exactly
   `chaitalipatil02.github.io` (your username + `.github.io`).
2. On the new repo page, click **uploading an existing file**.
3. Drag in `index.html`, `styles.css`, `script.js`, `README.md` and the whole `images` folder. Click **Commit changes**.
4. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. Wait a minute or two, then visit **https://chaitalipatil06.github.io/Portfolio/**.

Every time you upload a changed file, the site updates by itself within a minute.

## Add a new project

In `index.html`, find the `PROJECTS` section. Copy one whole `<article class="project …">…</article>` block, paste it right above the "Fresh batch brewing" box, and change:

- `data-kind="work"` for job projects or `data-kind="side"` for personal ones (this drives the filter buttons)
- the tag line, title, description
- the "Read the story" details, or swap it for a GitHub link

To use a screenshot instead of the little illustration, replace the `<svg>…</svg>` inside `project-media` with:

```html
<img src="images/my-project.jpg" alt="Describe what the screenshot shows" loading="lazy">
```

and remove `aria-hidden="true"` from that `project-media` div.

## Accessibility checklist (keep these when editing)

- Every image needs real `alt` text that describes it.
- Keep text colors to the ones in the top of `styles.css`; the light tints are for backgrounds only.
- Links that open a new tab say so with the hidden "(opens in a new tab)" text.
- Test with your keyboard: Tab through the page and make sure you can always see where you are.
