"use client";

import { useChecklists } from "../hooks/useChecklists";
import { FileText, Loader2 } from "lucide-react";
import { ChecklistCard } from "./ChecklistCard";

export default function ChecklistGrid() {
  const { checklists, isLoading, isError } = useChecklists();

  if (isLoading) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center text-center gap-4 py-12 text-gray-500">
        <Loader2 className="h-12 w-12 animate-spin text-[#50B5FF]" />
        <p className="text-sm">Loading your checklists...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-16 text-center text-red-500">
        Failed to load checklists. Please try again later.
      </div>
    );
  }

  if (checklists.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center text-center gap-4 py-12">
        <FileText className="h-16 w-16 text-gray-300" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800">
            No Checklists Found
          </h3>
          <p className="text-sm text-gray-500">
            Create your first checklist to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
      {checklists.map((checklist) => (
        <ChecklistCard key={checklist.id} checklist={checklist} />
      ))}
    </div>
  );
}