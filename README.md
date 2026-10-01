# Obsidian Side-Publish

GitHub-based publishing system for Obsidian vaults with authentication.

## Overview

Transform your 5 Obsidian vaults into independently publishable GitHub repositories with a unified dashboard, login authentication, and web-based note viewing.

**Vaults:**
- 🌟 **Writing** — Published
- 🎉 **Hobbies** — Published  
- 🏢 **Personal** — Private
- 💼 **AMEX** — Private
- 💼 **SMB** — Private

## Quick Start

```bash
# Clone repo
git clone https://github.com/calmingsnakes/obsidian-side-publish
cd obsidian-side-publish

# Install dependencies (if applicable)
npm install  # or pip install -r requirements.txt

# Start local server
npm run dev  # or python3 -m http.server
```

## Login Credentials

- **Username:** `amedin`
- **Password:** `calmingsnakes`

## Project Structure

```
obsidian-side-publish/
├── FEATURE-PLAN.md          (detailed specifications)
├── docs/                    (documentation)
├── src/
│   ├── index.html          (login page)
│   ├── dashboard.html      (vault dashboard)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── auth.js         (login logic)
│   │   ├── vault.js        (vault viewer)
│   │   └── markdown.js     (markdown parser)
│   └── assets/             (images, icons)
├── vaults/                 (git submodules)
│   ├── personal
│   ├── hobbies
│   ├── writing
│   ├── amex
│   └── smb
├── scripts/
│   ├── sync-vaults.sh      (pull all submodules)
│   └── build.sh            (build static site)
├── .github/workflows/      (GitHub Actions)
├── .gitignore
└── README.md (this file)
```

## Features

### Phase 1: Core MVP ✅
- [x] GitHub repo created
- [ ] Vault submodules configured
- [ ] Basic README & structure

### Phase 2: Publishing & Display
- [ ] Login screen (amedin/calmingsnakes)
- [ ] Vault dashboard
- [ ] Markdown rendering
- [ ] TOC sidebar

### Phase 3: Advanced (Optional)
- [ ] Full-text search
- [ ] Graph view
- [ ] Vault switching
- [ ] Backlinks

## Development

**Tech Stack:**
- HTML/CSS/JS (frontend)
- GitHub Pages (hosting)
- GitHub Actions (CI/CD)

**Build & Deploy:**
```bash
npm run build    # Build static site
npm run deploy   # Deploy to GitHub Pages
```

## Contributing

Push vault updates:
```bash
git submodule update --recursive
git add vaults/
git commit -m "🔄 update: sync vault changes"
git push
```

## License

MIT
