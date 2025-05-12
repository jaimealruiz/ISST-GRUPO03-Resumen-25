import { api } from '../../utils/api'


export interface ResultadoIA {
  keywords: string[]
  resumen: string[]
}


export const obtenerResumenIA = async (documentId: number) => {
  return await api<ResultadoIA>('/api/ia/resumen', {
    method: 'POST',
    body: { documentId },
  });
};
