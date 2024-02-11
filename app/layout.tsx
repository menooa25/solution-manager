import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";
import AuthSession from "./AuthSession";
import Navbar from "./ui/navbar/Navbar";
import ReactFlowProvider from "./ui/ReactFlowProvider";

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
        <AuthSession>
          <ReactFlowProvider>
            <div>
              <Navbar />
            </div>
            {children}
          </ReactFlowProvider>
        </AuthSession>
      </body>
    </html>
  );
}
