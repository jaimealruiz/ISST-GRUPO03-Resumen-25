// src/features/writer/writerService.ts
import { api } from './../../utils/api';

export interface DocumentoStats {
  id: number;
  titulo: string;
  totalValoraciones: number;
  mediaEstrellas: number;
}

export interface Retiro {
  fecha: string;
  cantidad: number;
}

export interface WriterDashboard {
  saldoActual: number;
  retiros: Retiro[];
  documentos: DocumentoStats[];
}

// Obtener el dashboard del escritor
export const fetchDashboard = async (): Promise<WriterDashboard> => {
  return await api('/writer/dashboard');
};

// Realizar retiro de saldo
export const retirarSaldo = async (): Promise<Retiro> => {
  return await api('/writer/retirar', {
    method: 'POST',
  });
};
{/*
// Subir nuevo documento (idéntico a documentoService)
export const subirDocumento = async (
  file: File,
  title: string,
  description: string,
  isFree: boolean,
  type: 'PDF' | 'AUDIO'
): Promise<any> => {

  const formData = new FormData();
  formData.append('file', file);
  console.log("Data: ", formData);
  return await api(`/documents/upload?title=${title}&description=${description}&isFree=${isFree}&type=${type}`, {
    method: 'POST',
    body: formData,
  });
};

*/}
