import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        </body>
      </Provider>

    </html>
  );
}
