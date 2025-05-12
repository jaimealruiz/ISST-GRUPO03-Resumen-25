package com.upm.resumenes.valoracion.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.valoracion.model.Valoracion;

public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {
    Optional<Valoracion> findByUsuarioAndDocumento(User user, Document document);
    List<Valoracion> findByDocumento(Document document);
    boolean existsByUsuarioAndDocumento(User user, Document document);
}
