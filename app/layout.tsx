import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";
import AuthSession from "./AuthSession";
import Navbar from "./ui/navbar/Navbar";
import ReactFlowProvider from "./ui/thoughts/ReactFlowProvider";
import ThoughtsNodeProvider from "./ui/thoughts/ThoughtsNodeProvider";

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
            <ThoughtsNodeProvider>
              <div>
                <Navbar />
              </div>
              {children}
            </ThoughtsNodeProvider>
          </ReactFlowProvider>
        </AuthSession>
      </body>
    </html>
  );
}
