const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  eslint: {
    dirs: ["src", "scripts"],
  },
  serverRuntimeConfig: {
    inspectPort: 9230,
  },
};

export default nextConfig;
