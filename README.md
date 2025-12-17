# Expense Tracker (Enhanced)

This is an enhanced Expense Tracker React app (local-only, uses localStorage). Changes made include:

- Category and date support for transactions
- Distinct Income / Expense types (amounts entered as positive numbers)
- CSV export, filters (date range, category), and search
- Edit & delete transactions (prompt-based edit)
- Charts (expense and income breakdown) using Chart.js + react-chartjs-2
- Responsive UI with Tailwind CDN (development quick styling)
- Local persistence with `localStorage`

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Run development server

```powershell
npm start
```

3. Build for production

```powershell
npm run build
```

## Deploying to GitHub Pages

This project includes scripts to deploy to GitHub Pages using the `gh-pages` package.

1. Install `gh-pages` locally (if not already installed):

```powershell
npm install --save-dev gh-pages
```

2. Ensure `homepage` in `package.json` is set to `"."` (or set to `https://<user>.github.io/<repo>` for a repo page).

3. Create a GitHub repository and push the project (example):

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

4. Deploy to GitHub Pages:

```powershell
npm run deploy
```

This will create a `gh-pages` branch and publish the `build` folder.

If you prefer Netlify or Vercel (recommended for continuous deploys):

- Connect the GitHub repo to Netlify or Vercel, set the build command to `npm run build` and the publish directory to `build/`.

## Notes & next steps

- The edit flow currently uses browser `prompt()` dialogs. I can replace this with a modal-based editor for better UX.
- Tailwind is included via CDN for quick styling. If you want an optimized production build with Tailwind purging unused CSS, I can integrate Tailwind properly (adds `postcss` config and dev dependencies).
- Consider running `npm audit fix` to address vulnerabilities (may upgrade deps).

If you want, I can:
- Add a GitHub Actions workflow for automatic deploys to GitHub Pages, or
- Replace prompt edit with a modal edit form.
# Expense Tracker (React)

This is a React version of the [vanilla JS Expense Tracker](https://github.com/bradtraversy/vanillawebprojects/tree/master/expense-tracker). It uses functional components with hooks and the context API

## Usage
```
npm install

# Run on http://localhost:3000
npm start

# Build for prod
npm run build
```

