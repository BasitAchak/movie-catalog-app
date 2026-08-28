# ReelSpace

ReelSpace is a personal movie and series discovery catalogue. Signed-in users can browse a curated collection of titles, search by title or genre, filter the catalogue, inspect title details, and save favorites for later.

Favorites are stored separately for each Firebase user in the browser's local storage. The catalogue data is currently defined locally in `src/data/movies.jsx`.

## Features

- Firebase email/password authentication
- Search movies and series by title or genre
- Filter titles by genre
- View poster, metadata, rating, and description details
- Add and remove titles from a personal favorites list
- Persist favorites between sessions for the signed-in user
- Responsive catalogue layout for desktop and mobile screens

## Tech Stack

- React 19
- Vite
- React Router
- Firebase Authentication
- CSS

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A Firebase project with Email/Password authentication enabled

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

### Firebase setup

The app initializes Firebase in `src/firebase.js` and uses Firebase Authentication for sign-in. Create a test user in Firebase Console under **Authentication > Users**, then use that account on the ReelSpace sign-in screen.

For a different Firebase project, replace the configuration in `src/firebase.js` with that project's web app configuration.

The Firebase web configuration in `src/firebase.js` is intended for the browser and is not an Admin credential. Never place Firebase service-account JSON, Admin SDK credentials, private keys, passwords, or access tokens in this frontend project or in `VITE_` environment variables. If environment variables are introduced later, remember that Vite exposes every `VITE_` variable to the browser.

Before publishing, add the Vercel deployment domain and any local development domains to Firebase Authentication's authorized domains. Restrict the Firebase web API key in Google Cloud Console to the APIs and web origins used by this app. This project currently uses no Firestore, Realtime Database, or Firebase Storage data, so no Firebase database or storage rules are required for its current feature set.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Catalogue Data

Add or edit titles in `src/data/movies.jsx`. Each title includes a name, year, type, genre, rating, description, and poster image URL. Update the exported `genres` list when introducing a new genre.
