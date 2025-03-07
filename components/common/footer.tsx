export default function Footer() {
  const buildDateEnv = process.env.NEXT_PUBLIC_BUILD_DATE;

  const buildDate = buildDateEnv
    ? new Date(buildDateEnv).toLocaleString()
    : "Impossible de déterminer la date de build";

  return (
    <footer className="footer sm:footer-horizontal footer-center bg-footer-gradient h-40 p-4 font-bold text-white">
      <aside>
        <p>{`Dernière mise à jour: ${buildDate}`}</p>
      </aside>
    </footer>
  );
}
