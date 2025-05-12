// buscadorService.ts
import { Document } from '../documento/documentoService';

type FilterCriteria = {
  texto?: string;
  tipo?: 'PDF' | 'AUDIO';
  fechaDesde?: string; // ISO string
  fechaHasta?: string; // ISO string
};

export const filtrarDocumentos = (
  documentos: Document[],
  filtros: FilterCriteria
): Document[] => {
  return documentos.filter((doc) => {
    const coincideTexto = filtros.texto
      ? doc.title.toLowerCase().includes(filtros.texto.toLowerCase()) ||
        doc.description.toLowerCase().includes(filtros.texto.toLowerCase())
      : true;

    const coincideTipo = filtros.tipo ? doc.type === filtros.tipo : true;

    const fechaDoc = new Date(doc.id); // O usa la fecha real si se añade al modelo
    const coincideFechaDesde = filtros.fechaDesde
      ? fechaDoc >= new Date(filtros.fechaDesde)
      : true;

    const coincideFechaHasta = filtros.fechaHasta
      ? fechaDoc <= new Date(filtros.fechaHasta)
      : true;

    return coincideTexto && coincideTipo && coincideFechaDesde && coincideFechaHasta;
  });
};
