// src/features/rating/ratingService.ts
import { api } from './../../utils/api';

export interface Valoracion {
  usuario: string;
  estrellas: number;
  comentario: string;
}

export interface RatingData {
  media: number;
  total: number;
  valoraciones: Valoracion[];
}

export const fetchValoraciones = async (documentId: number): Promise<RatingData> => {
  return await api(`/valoraciones/${documentId}`);
};

export const submitValoracion = async (
  documentId: number,
  estrellas: number,
  comentario: string
): Promise<void> => {
  await api('/valoraciones', {
    method: 'POST',
    body: { documentId, estrellas, comentario }, // ✅ SIN stringify
  });
};


export const deleteValoracion = async (documentId: number): Promise<void> => {
  await api(`/valoraciones/${documentId}`, {
    method: 'DELETE',
  });
};
