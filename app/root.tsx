import "~/styles/tailwind.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { AppFooter } from "~/ui/layout/AppFooter";
import { AuthProvider } from "~/ui/auth/AuthProvider";
import { ConfirmDialogProvider } from "~/ui/feedback/ConfirmDialogProvider";
import { SystemNavbar } from "~/ui/layout/SystemNavbar";
import { Toaster } from "react-hot-toast";
import nexusConfig from "./config/nexus.config";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{nexusConfig.siteTitle}</title>
        <meta name="description" content={nexusConfig.siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <AuthProvider>
          <SystemNavbar />
          <div className="banner-strip"></div> {/* Added banner strip */}
          <main className="flex-1">{children}</main>
          <AppFooter />
          <ScrollRestoration />
          <Scripts />
        </AuthProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ConfirmDialogProvider>
      <Outlet />
    </ConfirmDialogProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error("App ErrorBoundary:", error);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-20 text-center px-4">
        <h1 className="text-2xl font-semibold text-red-600">
          Something went wrong
        </h1>
        <p className="mt-4 text-gray-700">{error.message}</p>
        <a href="/" className="mt-6 inline-block text-blue-600 underline">
          Return to home
        </a>
      </div>
    </Layout>
  );
}
