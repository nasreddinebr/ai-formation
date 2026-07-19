# GitHub repository init

## Step 1: Create a .gitignore (if missing)
```
$ if (Test-Path "H:\Mes_Projets\AI Traning\ai-formation\.gitignore") { Get-Content "H:\Mes_Projets\AI Traning\ai-formation\.gitignore" } else { Write-Output "No .gitignore found" }
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## Step 2: Create a repository on GitHub
1. Go to github.com/new (https://github.com/new)
2. Name it ai-formation (or any name you prefer)
3. Do NOT initialize with README, .gitignore, or license (the project already has these)
4. Click Create repository
Step 3: Stage, commit, and push
Run these commands in order:
cd "H:\Mes_Projets\AI Traning\ai-formation"

### Stage everything

git add .

### Commit
git commit -m "feat: M9-M11 content richness, progress tracking, search, CI/CD"

### Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-formation.git

### Push
git push -u origin master
That's it.
After pushing, the GitHub Actions CI/CD pipeline (.github/workflows/ci.yml) will automatically run lint, typecheck, and build on every push to main.
To deploy to Vercel, go to vercel.com/new (https://vercel.com/new), import the GitHub repo, and it will auto-deploy.