import { getCategoryGradient } from "@/lib/badget-color";
import type { Thread } from "@/types/forum";
import { Calendar, MessageSquare, User } from "lucide-react";
import Link from "next/link";

interface ThreadListProps {
  threads: Thread[];
}

export default function ThreadList({ threads }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="bg-base-100 rounded-box p-8 text-center shadow-sm">
        <h3 className="text-lg font-medium mb-2">No threads found</h3>
        <p className="text-base-content/70">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow transition-shadow">
      <Link
        href={`/forum/${thread.category}/${thread.subcategory}/${thread.id}`}
        className="card-body p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="card-title text-lg sm:text-xl hover:text-primary transition-colors">
            {thread.title}
          </span>
          {/* <Link
            href={`/forum/${thread.category}/${thread.subcategory}/${thread.id}`}
            className="card-title text-lg sm:text-xl hover:text-primary transition-colors"
          >
            {thread.title}
          </Link> */}
          <div
            className="badge badge-outline capitalize font-bold text-white"
            style={getCategoryGradient(thread.category, thread.subcategory)}
          >
            {/* {thread.category} */}
            {thread.subcategory}
          </div>
        </div>

        <p className="mt-2 text-base-content/80 line-clamp-2">{thread.text}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-base-content/60">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{thread.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{thread.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{thread.replies} replies</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
