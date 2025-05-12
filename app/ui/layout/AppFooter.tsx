export function AppFooter() {
  return (
    <footer className="clear-both mt-5 py-4 bg-light text-center border-top small">
      <div className="mb-3" style={{ fontSize: "0.5rem" }}>
        <p className="text-muted mb-0">
          &copy; {new Date().getFullYear()} Jeffrey Radcliffe — All rights
          reserved · Home page illustration by{" "}
          <a href="https://inkylizard.wordpress.com" target="_blank">
            Kit Siegle
          </a>
        </p>
        <div className="text-muted">
          Built with Remix · Designed and coded with intention and respect by
          Jeffrey Radcliffe.
        </div>
      </div>
    </footer>
  );
}
