/** @type {import('next').NextConfig} */
const nextConfig = {};

const NextPwa = require("next-pwa");

const withPWA = NextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {},
})({
  reactStrictMode: true,
});

module.exports = withPWA;
