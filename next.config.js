import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  skipTrailingSlashRedirect: true,
};

export default config;
