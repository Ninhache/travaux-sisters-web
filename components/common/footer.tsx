export default function Footer() {
  const buildDate = new Date(process && process.env && process.env.NEXT_PUBLIC_BUILD_DATE || "Impossible de déterminer la date de build").toLocaleString();
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          {`Dernière mise à jour: ${buildDate}`}
        </p>
      </aside>
    </footer>
  );
}
