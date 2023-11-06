import { Inter, Merriweather } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const merriweather = Merriweather({
  subsets: ["cyrillic"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});
