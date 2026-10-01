# Obsidian Side-Publish Feature Plan

## Overview
Create a GitHub repo that treats each Obsidian vault as a git-flavored markdown (gitmoji-annotated) normal file. Each vault becomes independently publishable as a static site or public repository.

---

## Core Concept

**Main Repo:** Primary control center listing all vaults
```
MAIN REPO
├── VAULT 1 (as git submodule or symbolic ref)
├── VAULT 2 (as git submodule or symbolic ref)
└── VAULT 3 (as git submodule or symbolic ref)
```

**Each Vault:** Standalone repo with its own:
- Git history
- GitHub pages (optional)
- Public/private publishing rules
- TOC + Note display (like inside Obsidian)

---

## Architecture

### 1. Main Repo (`obsidian-side-publish`)
**Purpose:** Orchestrator & entry point

**Structure:**
```
obsidian-side-publish/
├── README.md (links to all vaults)
├── .gitmodules (submodule definitions)
├── config.yml (publishing rules)
├── vaults/
│   ├── personal (submodule → personal-vault repo)
│   ├── hobbies (submodule → hobbies-vault repo)
│   ├── writing (submodule → writing-vault repo)
│   ├── amex (submodule → amex-vault repo)
│   └── smb (submodule → smb-vault repo)
└── scripts/
    ├── sync-vaults.sh (pull all submodules)
    └── build-static.sh (generate HTML for GitHub Pages)
```

**Responsibilities:**
- Central git dashboard
- Submodule management
- CI/CD orchestration
- Main README with vault directory

### 2. Individual Vault Repos
**Example:** `personal-vault`, `writing-vault`, etc.

**Structure per vault:**
```
personal-vault/
├── README.md (vault metadata: description, publish status)
├── vault-config.json (vault-specific settings)
├── .github/
│   └── workflows/
│       ├── lint.yml (markdown linting)
│       └── publish.yml (auto-publish on push)
├── notes/
│   ├── [all .md files from Obsidian vault]
│   └── _index.md (TOC generated or manual)
├── assets/
│   └── [images, diagrams referenced in notes]
└── .gitignore (exclude .obsidian/, system files)
```

**Responsibilities:**
- Store actual markdown content
- Manage own git history
- Define publish status (public/private)
- Auto-generate TOC & sidebars

---

## Features

### Phase 1: Core (MVP)
**Goal:** Get vaults into git, viewable on GitHub

- [ ] Create 5 individual vault repos (personal, hobbies, writing, AMEX, SMB)
- [ ] Add `.gitignore` to exclude Obsidian system files (`.obsidian/`, `.DS_Store`)
- [ ] Create `README.md` per vault (description, TOC)
- [ ] Set up main `obsidian-side-publish` repo with submodules
- [ ] Auto-sync script to pull all vault updates
- [ ] GitHub Actions: Lint markdown on push

**Deliverables:**
- 5 public/private repos on GitHub
- Main repo with working submodule links
- Basic README navigation

### Phase 2: Publishing & Display
**Goal:** Make vaults readable online (like inside Obsidian)

- [ ] **Login screen** (authentication gate)
  - Single user: `amedin` / `calmingsnakes`
  - JWT or session-based auth
  - Login form with error handling
  - Logout button in navbar
  - Store session in localStorage (client-side) or httpOnly cookie (secure)

- [ ] **GitHub Pages per vault** (optional)
  - Template: `_layouts/default.html` for vault site
  - TOC sidebar showing note structure
  - Breadcrumb navigation
  
- [ ] **Main site dashboard** (GitHub Pages for main repo)
  - Lists all vaults with metadata
  - Links to each vault's site/repo
  - Quick stats (# notes per vault, last updated)

- [ ] **Markdown rendering**
  - Support Obsidian wikilinks: `[[Note Name]]` → `note-name.html`
  - Embed support: `![[image.png]]` (from `assets/`)
  - Code blocks with syntax highlighting
  - Gitmoji support (optional: add emoji to commit msgs)

### Phase 3: Advanced
**Goal:** Full Obsidian-like experience in browser

- [ ] **Full-text search** (Lunr.js or Algolia)
- [ ] **Graph view** (Cytoscape.js or D3) showing note connections
- [ ] **Vault switching** (dropdown/nav to jump between vaults)
- [ ] **Private vault support**
  - SMB & AMEX repos private
  - Personal/Hobbies/Writing public (or as you prefer)
- [ ] **Auto-sync from Obsidian**
  - Git hook or CI trigger on local push
  - Obsidian Git plugin integration
- [ ] **Two-way linking** (backlinks section at bottom of notes)

---

## Workflow

### Local (Your Mac)
```
1. Edit notes in Obsidian (e.g., Personal vault)
2. Commit & push to personal-vault repo
3. GitHub Actions lints + auto-builds static site
4. GitHub Pages (personal-vault.github.io) updates
```

### Automation (GitHub Actions)
```
On push to any vault repo:
  - Run markdown linter (vale, markdownlint)
  - Regenerate TOC if README.md changed
  - Build static site (Jekyll or Hugo)
  - Deploy to GitHub Pages
  - Update main dashboard (if vault count/metadata changed)
```

### Viewing
```
Visit: https://github.com/calmingsnakes/obsidian-side-publish
  ↓ (submodules listed)
  → https://github.com/calmingsnakes/personal-vault (public/private)
  → https://github.com/calmingsnakes/writing-vault
  → etc.

Optional: https://calmingsnakes.github.io/obsidian-side-publish (main dashboard)
```

---

## Implementation Tasks

### Setup Phase
- [ ] **Create 5 vault repos** (via GitHub CLI or UI)
  ```bash
  gh repo create personal-vault --public --README
  gh repo create hobbies-vault --public --README
  gh repo create writing-vault --public --README
  gh repo create amex-vault --private --README
  gh repo create smb-vault --private --README
  ```

- [ ] **Initialize each vault repo with iCloud content**
  ```bash
  git clone personal-vault/
  cp -r ~/iCloud.../Personal/* .
  git add . && git commit -m "🎬 initial: seed personal vault"
  git push
  ```

- [ ] **Create main repo with submodules**
  ```bash
  gh repo create obsidian-side-publish --public
  git clone obsidian-side-publish/
  git submodule add https://github.com/calmingsnakes/personal-vault vaults/personal
  git submodule add https://github.com/calmingsnakes/writing-vault vaults/writing
  # ... repeat for all 5
  git commit -m "🔗 add vault submodules"
  ```

### Automation Phase
- [ ] **GitHub Actions workflow** (per vault)
  - Trigger: push to any vault repo
  - Jobs:
    1. Markdown lint (vale or markdownlint)
    2. Build static site (Jekyll or 11ty)
    3. Deploy to GitHub Pages (if public)

- [ ] **TOC generation** (optional script)
  - Scan `notes/` folder structure
  - Generate `_index.md` or sidebar.json
  - Commit back to repo

### UI Phase
- [ ] **Login screen** (HTML/CSS/JS)
  - Form: username + password input
  - Submit button with loading state
  - Error messages (invalid credentials)
  - Style: clean, minimal (matches vault aesthetic)
  
  **Implementation:**
  ```html
  <!-- login.html -->
  <form id="loginForm">
    <input type="text" id="username" placeholder="Usuario" required>
    <input type="password" id="password" placeholder="Contraseña" required>
    <button type="submit">Entrar</button>
    <p id="error" class="error"></p>
  </form>
  
  <script>
    const CREDENTIALS = {
      user: 'amedin',
      pass: 'calmingsnakes'
    };
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
      
      if (user === CREDENTIALS.user && pass === CREDENTIALS.pass) {
        sessionStorage.setItem('auth', 'true');
        window.location.href = '/dashboard';
      } else {
        document.getElementById('error').textContent = 'Usuario o contraseña inválida';
      }
    });
  </script>
  ```

- [ ] **Auth guard** (middleware)
  - Check sessionStorage before loading dashboard
  - Redirect to login if not authenticated
  - Logout clears session

- [ ] **Vault sidebar** (HTML/CSS)
  - Vault selector dropdown
  - Note list/tree view
  - Search box (optional)

- [ ] **Note display** (HTML template)
  - Parse markdown with wikilink converter
  - Sidebar with TOC
  - Breadcrumb: Vault > Folder > Note
  - Backlinks section (optional)

---

## Tech Stack (Recommended)

| Component | Tool | Why |
|-----------|------|-----|
| Repos | GitHub | Already using; native submodule support |
| CI/CD | GitHub Actions | Free, integrated, easy |
| Static Gen | Jekyll or 11ty | Jekyll = GitHub Pages native; 11ty = flexible |
| Search | Lunr.js | Client-side, no backend needed |
| Graph | Cytoscape.js | Good for note connections |
| Linting | markdownlint + Vale | Markdown + prose quality |

---

## Phasing & Timeline

**Phase 1 (Week 1):** Create repos, sync content, basic README
- 3-4 hours

**Phase 2 (Week 2-3):** GitHub Pages setup, markdown rendering, TOC
- 4-6 hours

**Phase 3 (Week 4+):** Graph view, full-text search, vault switching
- 8-12 hours (optional, can defer)

---

## Benefits

✅ **Public portfolio** of your writing (Writing, Hobbies vaults)
✅ **Git history** for every vault
✅ **Private repos** (AMEX, SMB stay private)
✅ **Shareable links** for specific notes
✅ **No Obsidian Sync cost** (GitHub is free)
✅ **GitHub Pages** for public vaults (free hosting)
✅ **Two-way linking** (backlinks visible online)
✅ **Easy to extend** (add analytics, comments, etc.)

---

## Questions to Clarify

1. **Public vs. Private:**
   - Which vaults publish publicly? (Assume: Writing, Hobbies; hide AMEX, SMB, Personal)
   - Want GitHub Pages sites for public vaults?

2. **Features priority:**
   - Most important: static site viewer or git history?
   - Need graph view? Full-text search?

3. **Publishing trigger:**
   - Auto-publish on every push, or manual review?
   - Lint on push (auto-block bad markdown)?

4. **Maintenance:**
   - Auto-pull from Obsidian to Git? (Obsidian Git plugin)
   - Or manual git commits?

---

## Next Steps

1. **Approve architecture** (repo structure, Phase 1 scope)
2. **Choose publishing vaults** (which are public/private)
3. **Create repos** & seed with content
4. **Set up GitHub Actions** for first vault
5. **Build landing page** (main dashboard)

