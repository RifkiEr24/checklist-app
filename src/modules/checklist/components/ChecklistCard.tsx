"use client";

import { useState } from "react";
import { Checklist } from "../types";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { useChecklists } from "../hooks/useChecklists";
import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/common/components/ui/alert-dialog";
import { ChecklistItem } from "./CheckListItem";

interface ChecklistCardProps {
  checklist: Checklist;
}

export function ChecklistCard({ checklist }: ChecklistCardProps) {
  const [newItemName, setNewItemName] = useState("");
  const { createChecklistItem, deleteChecklist } = useChecklists();

  const handleAddItem = () => {
    if (newItemName.trim()) {
      createChecklistItem(
        { checklistId: checklist.id, itemName: newItemName },
        {
          onSuccess: () => setNewItemName(""),
        }
      );
    }
  };

  const handleDeleteChecklist = () => {
    deleteChecklist(checklist.id);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border min-h-[200px]">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{checklist.name}</h3>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button>
                    <Trash2 className="size-5 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the checklist &quot;{checklist.name}&quot; and all its items.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteChecklist}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        {checklist.items && checklist.items.length > 0 ? (
            checklist.items.map((item) => (
                <ChecklistItem key={item.id} item={item} checklistId={checklist.id} />
            ))
        ) : (
            <div className="flex-1 flex items-center justify-center text-center text-sm text-gray-400">
                <p>No items in this checklist yet. <br /> Add one below to get started.</p>
            </div>
        )}
      </div>
      <div className="flex gap-2 mt-auto pt-2">
        <Input
          placeholder="Add new item..."
          className="!h-[40px] text-sm"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
        />
        <Button onClick={handleAddItem} className="!h-[40px] text-sm">Add</Button>
      </div>
    </div>
  );
}
