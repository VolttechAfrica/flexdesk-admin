const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@config"] = path.resolve(__dirname, "config");
    config.resolve.alias["@components"] = path.resolve(__dirname, "components");
    config.resolve.alias["@hooks"] = path.resolve(__dirname, "hooks");
    config.resolve.alias["@util"] = path.resolve(__dirname, "utils");
    config.resolve.alias["@styles"] = path.resolve(__dirname, "styles");
    config.resolve.alias["@assets"] = path.resolve(__dirname, "assets");
    config.resolve.alias["@context"] = path.resolve(__dirname, "context");
    config.resolve.alias["@pages"] = path.resolve(__dirname, "pages");
    config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    config.resolve.alias["@lib"] = path.resolve(__dirname, "lib");
    config.resolve.alias["@services"] = path.resolve(__dirname, "services");
    config.resolve.alias["@store"] = path.resolve(__dirname, "store");
    config.resolve.alias["@utilities"] = path.resolve(__dirname, "utilities");

    return config;
  },
};

module.exports = nextConfig;
