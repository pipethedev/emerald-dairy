/** @type {import('next').NextConfig} */
const nextConfig = {};

import NextPwa from "next-pwa";

const withPWA = NextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {},
})({
  reactStrictMode: true,
});

export default withPWA;
