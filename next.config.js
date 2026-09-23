import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(path.join(__dirname, "package.json"), "utf-8"));

// Jedno źródło prawdy dla nazwy szablonu: package.json (można nadpisać przez TEMPLATE_NAME)
const templateName = process.env.TEMPLATE_NAME || pkg.name;

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // ZERO turbopack – to jest niepotrzebne i powoduje błąd
  // turbopack: { enabled: false },

  assetPrefix: isProd ? `/templates/${templateName}/assets/next/` : undefined,

  distDir: isProd ? `./templates/${templateName}/assets/next` : ".next",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Opcjonalnie: wyczyść cache przy buildzie
  cleanDistDir: true,
};

export default nextConfig;