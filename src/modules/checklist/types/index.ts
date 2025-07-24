export interface ChecklistItem {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
}


export interface Checklist {
  id: number;
  name: string;
  items: ChecklistItem[] | null; 
  checklistCompletionStatus: boolean;
}

export interface ChecklistApiResponse {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: Checklist[];
}