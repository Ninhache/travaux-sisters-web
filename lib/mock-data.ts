import type { Thread } from "@/types/forum";

export const mockCategories = [
  {
    name: "General Discussion",
    slug: "general-discussion",
    subcategories: [
      { name: "Introductions", slug: "introductions" },
      { name: "Off-Topic", slug: "off-topic" },
    ],
  },
  {
    name: "Support",
    slug: "support",
    subcategories: [
      { name: "Technical Issues", slug: "technical-issues" },
      { name: "Feature Requests", slug: "feature-requests" },
    ],
  },
  {
    name: "Development",
    slug: "development",
    subcategories: [
      { name: "Announcements", slug: "announcements" },
      { name: "API", slug: "api" },
    ],
  },
] as const;

export type CategoryNames = (typeof mockCategories)[number]["name"];
export type SubcategoryNames =
  (typeof mockCategories)[number]["subcategories"][number]["name"];

export type CategorySlugs = (typeof mockCategories)[number]["slug"];
export type SubcategorySlugs =
  (typeof mockCategories)[number]["subcategories"][number]["slug"];

export type AllCategorySlugs = CategorySlugs | SubcategorySlugs;

export const mockThreads: Thread[] = [
  {
    id: "1",
    title: "Welcome to our new forum platform!",
    author: "Admin",
    date: "2 days ago",
    category: "general-discussion",
    subcategory: "introductions",
    replies: 24,
    text: "We're excited to launch our new forum platform. Let us know what you think!",
  },
  {
    id: "2",
    title: "How do I change my profile picture?",
    author: "NewUser123",
    date: "5 hours ago",
    category: "support",
    subcategory: "technical-issues",
    replies: 3,
    text: "I'm trying to update my profile picture but can't find the option. Can someone help?",
  },
  {
    id: "3",
    title: "Je me présente à la communauté",
    author: "JaneDoe",
    date: "Il y a 1 jour",
    category: "general-discussion",
    subcategory: "introductions",
    replies: 15,
    text: "Salut tout le monde ! Je suis nouveau ici et je voulais me présenter. Je suis développeuse logiciel au Canada.",
  },
  {
    id: "4",
    title: "Demande de fonctionnalité : Mode sombre pour le forum",
    author: "FanDuModeSombre",
    date: "Il y a 3 jours",
    category: "support",
    subcategory: "feature-requests",
    replies: 42,
    text: "Je pense que ce serait génial d'avoir une option mode sombre pour le forum. Qu'en pensez-vous ?",
  },
  {
    id: "5",
    title: "Qu'est-ce que vous regardez sur Netflix en ce moment ?",
    author: "FanDeSéries",
    date: "Il y a 12 heures",
    category: "general-discussion",
    subcategory: "off-topic",
    replies: 28,
    text: "Je viens de finir Stranger Things et je cherche des recommandations. Que regardez-vous en ce moment ?",
  },
  {
    id: "6",
    title: "Rapport de bug : Notifications ne fonctionnent pas",
    author: "ChasseurDeBugs",
    date: "Il y a 4 jours",
    category: "support",
    subcategory: "technical-issues",
    replies: 7,
    text: "Je ne reçois aucune notification lorsque quelqu'un répond à mes discussions. Est-ce que quelqu'un d'autre rencontre ce problème ?",
  },
  {
    id: "7",
    title: "Événement communautaire ce week-end !",
    author: "CoordinateurÉvénements",
    date: "Il y a 1 jour",
    category: "development",
    subcategory: "announcements",
    replies: 19,
    text: "Nous organisons une rencontre virtuelle ce week-end. Rejoignez-nous pour discuter des dernières tendances technologiques !",
  },
  {
    id: "8",
    title: "Astuces pour optimiser votre flux de travail",
    author: "GuruDeLaProductivité",
    date: "Il y a 6 jours",
    category: "general-discussion",
    subcategory: "introductions",
    replies: 31,
    text: "Je voulais partager quelques astuces qui m'ont aidé à améliorer ma productivité. Quelles stratégies utilisez-vous ?",
  },
];
