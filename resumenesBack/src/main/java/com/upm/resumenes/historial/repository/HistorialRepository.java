package com.upm.resumenes.historial.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.historial.model.Historial;
import com.upm.resumenes.user.model.User;

public interface HistorialRepository extends JpaRepository<Historial, Long> {
    Optional<Historial> findByUsuarioAndDocumento(User user, Document document);
    List<Historial> findByUsuario(User user);
}

