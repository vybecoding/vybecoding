export default {
  providers: [
    {
      domain: process.env.CLERK_HOSTNAME || "https://your-clerk-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};