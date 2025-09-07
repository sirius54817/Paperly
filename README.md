# Paperly

Question Paper Generation System — Next.js + TypeScript + Tailwind

Quick start

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open in browser

- Local: http://localhost:3000

Notes

- This app uses the Next.js App Router (Next 15) and client components.
- Authentication is implemented via a React Context and protected routes.
- Use the provided dashboards for different roles: `hod`, `coordinator`, `faculty`.

Development

- To run TypeScript checks and linting (if configured):

```bash
npm run build
# or
npm run lint
```

Contributing

- Create feature branches, run tests, open PRs.



Vercel Deployment

- This project is ready to deploy on Vercel. A `vercel.json` has been added with the recommended build settings for Next.js.
- To deploy:

```bash
# from the project root
vercel --prod
```

Vercel will automatically detect the Next.js app and run `npm run build`. Ensure your repository is connected to your Vercel account and the project is configured to use the `main` branch.

