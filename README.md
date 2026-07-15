# Neon Matcher // Cyberpunk Memory Grid

Welcome to **Neon Matcher**, a fully functional cyberpunk-themed memory card matching game. Constructed using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. 

Nodes represent holographic cyber-animals, which players must match by decrypting pairs. Built with robust, decoupled client-side state machine engine.

---

## ⚡ Features & Cyber Aesthetics
- **Grid Layout Resolution**: User-selectable difficulties:
  - **Easy**: 4x4 matching grid (16 nodes, 8 animal pairs)
  - **Medium**: 6x6 matching grid (36 nodes, 18 animal pairs)
  - **Hard**: 6x8 matching grid (48 nodes, 24 animal pairs)
- **Fluid 3D Animations**: Immersive 3D rotation flips with holographic highlights and scanner overlays.
- **Cyber stats monitor**: Neon glows tracking cumulative attempts (Moves) and running seconds (Timer).
- **Security Check Locks**: Double-click locks and match attempt click protections that disable input while card mismatches flip back.
- **Micro-Animations**: Animated success glow scales, hover outlines, scanning bars, and a secure glitch win dialog overlays.

---

## 💻 Local Workspace Installation

### Prerequisites
- **Node.js**: `v18.0` or greater (Tested on `v22.14.0`)
- **NPM**: `v9.0` or greater (Tested on `v10.9.2`)

### 1. Close repository and install dependencies
```bash
npm install
```

### 2. Launch Local Dev Node
To boot up the local dev server at `http://localhost:3000`:
```bash
npm run dev
```

### 3. Production Compilation Validation
Test builds locally before deploying:
```bash
npm run build
```

---

## 🚀 Deployment Instructions

### Part A: Initialize Repository and Push to GitHub

Prepare and upload your local codebase to a remote GitHub repository:

1. **Initialize Git local repo**:
   ```bash
   git init
   ```
2. **Stage and commit files**:
   ```bash
   git add .
   git commit -m "Initialize Neon Matcher memory matching game"
   ```
3. **Register remote origin and push branch**:
   *(Replace with your GitHub repository URL)*
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

### Part B: Deploy to Vercel

Choose one of two quick options:

#### Option 1: Import via GitHub dashboard (Recommended)
1. Navigate to [Vercel Dashboard](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Select **Import** next to your newly created GitHub repository.
4. Leave configuration inputs on their defaults (Vercel automatically detects Next.js build script & folders).
5. Click **Deploy**. Vercel will automatically build and publish your project, providing a production URL.

#### Option 2: Deploy using Vercel CLI
If you prefer a command-line interface:
1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```
2. **Authorize and Login**:
   ```bash
   vercel login
   ```
3. **Trigger deployment**:
   Run this inside your project root and choose defaults:
   ```bash
   vercel
   ```
4. **Deploy to production (Optional)**:
   Once the preview deployment completes, push to production:
   ```bash
   vercel --prod
   ```
