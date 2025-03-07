import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="hero bg-base-200 min-h-[70vh]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">TravauxSisters</h1>
            <p className="py-6">
              Pionniers dans l'optimisation des flux de travail synergiques et
              l'intégration des paradigmes émergents pour une efficacité
              maximale dans un monde en constante évolution.
            </p>
            <Link href="/services" className="btn btn-primary">
              Découvrir Nos Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Notre Expertise
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Building className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title">Solutions Innovantes</h3>
                <p>
                  Nos approches avant-gardistes redéfinissent les standards de
                  l'industrie avec une précision méticuleuse.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Briefcase className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title">Expertise Globale</h3>
                <p>
                  Notre équipe multidisciplinaire navigue avec aisance à travers
                  les complexités des défis contemporains.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <Award className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title">Excellence Reconnue</h3>
                <p>
                  Reconnus pour notre engagement inébranlable envers
                  l'excellence et la satisfaction client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Témoignages</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="mb-4 flex items-center">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Avatar"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Jean Dupont</h3>
                    <p className="text-sm opacity-70">
                      Directeur, Entreprise Imaginaire
                    </p>
                  </div>
                </div>
                <p>
                  "Après avoir fait appel à TravauxSisters, notre productivité a
                  augmenté de 250%. Leur approche quantique de la gestion de
                  projet est révolutionnaire."
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="mb-4 flex items-center">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Avatar"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Marie Lefevre</h3>
                    <p className="text-sm opacity-70">CEO, Société Fictive</p>
                  </div>
                </div>
                <p>
                  "Les solutions de TravauxSisters ont transformé notre façon de
                  penser. Leur service de Synchronisation Pigeonnier a résolu
                  des problèmes dont nous ignorions l'existence."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
