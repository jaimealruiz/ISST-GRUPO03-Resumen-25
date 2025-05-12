package com.upm.resumenes.writer.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.document.repository.DocumentRepository;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;
import com.upm.resumenes.valoracion.model.Valoracion;
import com.upm.resumenes.valoracion.repository.ValoracionRepository;
import com.upm.resumenes.valoracion.service.ValoracionService;
import com.upm.resumenes.writer.dto.DocumentoStatsDTO;
import com.upm.resumenes.writer.dto.PagoEscritorDTO;
import com.upm.resumenes.writer.dto.WriterDashboardDTO;
import com.upm.resumenes.writer.model.PagoEscritor;
import com.upm.resumenes.writer.model.WriterInfo;
import com.upm.resumenes.writer.repository.PagoEscritorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WriterServiceImpl implements WriterService {

        private final UserRepository userRepository;
        private final DocumentRepository documentRepository;
        private final PagoEscritorRepository pagoRepository;
        private final ValoracionRepository valoracionRepository;

        private final double GANANCIA_POR_VISITA = 0.05;

        @Override
        public WriterDashboardDTO getDashboard(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                WriterInfo writerInfo = user.getWriterInfo();
                if (writerInfo == null) {
                        throw new RuntimeException("El usuario no es un escritor válido.");
                }

                List<Document> documentos = documentRepository.findByUploadedBy(user);
                int totalDocumentos = documentos.size();

                // Fecha de último retiro (si existe)
                LocalDate ultimaFechaRetiro = writerInfo.getPagos().stream()
                                .map(PagoEscritor::getFecha)
                                .max(LocalDate::compareTo)
                                .orElse(null);

                double saldo = 0;
                List<DocumentoStatsDTO> stats = new ArrayList<>();

                for (Document doc : documentos) {
                        List<Valoracion> valoraciones = valoracionRepository.findByDocumento(doc);

                        // Para calcular saldo, filtrar valoraciones desde último retiro
                        List<Valoracion> valoracionesDesdeUltimoRetiro = (ultimaFechaRetiro != null)
                                        ? valoraciones.stream().filter(v -> v.getFecha().isAfter(ultimaFechaRetiro))
                                                        .toList()
                                        : valoraciones;

                        double media = valoraciones.stream().mapToInt(Valoracion::getEstrellas).average().orElse(0.0);
                        stats.add(new DocumentoStatsDTO(doc.getId(), doc.getTitle(), valoraciones.size(), media));

                        if (!valoracionesDesdeUltimoRetiro.isEmpty()) {
                                double mediaDesdeUltimo = valoracionesDesdeUltimoRetiro.stream()
                                                .mapToInt(Valoracion::getEstrellas).average().orElse(0.0);
                                saldo += valoracionesDesdeUltimoRetiro.size() * mediaDesdeUltimo * 0.01;
                        }
                }

                List<PagoEscritorDTO> pagos = writerInfo.getPagos().stream()
                                .map(p -> new PagoEscritorDTO(p.getFecha(), p.getCantidad()))
                                .toList();

                return new WriterDashboardDTO(totalDocumentos, stats, saldo, pagos);
        }

        // WriterServiceImpl.java
        @Override
        public PagoEscritorDTO  retirarSaldo(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                WriterInfo writerInfo = user.getWriterInfo();
                if (writerInfo == null) {
                        throw new RuntimeException("El usuario no es un escritor válido.");
                }

                List<Document> documentos = documentRepository.findByUploadedBy(user);

                LocalDate ultimaFechaRetiro = writerInfo.getPagos().stream()
                                .map(PagoEscritor::getFecha)
                                .max(LocalDate::compareTo)
                                .orElse(null);

                double saldo = 0;

                for (Document doc : documentos) {
                        List<Valoracion> valoraciones = valoracionRepository.findByDocumento(doc);

                        List<Valoracion> valoracionesDesdeUltimoRetiro = (ultimaFechaRetiro != null)
                                        ? valoraciones.stream().filter(v -> v.getFecha().isAfter(ultimaFechaRetiro))
                                                        .toList()
                                        : valoraciones;

                        if (!valoracionesDesdeUltimoRetiro.isEmpty()) {
                                double media = valoracionesDesdeUltimoRetiro.stream()
                                                .mapToInt(Valoracion::getEstrellas).average().orElse(0.0);
                                saldo += valoracionesDesdeUltimoRetiro.size() * media * 0.01;
                        }
                }

                if (saldo > 0) {
                        PagoEscritor pago = new PagoEscritor();
                        pago.setFecha(LocalDate.now());
                        pago.setCantidad(saldo);
                        pago.setWriter(writerInfo);

                        pagoRepository.save(pago);

                        return new PagoEscritorDTO(pago.getFecha(), pago.getCantidad());
                }

                return null;
        }

}
