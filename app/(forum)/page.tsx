"use client";

import CategoryFilter from "@/components/forum/category-filter";
import ThreadList from "@/components/forum/thread-list";
import type { Category, Thread } from "@/types/forum";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

const categories: Category[] = [
  "all",
  "general",
  "help",
  "feedback",
  "announcements",
  "offtopic",
];

const mockThreads: Thread[] = [
  {
    id: "1",
    title: "Bienvenue sur notre nouvelle plateforme de forum !",
    author: "Admin",
    date: "Il y a 2 jours",
    category: "announcements",
    replies: 24,
    text: "Nous sommes ravis de lancer notre nouvelle plateforme de forum. Dites-nous ce que vous en pensez !",
  },
  {
    id: "2",
    title: "Comment changer ma photo de profil ?",
    author: "NouvelUtilisateur123",
    date: "Il y a 5 heures",
    category: "help",
    replies: 3,
    text: "J'essaie de mettre à jour ma photo de profil, mais je ne trouve pas l'option. Quelqu'un peut m'aider ?",
  },
  {
    id: "3",
    title: "Je me présente à la communauté",
    author: "JaneDoe",
    date: "Il y a 1 jour",
    category: "general",
    replies: 15,
    text: "Salut tout le monde ! Je suis nouveau ici et je voulais me présenter. Je suis développeuse logiciel au Canada.",
  },
  {
    id: "4",
    title: "Demande de fonctionnalité : Mode sombre pour le forum",
    author: "FanDuModeSombre",
    date: "Il y a 3 jours",
    category: "feedback",
    replies: 42,
    text: "Je pense que ce serait génial d'avoir une option mode sombre pour le forum. Qu'en pensez-vous ?",
  },
  {
    id: "5",
    title: "Qu'est-ce que vous regardez sur Netflix en ce moment ?",
    author: "FanDeSéries",
    date: "Il y a 12 heures",
    category: "offtopic",
    replies: 28,
    text: "Je viens de finir Stranger Things et je cherche des recommandations. Que regardez-vous en ce moment ?",
  },
  {
    id: "6",
    title: "Rapport de bug : Notifications ne fonctionnent pas",
    author: "ChasseurDeBugs",
    date: "Il y a 4 jours",
    category: "help",
    replies: 7,
    text: "Je ne reçois aucune notification lorsque quelqu'un répond à mes discussions. Est-ce que quelqu'un d'autre rencontre ce problème ?",
  },
  {
    id: "7",
    title: "Événement communautaire ce week-end !",
    author: "CoordinateurÉvénements",
    date: "Il y a 1 jour",
    category: "announcements",
    replies: 19,
    text: "Nous organisons une rencontre virtuelle ce week-end. Rejoignez-nous pour discuter des dernières tendances technologiques !",
  },
  {
    id: "8",
    title: "Astuces pour optimiser votre flux de travail",
    author: "GuruDeLaProductivité",
    date: "Il y a 6 jours",
    category: "general",
    replies: 31,
    text: "Je voulais partager quelques astuces qui m'ont aidé à améliorer ma productivité. Quelles stratégies utilisez-vous ?",
  },
] as const;

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const filteredThreads = mockThreads.filter((thread) => {
    const matchesCategory =
      selectedCategory === "all" || thread.category === selectedCategory;
    const matchesSearch =
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return 0;
      case "most-replies":
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-base-200">
      {/* <ForumHeader /> */}

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with categories */}
          <div className="lg:w-1/4">
            <CategoryFilter
              categories={categories}
              // selectedCategory={selectedCategory}
              // onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            {/* Search and filters */}
            <div className="bg-base-100 rounded-box p-4 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="input input-bordered w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 h-5 w-5" />
                </div>
                <div className="flex gap-2">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-outline gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Sort by
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a
                          onClick={() => setSortBy("newest")}
                          className={sortBy === "newest" ? "active" : ""}
                        >
                          Newest
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => setSortBy("most-replies")}
                          className={sortBy === "most-replies" ? "active" : ""}
                        >
                          Most replies
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn-primary">New Thread</button>
                </div>
              </div>
            </div>

            {/* Thread list */}
            <ThreadList threads={sortedThreads} />
          </div>
        </div>
      </main>
    </div>
  );
}
