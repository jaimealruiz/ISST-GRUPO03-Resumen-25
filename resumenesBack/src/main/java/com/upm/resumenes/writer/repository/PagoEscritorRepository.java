package com.upm.resumenes.writer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.writer.model.PagoEscritor;
import com.upm.resumenes.writer.model.WriterInfo;

public interface PagoEscritorRepository extends JpaRepository<PagoEscritor, Long> {
    List<PagoEscritor> findByWriter(WriterInfo writer);
}