"use client";

import { Thread } from "@/lib/api/forum";
import { getCategoryGradient } from "@/lib/badget-color";
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
    <div className="bg-base-100 rounded-box mb-6 p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{thread.title}</h1>
        {/* <div className="badge badge-outline capitalize">{thread.category}</div> */}
        <div
          className="badge badge-outline font-bold text-white capitalize"
          // style={getCategoryGradient(thread., thread.subcategory)}
        >
          {/* {thread.category} */}
          {thread.categorie.libelle}
        </div>
      </div>

      <div className="text-base-content/60 mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{thread.author.name}</span>
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
        <p>{thread.textResume}</p>
      </div>

      <div className="mt-6 flex gap-2">
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
