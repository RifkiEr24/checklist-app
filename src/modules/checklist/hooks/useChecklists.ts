"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import {
  getChecklists,
  createChecklist,
  deleteChecklist,
  updateChecklistItemStatus,
  createChecklistItem,
  deleteChecklistItem,
  renameChecklistItem, 
} from '@/modules/checklist/services';
import { useSearchStore } from '@/common/stores/searchStore';
import { Checklist } from '@/modules/checklist/types';

export const useChecklists = () => {
  const queryClient = useQueryClient();
  const { searchTerm } = useSearchStore();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['checklists', debouncedSearchTerm], 
    queryFn: getChecklists,
    select: (response) => {
        const checklistsArray: Checklist[] = response.data.data || [];

        const sanitizedChecklists = checklistsArray.map(checklist => ({
            ...checklist,
            items: checklist.items || [],
        }));

        if (!debouncedSearchTerm) {
            return sanitizedChecklists;
        }
        
        return sanitizedChecklists.filter(checklist => 
            checklist.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    },
  });

  const createChecklistMutation = useMutation({
    mutationFn: (newName: string) => createChecklist({ name: newName }),
    onSuccess: () => {
      toast.success('Checklist created successfully!');
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
    onError: () => {
      toast.error('Failed to create checklist.');
    },
  });

  const deleteChecklistMutation = useMutation({
    mutationFn: (checklistId: number) => deleteChecklist(checklistId),
    onSuccess: () => {
      toast.success('Checklist deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
    onError: () => {
      toast.info('Delete Checklist Feature is coming soon!');
    },
  });

  const updateItemStatusMutation = useMutation({
    mutationFn: (variables: { checklistId: number; itemId: number }) => 
      updateChecklistItemStatus(variables.checklistId, variables.itemId),
    onSuccess: () => {
      toast.success('Item status updated!');
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
    onError: () => {
      toast.error('Failed to update item status.');
    },
  });

  const createItemMutation = useMutation({
    mutationFn: (variables: { checklistId: number; itemName: string }) =>
      createChecklistItem(variables.checklistId, { itemName: variables.itemName }),
    onSuccess: () => {
      toast.success('Item added successfully!');
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
    onError: () => {
      toast.error('Failed to add item.');
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (variables: { checklistId: number; itemId: number }) =>
      deleteChecklistItem(variables.checklistId, variables.itemId),
    onSuccess: () => {
        toast.success('Item deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
    onError: () => {
        toast.error('Failed to delete item.');
    }
  });

  const renameItemMutation = useMutation({
    mutationFn: (variables: { checklistId: number; itemId: number; newName: string }) =>
        renameChecklistItem(variables.checklistId, variables.itemId, { itemName: variables.newName }),
    onSuccess: () => {
        toast.success('Item renamed successfully!');
        queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
    onError: () => {
        toast.error('Failed to rename item.');
    }
  });

  return {
    checklists: data ?? [],
    isLoading,
    isError,
    createChecklist: createChecklistMutation.mutate,
    deleteChecklist: deleteChecklistMutation.mutate,
    updateChecklistItemStatus: updateItemStatusMutation.mutate,
    createChecklistItem: createItemMutation.mutate,
    deleteChecklistItem: deleteItemMutation.mutate,
    renameChecklistItem: renameItemMutation.mutate,
  };
};
