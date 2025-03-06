"use client";

import { useSession } from "@/context/session-context";
import {
  Comment,
  getThreads,
  postCommentsOnMessageId,
  Thread,
} from "@/lib/api/forum";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ThreadListProps {
  initialThreads?: Thread[];
  categoryId?: number;
}

export default function ThreadList({
  initialThreads,
  categoryId,
}: ThreadListProps) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads || []);
  const [expandedThreads, setExpandedThreads] = useState<
    Record<string, boolean>
  >({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );
  const [threadComments, setThreadComments] = useState<
    Record<string, Comment[]>
  >({});
  const [loading, setLoading] = useState<boolean>(!initialThreads);
  const [commentLoading, setCommentLoading] = useState<Record<string, boolean>>(
    {},
  );
  const { token } = useSession();

  // Fetch threads on component mount if not provided
  useEffect(() => {
    if (!initialThreads) {
      fetchThreads();
    }
  }, [initialThreads, categoryId]);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const apiThreads = await getThreads({ categorieId: categoryId });

      // Map API threads to component threads
      // const mappedThreads = apiThreads.map((thread: Thread) => ({
      //   id: thread.title.toLowerCase().replace(/\s+/g, "-"),
      //   title: thread.title,
      //   text: thread.textResume,
      //   replies: thread.replies,
      //   author: thread.author.name,
      //   date: thread.date,
      //   category: thread.categorie.libelle,
      //   subcategory:
      //     thread.categorie.categorieChildren?.[0]?.libelle ||
      //     thread.categorie.libelle,
      // }));

      setThreads(apiThreads);
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleThread = async (threadId: number) => {
    const isExpanding = !expandedThreads[threadId];

    setExpandedThreads((prev) => ({
      ...prev,
      [threadId]: isExpanding,
    }));

    if (isExpanding && !threadComments[threadId]) {
      fetchComments(threadId);
    }
  };

  const fetchComments = async (threadId: number) => {
    // todo
    setThreadComments((prev) => ({
      ...prev,
      [threadId]: [],
    }));
  };

  const handleCommentInputChange = (threadId: number, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [threadId]: value,
    }));
  };

  const handleSubmitComment = async (threadId: number) => {
    if (!commentInputs[threadId]?.trim()) return;

    try {
      setCommentLoading((prev) => ({ ...prev, [threadId]: true }));

      if (!token) {
        alert("You must be logged in to comment");
        return;
      }

      const response = await postCommentsOnMessageId({
        token,
        messageId: threadId,
        contenu: commentInputs[threadId],
      });

      const newComment: Comment = {
        id: response.id,
        user: response.user,
        contenu: response.contenu,
        date: response.date,
      };

      setThreadComments((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), newComment],
      }));

      setCommentInputs((prev) => ({
        ...prev,
        [threadId]: "",
      }));
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setCommentLoading((prev) => ({ ...prev, [threadId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="bg-base-100 rounded-box p-8 text-center shadow-sm">
        <h3 className="mb-2 text-lg font-medium">Loading threads...</h3>
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="bg-base-100 rounded-box p-8 text-center shadow-sm">
        <h3 className="mb-2 text-lg font-medium">No threads found</h3>
        <p className="text-base-content/70">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread, index) => (
        <ThreadCard
          key={`thread-${index}`}
          thread={thread}
          isExpanded={!!expandedThreads[thread.id]}
          toggleExpand={() => toggleThread(thread.id)}
          comments={threadComments[thread.id] || []}
          commentInput={commentInputs[thread.id] || ""}
          onCommentInputChange={(value) =>
            handleCommentInputChange(thread.id, value)
          }
          onSubmitComment={() => handleSubmitComment(thread.id)}
          isCommentLoading={commentLoading[thread.id] || false}
        />
      ))}
    </div>
  );
}

interface ThreadCardProps {
  thread: Thread;
  isExpanded: boolean;
  toggleExpand: () => void;
  comments: Comment[];
  commentInput: string;
  onCommentInputChange: (value: string) => void;
  onSubmitComment: () => void;
  isCommentLoading: boolean;
}

function ThreadCard({
  thread,
  isExpanded,
  toggleExpand,
  comments,
  commentInput,
  onCommentInputChange,
  onSubmitComment,
  isCommentLoading,
}: ThreadCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm transition-shadow hover:shadow">
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="card-title hover:text-primary text-lg transition-colors sm:text-xl">
              {thread.title}
            </span>
            {/* <div
              className="badge badge-outline font-bold text-white capitalize"
              // style={getCategoryGradient(thread.category, thread.subcategory)}
            >
              {thread.categorie.map((i) => i.libelle).join(",")}
            </div> */}
          </div>

          <p className="text-base-content/80 mt-2 line-clamp-2">
            {thread.textResume}
          </p>
        </div>

        <div className="text-base-content/60 mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{thread.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{thread.date}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleExpand();
            }}
            className="hover:text-primary flex items-center gap-1 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{thread.replies} replies</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Comments section */}
        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <div className="space-y-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-base-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{comment.user.username}</div>
                      <div className="text-base-content/60 text-xs">
                        {comment.date}
                      </div>
                    </div>
                    <p className="mt-1 text-sm">{comment.contenu}</p>
                  </div>
                ))
              ) : (
                <p className="text-base-content/60 text-center text-sm">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* Add comment form */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="input input-bordered flex-grow text-sm"
                value={commentInput}
                onChange={(e) => onCommentInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && commentInput.trim()) {
                    onSubmitComment();
                  }
                }}
                disabled={isCommentLoading}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={onSubmitComment}
                disabled={!commentInput.trim() || isCommentLoading}
              >
                {isCommentLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
