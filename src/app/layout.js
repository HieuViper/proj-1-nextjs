import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
// Can be imported from a shared config
const locales = ["en", "vi"];

export default async function RootLayout({ children, params: { locale } }) {
  // Validate that the incoming `locale` parameter is valid
  // if (!locales.includes(locale)) notFound();
  return <Layout child={children} lang={locale} />;
}
