package com.upm.resumenes.document.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.user.model.User;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByIsFreeTrue();
    List<Document> findByUploadedBy(User user);
    
}
