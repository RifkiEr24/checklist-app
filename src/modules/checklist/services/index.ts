import apiClient from '@/lib/axios';
import { ChecklistApiResponse, Checklist } from '../types';

export const getChecklists = (): Promise<ChecklistApiResponse> => {
  return apiClient.get('/checklist');
};

export const createChecklist = (payload: { name: string }): Promise<{ data: Checklist }> => {
  return apiClient.post('/checklist', payload);
};

export const deleteChecklist = (checklistId: number) => {
  return apiClient.delete(`/checklist/${checklistId}`);
};

export const createChecklistItem = (checklistId: number, payload: { itemName: string }) => {
  return apiClient.post(`/checklist/${checklistId}/item`, payload);
};

export const updateChecklistItemStatus = (checklistId: number, itemId: number) => {
  return apiClient.put(`/checklist/${checklistId}/item/${itemId}`);
};

export const deleteChecklistItem = (checklistId: number, itemId: number) => {
  return apiClient.delete(`/checklist/${checklistId}/item/${itemId}`);
};

export const renameChecklistItem = (checklistId: number, itemId: number, payload: { itemName: string }) => {
  return apiClient.put(`/checklist/${checklistId}/item/rename/${itemId}`, payload);
};