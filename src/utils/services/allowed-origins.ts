export const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://dico-git-dev-jasonsuarez.vercel.app",
  "https://dico-git-jasonsuarez.vercel.app",
  "https://dico.jason-suarez.com",
  "https://dico-git-refactor-api-jasonsuarez.vercel.app",
  "https://dico-git-stats-ui-jasonsuarez.vercel.app/",
];



export function allowedOriginsService({
  url,
  allowedOrigins,
}: {
  url: string | undefined;
  allowedOrigins: string[];
}): boolean {
  if (url) {
    if (allowedOrigins.includes(url)) {
      // Set options method for CORS

      return true;
    }
  }
  return false;
}