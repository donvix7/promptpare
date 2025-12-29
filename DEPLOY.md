# Deploying PromptPare

This guide explains how to deploy the PromptPare application, preferably to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account.
- A GitHub repository with your project code.

## Deployment Steps

1.  **Push to GitHub**: Ensure your latest changes are pushed to your GitHub repository.
    ```bash
    git push origin main
    ```

2.  **Import to Vercel**:
    - Go to your Vercel Dashboard.
    - Click **"Add New..."** -> **"Project"**.
    - Import your `promptpare` repository.

3.  **Configure Environment Variables**:
    - In the "Configure Project" screen, expand **"Environment Variables"**.
    - Add the following variable:
        - **Key**: `OPENAI_2_API_KEY`
        - **Value**: Your actual API key (from OpenRouter or OpenAI).

4.  **Deploy**:
    - Click **"Deploy"**.
    - Wait for the build to complete. Vercel will provide you with a live URL.

## Important Notes

- **Secrets**: NEVER commit your `.env` file or API keys to GitHub. Always use Vercel's Environment Variables settings for secrets.
- **Build**: The project is configured to use `npm run build` which runs `next build`.
- **API Routes**: Your `app/api/compare/route.js` is a server-side route, so your API key remains secure on the server and is not exposed to the client.

## Troubleshooting

- **Build Fails**: Run `npm run build` locally to see if there are any errors before pushing.
- **API Errors**: Check the Vercel "Function Logs" if your comparison feature isn't working in production.
