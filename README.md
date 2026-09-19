# Aaryan Rajput

This repository contains two Next.js apps:

| App | Directory | Local address |
| --- | --- | --- |
| Portfolio | repository root | http://localhost:3000 |
| Todo | `todo-aaryanrajput/` | http://localhost:3001 |

## Run locally

Install dependencies for both apps:

```sh
npm install
npm --prefix todo-aaryanrajput install
```

Start each app in its own terminal:

```sh
npm run dev
npm run dev:todo
```

The todo app needs the private environment variables described in
[`todo-aaryanrajput/.env.example`](todo-aaryanrajput/.env.example). Put them in
`todo-aaryanrajput/.env.local`; they are excluded from Git. See the
[`todo README`](todo-aaryanrajput/README.md) for its setup and deployment details.

## Check the apps

```sh
npm run lint
npm run build
npm run test:todo
npm run build:todo
```

For separate Vercel deployments from this repository, use the repository root
for the portfolio project and `todo-aaryanrajput` as the root directory for the
todo project. Keep each project's environment variables in its own deployment.
