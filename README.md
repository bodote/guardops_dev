# GuardOps Dev: Local Startup Guide

This project is a Next.js application using Auth0 for login.

## Prerequisites

- Node.js `20`
- npm `10.9.2`

The repository currently runs with newer versions too, but npm will print engine warnings.

## 1. Install dependencies

```bash
npm install
```

## 2. Create local environment config

Create `/Users/bodo.teichmann/dev/guardops_dev/.env.local`:

```bash
AUTH0_SECRET=<random-32-byte-hex-or-long-random-string>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://<your-tenant>.us.auth0.com
AUTH0_CLIENT_ID=<your-auth0-app-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-app-client-secret>

# Used by role/token endpoints in this app
AUTH0_TRACEAPI=https://<your-tenant>.us.auth0.com/oauth/token
AUTH0_MANAGEMENT_CLIENT_ID=<your-auth0-app-client-id-or-m2m-client-id>
AUTH0_MANAGEMENT_CLIENT_SECRET=<matching-client-secret>
MANAGEMENT_AUDIENCE=https://<your-tenant>.us.auth0.com/api/v2/
```

Generate `AUTH0_SECRET`:

```bash
openssl rand -hex 32
```

## 3. Configure Auth0 application

Use a **Regular Web Application** (technology: **Next.js**).

In Auth0 application settings:

- `Allowed Callback URLs`: `http://localhost:3000/api/auth/callback`
- `Allowed Logout URLs`: `http://localhost:3000`
- `Allowed Web Origins`: `http://localhost:3000`
- `Initiate Login URI`: leave empty for local `http` development

## 4. Configure Management API access (for user roles)

Without this, `/api/manageRole` cannot fetch roles.

In Auth0:

1. Go to `APIs` -> `Auth0 Management API` -> `Machine to Machine Applications`.
2. Authorize your app.
3. Grant scopes needed for reading user roles (at least `read:users` and `read:roles`).

## 5. Start the server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Known behavior and troubleshooting

- `GET /api/auth/login 500` with `"secret" is required`:
  - `AUTH0_SECRET` is missing.
- Auth0 error `Callback URL mismatch`:
  - `Allowed Callback URLs` does not include `http://localhost:3000/api/auth/callback`.
- `GET /api/manageRole 500`:
  - Usually missing/invalid Management API token config.
  - Current code now degrades to `401` instead of crashing when role token fetch fails.
- Profile page showing `User Role: Loading...` forever:
  - Current code now falls back to `No role assigned` if roles cannot be fetched.

## Security note

Do not commit `.env.local`. If credentials were shared in chat or logs, rotate secrets in Auth0.
