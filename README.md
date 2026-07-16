# Personal Site

Plain HTML/CSS, no build step. Pages: `index.html`, `work.html`, `writing.html`, `travel.html`, `blog.html`. Shared styles in `css/style.css`.

## Edit content
- **writing.html** — replace the book title, pitch, and excerpt (currently placeholders).
- **travel.html** — replace the three placeholder trip cards with real ones; duplicate the `.card` block for more.
- **blog.html** — duplicate the `.card` block for each new post, newest first.
- **work.html** — pulled from your resume; update as your experience changes.

## Preview locally
Open `index.html` directly in a browser, or from this folder run:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploy free on GitHub Pages
1. Create a new GitHub repo (e.g. `abburk19.github.io` for a root domain, or any name for a project site).
2. Push this folder's contents to the repo's `main` branch.
3. In the repo, go to Settings → Pages → set source to `main` / root.
4. Site goes live at `https://abburk19.github.io` (or `https://abburk19.github.io/<repo-name>` for a project repo).
