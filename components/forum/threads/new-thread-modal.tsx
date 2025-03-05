"use client";

import type React from "react";

import type { Category, Subcategory } from "@/types/forum";
import { useState } from "react";

interface NewThreadModalProps {
  onClose: () => void;
  category?: Category;
  subcategory?: Subcategory;
}

export default function NewThreadModal({
  onClose,
  category,
  subcategory,
}: NewThreadModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    category?.slug || ""
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subcategory?.slug || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the submission to your backend
    console.log({
      title,
      content,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    });
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Create New Thread</h3>
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
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {/* You would populate this dynamically with available categories */}
              </select>
            </div>
          )}

          {(!subcategory || selectedCategory) && (
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Subcategory</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                required
              >
                <option value="">Select a subcategory</option>
                {/* You would populate this dynamically with available subcategories */}
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
