# Aaryan Rajput

This repository contains two Next.js apps:

| App | Directory | Local address |
| --- | --- | --- |
| Portfolio | `portfolio/` | http://localhost:3000 |
| Todo | `todo/` | http://localhost:3001 |

## Run locally

Install dependencies for both apps:

```sh
npm --prefix portfolio install
npm --prefix todo install
```

Start each app in its own terminal:

```sh
npm run dev
npm run dev:todo
```

The todo app needs the private environment variables described in
[`todo/.env.example`](todo/.env.example). Put them in
`todo/.env.local`; they are excluded from Git. See the
[`todo README`](todo/README.md) for its setup and deployment details.

## Check the apps

```sh
npm run lint
npm run build
npm run test:todo
npm run build:todo
```

For separate Vercel deployments from this repository, set the portfolio
project's root directory to `portfolio` and the todo project's root directory
to `todo`. Keep each project's environment variables in its own deployment.
