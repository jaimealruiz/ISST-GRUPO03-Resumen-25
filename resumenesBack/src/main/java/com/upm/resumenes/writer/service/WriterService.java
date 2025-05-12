package com.upm.resumenes.writer.service;

import com.upm.resumenes.writer.dto.PagoEscritorDTO;
import com.upm.resumenes.writer.dto.WriterDashboardDTO;

public interface WriterService {
    WriterDashboardDTO getDashboard(String email);
    PagoEscritorDTO retirarSaldo(String email);
}
