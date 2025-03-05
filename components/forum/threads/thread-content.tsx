"use client";

import { getCategoryGradient } from "@/lib/badget-color";
import type { Thread } from "@/types/forum";
import {
  Calendar,
  Flag,
  MessageSquare,
  Share2,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState } from "react";

interface ThreadContentProps {
  thread: Thread;
}

export default function ThreadContent({ thread }: ThreadContentProps) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div className="bg-base-100 rounded-box p-6 shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">{thread.title}</h1>
        {/* <div className="badge badge-outline capitalize">{thread.category}</div> */}
        <div
          className="badge badge-outline capitalize font-bold text-white"
          style={getCategoryGradient(thread.category, thread.subcategory)}
        >
          {/* {thread.category} */}
          {thread.subcategory}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-base-content/60">
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

      <div className="prose max-w-none">
        <p>{thread.text}</p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          className={`btn btn-sm ${
            liked ? "btn-primary" : "btn-outline"
          } gap-2`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-4 w-4" />
          {likes > 0 && likes}
          {liked ? "Liked" : "Like"}
        </button>
        <button className="btn btn-sm btn-outline gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </button>
        <button className="btn btn-sm btn-outline gap-2">
          <Flag className="h-4 w-4" />
          Report
        </button>
      </div>
    </div>
  );
}
