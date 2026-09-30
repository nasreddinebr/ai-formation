import "dotenv/config";
import { checkDatabaseConnection } from "../src/lib/db/client";

async function main() {
  const target = process.env.DATABASE_URL ?? "(non defini)";

  console.log("Verification de la connexion a la base de donnees");
  console.log(`  Cible : ${target.replace(/:[^:@/]*@/, ":****@")}`);
  console.log("");

  const report = await checkDatabaseConnection();

  if (!report.ok) {
    console.error("  ECHEC");
    console.error(`  Latence : ${report.latencyMs} ms`);
    console.error(`  Erreur  : ${report.error}`);
    console.error("");
    console.error("  Verifiez que le conteneur Postgres est demarre (docker compose up -d db)");
    console.error("  et que DATABASE_URL correspond au service `db` du reseau Compose.");
    process.exitCode = 1;
    return;
  }

  console.log("  OK");
  console.log(`  Latence    : ${report.latencyMs} ms`);
  console.log(`  Serveur    : ${report.serverVersion?.split(" on ")[0]}`);
  console.log(`  Tables     : ${report.userCount} utilisateur(s)`);
}

main().catch((error) => {
  console.error("Echec inattendu du script de sante :", error);
  process.exitCode = 1;
});
