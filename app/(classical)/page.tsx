import { Award, Briefcase, Building } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-grow">
      <section className="hero bg-base-200 min-h-[70vh]">
        <div className="hero-content w-full text-center">
          <div className="text-primary w-full">
            <h1 className="text-5xl font-bold">
              Les femmes méritent des travaux sans stress
            </h1>
            <p className="py-6 text-black">
              Pionniers dans l'optimisation des flux de travail synergiques et
              l'intégration des paradigmes émergents pour une efficacité
              maximale dans un monde en constante évolution.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Notre promesse
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Building className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title text-primary">Qualité</h3>
                <p>
                  Une qualité irréprochable en sélectionnant les meilleurs
                  artisans pour vos projets de rénovation.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Briefcase className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title text-primary">Réactivité</h3>
                <p>
                  Vous avez un contact direct avec une experte qui répond
                  rapidement à toutes vos interrogations sur votre projet
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Award className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title text-primary">Confiance</h3>
                <p>
                  Au coeur du projet, nous souhaitons rétablir la confiance
                  entre les femmes et les artisans
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
