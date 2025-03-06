"use client";

import type React from "react";

import { useState } from "react";
import { CategorySlugs } from "@/lib/mock-data";
import { Category } from "@/lib/api/forum";

interface NewThreadModalProps {
  onClose: () => void;
  category?: Category;
}

export default function NewThreadModal({
  onClose,
  category,
}: NewThreadModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    category?.libelle || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the submission to your backend
    console.log({
      title,
      content,
      category: selectedCategory,
    });
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="mb-4 text-lg font-bold">Create New Thread</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Thread title"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {!category && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as CategorySlugs)
                }
                required
              >
                <option value="">Select a category</option>
              </select>
            </div>
          )}

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32"
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Thread
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
