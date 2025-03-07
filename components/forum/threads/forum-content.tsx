"use client";

import ThreadList from "@/components/forum/threads/thread-list";
import { Category, Thread } from "@/lib/api/forum";
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import NewThreadModal from "./new-thread-modal";
import { useSession } from "@/context/session-context";

interface ForumContentProps {
  initialThreads: Thread[];
  categories: Category[];
}

export default function ForumContent({
  initialThreads,
  categories,
}: ForumContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);

  const { isConnected } = useSession();

  const filteredThreads = initialThreads.filter((thread) => {
    const q = searchQuery.toLowerCase();
    return (
      thread.title.toLowerCase().includes(q) ||
      thread.textResume.toLowerCase().includes(q) ||
      thread.author.name.toLowerCase().includes(q)
    );
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case "most-replies":
        return b.replies - a.replies;
      case "newest":
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="bg-base-100 rounded-box mb-6 p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search discussions..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="text-base-content/50 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          </div>

          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-outline gap-2">
                <Filter className="h-4 w-4" />
                Sort by
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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

            {isConnected ? (
              <button
                className="btn btn-primary gap-2"
                onClick={() => setShowNewThreadModal(true)}
              >
                <Plus className="h-4 w-4" />
                New Thread
              </button>
            ) : (
              <div
                className="tooltip tooltip-bottom"
                data-tip="You need to be connected to access this link"
              >
                <button className="btn btn-ghost bg-primary/25 gap-2" disabled>
                  <Plus className="h-4 w-4" />
                  New Thread
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ThreadList initialThreads={sortedThreads} />

      {showNewThreadModal && (
        <NewThreadModal
          categories={categories}
          onClose={() => setShowNewThreadModal(false)}
        />
      )}
    </div>
  );
}
