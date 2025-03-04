import { MessageSquare, Eye, Pin } from "lucide-react";
import type { Category, Thread } from "@/types/forum";

interface ThreadListProps {
  threads: Thread[];
}

export default function ThreadList({ threads }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="bg-base-100 rounded-box p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
        <p className="text-base-content/70">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-box shadow-sm divide-y">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="p-4 hover:bg-base-200 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`badge ${getCategoryBadgeColor(thread.category)}`}
                >
                  {thread.category}
                </div>
              </div>
              <h3 className="font-semibold text-lg truncate hover:text-primary">
                <a href={`#thread-${thread.id}`}>{thread.title}</a>
              </h3>
              <p className="text-base-content/70 line-clamp-2 text-sm mt-1">
                {thread.text}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-base-content/60">
                <span>
                  By{" "}
                  <a href="#" className="text-base-content hover:text-primary">
                    {thread.author}
                  </a>
                </span>
                <span>{thread.date}</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{thread.replies} replies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getCategoryBadgeColor(categoryId: string): string {
  const colorMap: Record<string, string> = {
    all: "badge-neutral",
    general: "badge-info",
    feedback: "badge-warning",
    announcements: "badge-secondary",
    offtopic: "badge-accent",
  };
  return colorMap[categoryId] || "badge-neutral";
}
