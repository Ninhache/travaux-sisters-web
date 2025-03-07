"use client";

import { useSession } from "@/context/session-context";
import {
  Comment,
  deleteCommentById,
  deleteMessageById,
  getCommentsByMessageId,
  getThreads,
  postCommentsOnMessageId,
  Thread,
} from "@/lib/api/forum";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit2,
  MessageSquare,
  MoreHorizontal,
  Send,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";

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

  useEffect(() => {
    if (initialThreads) {
      setThreads(initialThreads);
    } else {
      fetchThreads();
    }
  }, [initialThreads, categoryId]);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const apiThreads = await getThreads({ categorieId: categoryId });

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
    const comments = await getCommentsByMessageId({ messageId: threadId });

    const { commentaires } = comments;

    setThreadComments((prev) => ({
      ...prev,
      [threadId]: commentaires,
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

      await postCommentsOnMessageId({
        token,
        messageId: threadId,
        contenu: commentInputs[threadId],
      });

      const comments = await getCommentsByMessageId({ messageId: threadId });

      setThreadComments((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), comments],
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
      {threads
        .sort((a, b) => b.id - a.id)
        .map((thread, index) => (
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
  const { user, token, isConnected } = useSession();

  const handleEdit = (
    e: MouseEvent<HTMLAnchorElement>,
    id: string | number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Edit thread:", id);
  };

  const handleDelete = (e: MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) return;

    if (confirm("Are you sure you want to delete this thread?")) {
      console.log("Delete thread:", id);
      deleteMessageById({ messageId: id, token });
    }
  };
  return (
    <div className="card bg-base-100 shadow-sm transition-shadow hover:shadow">
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {/* User Avatar */}
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 h-8 w-8 rounded-full ring ring-offset-2">
                  <Image
                    src={`/profile/${thread.author.idPicture}.webp`}
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="h-4 w-4 rounded-full"
                  />
                </div>
              </div>

              <span className="card-title hover:text-primary text-lg transition-colors sm:text-xl">
                {thread.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="badge badge-outline font-bold text-white capitalize"
                // style={getCategoryGradient(thread.category, thread.subcategory)}
              >
                {thread.categorie.libelle}
              </div>

              {/* Discrete dropdown menu for edit/delete using DaisyUI */}
              {thread.author.name === user?.username ? (
                <>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-xs btn-circle"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                    >
                      <li>
                        <a onClick={(e) => handleEdit(e, thread.id)}>
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => handleDelete(e, thread.id)}
                          className="text-error"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="h-6 w-6" />
              )}
            </div>
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
                  <div
                    key={comment.id}
                    className="bg-base-200 relative rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="h-6 w-6 rounded-full">
                            <Image
                              src={`/profile/${comment.liteAuthor.idPicture}.webp`}
                              alt="User Avatar"
                              width={80}
                              height={80}
                              className="h-4 w-4 rounded-full"
                            />
                          </div>
                        </div>
                        <div className="font-medium">
                          {comment.liteAuthor.name}
                        </div>
                      </div>
                      <div className="text-base-content/60 flex items-center gap-2 text-xs">
                        {comment.date}

                        {user?.username === comment.liteAuthor.name && (
                          <div className="inline-flex">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm("Delete this comment?")) {
                                  console.log("Delete comment:", comment.id);
                                  if (!token) return;
                                  deleteCommentById({
                                    token,
                                    commentId: comment.id,
                                    messageId: thread.id,
                                  });
                                }
                              }}
                              className="btn btn-ghost btn-xs btn-circle text-error"
                              data-tip="Delete"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
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
            {isConnected ? (
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
            ) : (
              <div
                className="tooltip tooltip-bottom w-full"
                data-tip="Il faut vous connecter pour commenter ce message"
              >
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="input input-bordered flex-grow text-sm"
                    disabled={true}
                  />
                  <button className="btn btn-primary btn-sm" disabled={true}>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
