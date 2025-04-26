# Sanskrit Garden

Welcome to the Sanskrit Garden project, a web app designed to help users learn and explore Sanskrit texts.

## Development

To start the development server, run the following command:

```bash
npm run dev
```

This will start the app locally and you can begin editing the source files.

## Deployment

To deploy your app, first build it for production:

```bash
npm run build
```

Then, run the app in production mode:

```bash
npm start
```

Make sure to deploy the output of `npm run build`:

- `build/server`
- `build/client`

### Firebase Hosting

The app is deployed using Firebase Hosting. To configure and deploy to Firebase, follow these steps:

1. Install Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Styling

This app uses [Tailwind CSS](https://tailwindcss.com/) for styling. You can customize the styling to suit your needs. 

To learn more about Tailwind, refer to their [documentation](https://tailwindcss.com/docs).

## Notes

- The app is structured in a way that makes it easy to extend with additional Sanskrit texts, quizzes, and interactive features.
- For further customizations, feel free to modify the components and routes as needed.