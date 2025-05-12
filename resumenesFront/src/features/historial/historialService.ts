// src/features/home/historialService.ts
import { api } from './../../utils/api';

export interface HistorialItem {
  documentId: number;
  title: string;
  lastAccess: string;
  progreso: number;
  startDate: string;
  url: string;
  type: 'PDF' | 'AUDIO';
  free: boolean;
}

// Obtener historial completo
export const getHistorial = async (): Promise<HistorialItem[]> => {
  return await api<HistorialItem[]>('/historial');
};

// Actualizar progreso de lectura
export const updateProgreso = async (
  documentId: number,
  progreso: number
): Promise<void> => {
  await api('/historial/actualizar', {
    method: 'POST',
    body: { documentId, progreso }, // ✅ sin JSON.stringify
  });
};

