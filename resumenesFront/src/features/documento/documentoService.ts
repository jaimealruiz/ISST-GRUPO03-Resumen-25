// src/features/documento/documentoService.ts
import { api,  uploadFormData } from './../../utils/api';

export type DocumentType = 'PDF' | 'AUDIO';

export interface Document {
  id: number;
  title: string;
  description: string;
  type: DocumentType;
  url: string;
  uploadedByEmail: string;
  free: boolean;
  createdAt: string;
}

export const getAllDocuments = async (): Promise<Document[]> => {
  return await api<Document[]>('/documents');
};

export const getDocumentById = async (id: number): Promise<Document> => {
  return await api<Document>(`/documents/${id}`);
};



export const subirDocumento = async (
  file: File,
  title: string,
  description: string,
  isFree: boolean,
  type: DocumentType
): Promise<Document> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('isFree', String(isFree));
  formData.append('type', type);

  return await uploadFormData<Document>('/documents/upload', formData);
};

