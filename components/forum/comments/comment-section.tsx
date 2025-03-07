"use client";

import { useSession } from "@/context/session-context";
import { Comment } from "@/lib/api/forum";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

interface CommentSectionProps {
  comments: Comment[];
  threadId: string;
}

export default function CommentSection({
  comments,
  threadId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const { token } = useSession();

  // const handleSubmitComment = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!newComment.trim()) return;

  //   // Create a new comment object
  //   const newCommentObj: Comment = {
  //     id: `temp-${Date.now()}`,
  //     threadId,
  //     author: "CurrentUser",
  //     date: "À l'instant",
  //     text: newComment,
  //     likes: 0,
  //   };

  //   postCommentsOnMessageId({
  //     token,
  //     contenu: newComment,
  //     messageId: threadId,
  //   });

  //   // Add the new comment to the local state
  //   setLocalComments([...localComments, newCommentObj]);
  //   setNewComment("");
  // };

  // const handleLikeComment = (commentId: number) => {
  //   setLocalComments(
  //     localComments.map((comment) =>
  //       comment.id === commentId
  //         ? { ...comment, likes: comment.likes + 1 }
  //         : comment,
  //     ),
  //   );
  // };

  return (
    <>
      {/* Comments list */}
      <div className="bg-base-100 rounded-box mb-6 p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Comments ({localComments.length})
        </h2>

        <div className="space-y-6">
          {localComments.length === 0 ? (
            <p className="text-base-content/70 py-4 text-center">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            localComments.map((comment) => (
              <div key={comment.id} className="border-b pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="avatar">
                    <div className="avatar w-10 rounded-full bg-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium">
                        {comment.liteAuthor.name}
                      </span>
                      <span className="text-base-content/60 text-xs">
                        {comment.date}
                      </span>
                    </div>
                    <p className="mb-3">{comment.contenu}</p>
                    <div className="flex items-center gap-4">
                      <button
                        className="btn btn-xs btn-ghost gap-1"
                        // onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {/* {comment.likes > 0 && <span>{comment.likes}</span>} */}
                        0
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

      <div className="bg-base-100 rounded-box p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Add a Comment</h2>

        {/* onSubmit={handleSubmitComment} */}
        <form>
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
