"use client";

import type React from "react";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import type { ThreadComment } from "@/types/forum";

interface CommentSectionProps {
  comments: ThreadComment[];
  threadId: string;
}

export default function CommentSection({
  comments,
  threadId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<ThreadComment[]>(comments);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    // Create a new comment object
    const newCommentObj: ThreadComment = {
      id: `temp-${Date.now()}`,
      threadId,
      author: "CurrentUser", // In a real app, this would be the logged-in user
      date: "À l'instant",
      text: newComment,
      likes: 0,
    };

    // Add the new comment to the local state
    setLocalComments([...localComments, newCommentObj]);
    setNewComment("");
  };

  const handleLikeComment = (commentId: string) => {
    setLocalComments(
      localComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  return (
    <>
      {/* Comments list */}
      <div className="bg-base-100 rounded-box p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-6">
          Comments ({localComments.length})
        </h2>

        <div className="space-y-6">
          {localComments.length === 0 ? (
            <p className="text-center text-base-content/70 py-4">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            localComments.map((comment) => (
              <div key={comment.id} className="border-b pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="avatar">
                    <div className="w-10 rounded-full avatar bg-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-base-content/60">
                        {comment.date}
                      </span>
                    </div>
                    <p className="mb-3">{comment.text}</p>
                    <div className="flex items-center gap-4">
                      <button
                        className="btn btn-xs btn-ghost gap-1"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {comment.likes > 0 && <span>{comment.likes}</span>}
                      </button>
                      <button className="btn btn-xs btn-ghost">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add comment form */}
      <div className="bg-base-100 rounded-box p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>

        <form onSubmit={handleSubmitComment}>
          <div className="form-control mb-4">
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
