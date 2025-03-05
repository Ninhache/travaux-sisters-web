"use client";

import ThreadList from "@/components/forum/threads/thread-list";
import type { Subcategory, tCategory, Thread } from "@/types/forum";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import NewThreadModal from "../threads/new-thread-modal";

interface SubcategoryPageContentProps {
  category: tCategory;
  subcategory: Subcategory;
  initialThreads: Thread[];
}

export default function SubcategoryPageContent({
  category,
  subcategory,
  initialThreads,
}: SubcategoryPageContentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);

  const filteredThreads = initialThreads.filter(
    (thread) =>
      searchQuery === "" ||
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="mb-6 flex items-center space-x-2">
        <h1 className="text-2xl font-bold">{subcategory.name}</h1>
        <span className="text-lg text-gray-500">({initialThreads.length})</span>
      </div>

      <div className="bg-base-100 rounded-box mb-6 p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={`Search in ${subcategory.name}...`}
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="text-base-content/50 absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
          </div>
          <button
            className="btn btn-primary gap-2"
            onClick={() => setShowNewThreadModal(true)}
          >
            <Plus className="h-4 w-4" />
            New Thread
          </button>
        </div>
      </div>

      <ThreadList threads={filteredThreads} />

      {showNewThreadModal && (
        <NewThreadModal
          onClose={() => setShowNewThreadModal(false)}
          category={category}
          subcategory={subcategory}
        />
      )}
    </>
  );
}
