/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  experimental: {
    swcPlugins: [
      [
        "plugin",
        {
          ...pluginOptions,
        },
      ],
    ],
  },
};

export default nextConfig;
