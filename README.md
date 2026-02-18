**Welcome to your Base44 project** 

**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_FUNCTIONS_VERSION=your_functions_version
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_FUNCTIONS_VERSION=v1
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

## Base44 + Vercel deployment checklist

`src/lib/app-params.js` reads these variables from `import.meta.env`, and `src/api/base44Client.js` passes them into `createClient`:

- `VITE_BASE44_APP_ID`
- `VITE_BASE44_FUNCTIONS_VERSION`
- `VITE_BASE44_APP_BASE_URL`

For Vercel:

1. Open **Project Settings → Environment Variables**.
2. Add/update all three variables above for both **Production** and **Preview**.
3. Redeploy (or trigger a new deployment) so frontend build picks up updated `VITE_*` values.

Function endpoints expected by this repo:

- Required: `functions/submitStory.ts` (invoked from `StorySubmitForm.jsx` as `submitStory`)
- Optional multipart flow: `functions/submitStoryWithMedia.ts`

## End-to-end validation checklist

After redeploy:

1. Open the Story submit page and complete all required fields.
2. Submit and confirm the request returns success.
3. Verify the created story record has the expected `status` (`approved` in current function implementation).
4. Confirm the new story appears in Story list (or moderation queue if your backend logic is changed).

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)
