# Todo

A private, synchronized personal todo list for [todo.aaryanrajput.com](https://todo.aaryanrajput.com).

## Features

- Add, complete, filter, and delete tasks
- Secure access-key login with an HttpOnly JWT session cookie
- Synchronizes tasks across devices with Upstash Redis
- Imports tasks from the original browser-only version once
- Responsive and accessible
- Login rate limiting and same-origin mutation checks

## Run locally

```sh
npm install
npx vercel env pull .env.local --yes
npm run dev
```

Then visit `http://localhost:3000`.

## Deploy

The Vercel project requires `ACCESS_KEY_HASH`, `JWT_SECRET`, and the Upstash Redis variables listed in `.env.example`. Secrets must never use the `NEXT_PUBLIC_` prefix.
