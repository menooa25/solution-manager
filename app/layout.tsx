import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";
import AuthSession from "./AuthSession";
import PanelButtonsContainer from "./ui/navbar/PanelButtonsContainer";

const vazirmatn = Vazirmatn({ subsets: ["arabic", "latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Solution Manager",
  description: "Solution Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={vazirmatn.className}>
        <div>
          <PanelButtonsContainer />
        </div>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
