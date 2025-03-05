import { ParamsProps } from "@/app/(classical)/devis/[id]/page";
import CommentSection from "@/components/forum/comments/comment-section";
import ThreadContent from "@/components/forum/threads/thread-content";
import { mockThreads } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const mockComments = [
  {
    id: "c1",
    threadId: "1",
    author: "JaneDoe",
    date: "Il y a 1 jour",
    text: "Merci pour cette nouvelle plateforme ! L'interface est très intuitive.",
    likes: 5,
  },
  {
    id: "c2",
    threadId: "1",
    author: "TechGuru",
    date: "Il y a 1 jour",
    text: "Je suis d'accord, c'est beaucoup plus facile à utiliser que l'ancienne version. J'apprécie particulièrement la nouvelle fonction de recherche.",
    likes: 3,
  },
  {
    id: "c3",
    threadId: "1",
    author: "NouvelUtilisateur123",
    date: "Il y a 12 heures",
    text: "Est-ce qu'il y aura une application mobile bientôt ?",
    likes: 0,
  },
];

interface ThreadPageProps {
  category: string;
  threadId: string;
}
export default async function ThreadPage({
  params,
}: ParamsProps<ThreadPageProps>) {
  const { category, threadId } = await params;

  const thread = mockThreads.find((t) => t.id === threadId);

  if (!thread || thread.category !== category) {
    notFound();
  }

  const threadComments = mockComments.filter((c) => c.threadId === threadId);

  return (
    <>
      <Link
        href={`/forum/${category}`}
        className="btn btn-ghost btn-sm mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {category}
      </Link>
      <main className="container mx-auto py-4">
        <ThreadContent thread={thread} />

        <CommentSection comments={threadComments} threadId={threadId} />
      </main>
    </>
  );
}
