import "./globals.css";
import { NextAuthProvider } from "./providers"; // Import your new component

export const metadata = {
  title: "Spotify App",
  description: "Wellness music app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}