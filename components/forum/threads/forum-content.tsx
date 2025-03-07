"use client";

import ThreadList from "@/components/forum/threads/thread-list";
import { useSession } from "@/context/session-context";
import { Category, getThreads, Thread } from "@/lib/api/forum"; // <-- assume you have a way to fetch threads
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import NewThreadModal from "./new-thread-modal";
import { useParams, usePathname } from "next/navigation";

interface ForumContentProps {
  initialThreads: Thread[];
  categories: Category[];
}

export default function ForumContent({
  initialThreads,
  categories,
}: ForumContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);

  const params = useParams();

  const { isConnected } = useSession();

  // Optional: Re-filter the local "threads" if you're handling search
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = initialThreads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(q) ||
        (thread.textResume?.toLowerCase().includes(q) ?? false) ||
        (thread.author?.name?.toLowerCase().includes(q) ?? false),
    );
    setThreads(filtered);
  }, [searchQuery, initialThreads]);

  const refreshThreads = async () => {
    const updatedThreads = await getThreads({});
    setThreads(updatedThreads);
  };

  return (
    <div>
      <div className="bg-base-100 rounded-box mb-6 p-4 shadow-sm">
        <div className="flex flex-col justify-end gap-4 sm:flex-row">
          <div className="flex gap-2">
            {isConnected ? (
              <button
                className="btn btn-primary gap-2"
                onClick={() => setShowNewThreadModal(true)}
              >
                <Plus className="h-4 w-4" />
                Nouveau fil de discussion
              </button>
            ) : (
              <div
                className="tooltip tooltip-bottom"
                data-tip="Il faut être connecté pour créer un fil de discussion"
              >
                <button className="btn btn-ghost bg-primary/25 gap-2" disabled>
                  <Plus className="h-4 w-4" />
                  Nouveau fil de discussion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ThreadList initialThreads={threads} />

      {showNewThreadModal && (
        <NewThreadModal
          categories={categories}
          onClose={() => setShowNewThreadModal(false)}
          onThreadCreated={refreshThreads}
        />
      )}
    </div>
  );
}
