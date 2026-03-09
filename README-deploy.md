# Deploying Raised Bed Planner as a PWA

Five minutes, free forever. Your mom installs it like a real app — works offline, saves automatically.

---

## What you need

- A free [GitHub account](https://github.com) (takes 2 minutes to create)
- These files from this folder:

```
index.html          ← the main app (renamed from garden-planner.html)
manifest.json       ← tells the browser "this is an installable app"
sw.js               ← service worker: makes it work offline
icons/
  icon-base.svg     ← the app icon
  icon-maskable.svg ← same icon, safe for Android's circular crop
```

---

## Step 1 — Create a GitHub repository

1. Log in at [github.com](https://github.com)
2. Click the **+** button (top right) → **New repository**
3. Name it: `garden-planner` (or anything you like)
4. Set it to **Public** *(required for free GitHub Pages)*
5. Leave everything else as-is, click **Create repository**

---

## Step 2 — Upload the files

On your new empty repository page:

1. Click **uploading an existing file** (or drag files onto the page)
2. Drag in **all four items**: `index.html`, `manifest.json`, `sw.js`, and the entire `icons/` folder
3. Scroll down, click **Commit changes**

> ⚠️ The main file **must** be named `index.html` — GitHub Pages serves this automatically.

---

## Step 3 — Turn on GitHub Pages

1. In your repository, click **Settings** (top tab bar)
2. Click **Pages** in the left sidebar
3. Under **Source**, choose **Deploy from a branch**
4. Set branch to **main**, folder to **/ (root)**
5. Click **Save**

GitHub will show a banner: *"Your site is live at https://YOUR-USERNAME.github.io/garden-planner/"*

It takes about 60 seconds the first time.

---

## Step 4 — Send the link to your mom

Your app is now live at:

```
https://YOUR-USERNAME.github.io/garden-planner/
```

Send her that link. When she opens it:

**On iPhone/iPad:**
1. Open in Safari (must be Safari for install to work)
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** — done. The app icon appears on her home screen.

**On Android:**
1. Open in Chrome
2. Chrome shows an **"Install app"** banner automatically, or
3. Tap the three-dot menu → **Add to Home Screen**

**On a Mac or Windows PC (Chrome/Edge):**
1. Open the URL
2. Look for the **install icon** (⊕ or screen-with-arrow) in the address bar
3. Click it → **Install**
4. The app opens in its own window with no browser chrome

---

## Updating the app

Whenever you want to deploy a new version:

1. Open the file on GitHub (`index.html`, `sw.js`, etc.)
2. Click the pencil ✏️ icon to edit, or drag a new file to replace it
3. Click **Commit changes**

The service worker downloads the update silently in the background.
Next time your mom opens the app, she'll see a small **"🌱 A new version is ready — Update now"** banner at the bottom. One tap applies it.

To bump the version manually (forces all users to refresh), open `sw.js` and change this line:

```js
const CACHE_VERSION = 'rbp-v3-r1';
//                              ↑ change r1 → r2 → r3 etc.
```

---

## Custom domain (optional, free)

If you want a friendlier URL like `gardenplanner.com`:

1. Buy a domain (~$12/yr at Namecheap, Cloudflare, etc.)
2. In GitHub Pages settings, enter it in the **Custom domain** field
3. Follow the DNS instructions GitHub shows you
4. GitHub handles HTTPS automatically

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Install" option not showing on iPhone | Must use **Safari**, not Chrome/Firefox on iOS |
| App shows old version after update | Open the URL in browser, hard-refresh (Cmd+Shift+R / Ctrl+Shift+R) |
| 404 after enabling Pages | Wait 60 seconds and refresh — first deploy takes a moment |
| Icons not showing on Android | Android may take an icon from the manifest on next re-install |
| `sw.js` registration error in console | Make sure all three files are in the **root** of the repo, not a subfolder |

---

## File checklist before uploading

```
✓ index.html          — main app file (not garden-planner.html)
✓ manifest.json       — in the root folder
✓ sw.js               — in the root folder
✓ icons/icon-base.svg     — inside an icons/ subfolder
✓ icons/icon-maskable.svg — inside an icons/ subfolder
```

That's it. No servers to manage, no monthly bills, no app store review.
