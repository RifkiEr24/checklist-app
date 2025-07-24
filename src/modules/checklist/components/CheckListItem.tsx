"use client";

import { useState, useRef, useEffect } from 'react';
import { Checkbox } from "@/common/components/ui/checkbox";
import { Input } from "@/common/components/ui/input";
import { useChecklists } from "../hooks/useChecklists";
import { ChecklistItem as ChecklistItemType } from "../types";
import { Trash2, Pencil } from "lucide-react";
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

interface ChecklistItemProps {
  item: ChecklistItemType;
  checklistId: number;
}

export function ChecklistItem({ item, checklistId }: ChecklistItemProps) {
  const { updateChecklistItemStatus, deleteChecklistItem, renameChecklistItem } = useChecklists();
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState(item.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleStatusChange = () => {
    updateChecklistItemStatus({
      checklistId,
      itemId: item.id,
    });
  };

  const handleDelete = () => {
    deleteChecklistItem({
      checklistId,
      itemId: item.id,
    });
  };

  const handleRename = () => {
    if (itemName.trim() && itemName !== item.name) {
      renameChecklistItem({
        checklistId,
        itemId: item.id,
        newName: itemName,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 group hover:bg-gray-50 rounded-md">
      <div className="flex items-center gap-4 flex-1">
        <Checkbox
          checked={item.itemCompletionStatus}
          onCheckedChange={handleStatusChange}
          className="size-5"
        />
        {isEditing ? (
          <Input
            ref={inputRef}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') {
                setItemName(item.name);
                setIsEditing(false);
              }
            }}
            className="h-8"
          />
        ) : (
          <span
            className={`text-base cursor-pointer ${
              item.itemCompletionStatus ? "line-through text-gray-400" : ""
            }`}
            onClick={handleStatusChange}
          >
            {item.name}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIsEditing(true)}>
          <Pencil className="size-4 text-gray-500 hover:text-blue-600" />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>
              <Trash2 className="size-4 text-gray-500 hover:text-red-600" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the item &quot;{item.name}&quot;.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
