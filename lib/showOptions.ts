// The options panel and the switchable markup behind it: on the dev server and on Vercel preview links, never on the live site.
export const showOptions = process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";
