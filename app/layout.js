import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recipini",
  description: "Discover and share your favorite recipes with our community of food enthusiasts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Provider>
        <body className={inter.className}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
            }}
          />
          {children}
          <Toaster />
        </body>
      </Provider>

    </html>
  );
}
