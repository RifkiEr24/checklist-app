"use client";

import { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import withAuth from "@/modules/auth/components/WithAuth";
import { useChecklists } from "@/modules/checklist/hooks/useChecklists";
import ChecklistGrid from "@/modules/checklist/components/ChecklistGrid";

function ChecklistPage() {
  const [newChecklistName, setNewChecklistName] = useState("");
  const { createChecklist, isLoading } = useChecklists();

  const handleAddChecklist = () => {
    if (newChecklistName.trim()) {
      createChecklist(newChecklistName, {
        onSuccess: () => {
          setNewChecklistName("");
        },
      });
    }
  };

  return (
    <div className="p-8">
        <div className="max-w-xl mb-8">
            <span className="text-[#7D7D7D] text-lg font-medium">
            Create a new Checklist
            </span>
            <div className="flex gap-4 mt-2">
            <Input
                placeholder="Enter checklist title..."
                className="!h-[54px] text-xl font-semibold"
                value={newChecklistName}
                onChange={(e) => setNewChecklistName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddChecklist()}
            />
            <Button
                className="!h-[54px] w-[150px] text-lg font-bold"
                onClick={handleAddChecklist}
                disabled={isLoading || !newChecklistName.trim()}
            >
                {isLoading ? "Adding..." : "Add"}
            </Button>
            </div>
        </div>
      
        <ChecklistGrid />
    </div>
  );
}

export default withAuth(ChecklistPage);
