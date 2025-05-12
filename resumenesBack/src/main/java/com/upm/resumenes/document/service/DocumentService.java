package com.upm.resumenes.document.service;


import com.upm.resumenes.document.dto.DocumentRequestDTO;
import com.upm.resumenes.document.dto.DocumentResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DocumentService {

    DocumentResponseDTO uploadDocument(MultipartFile file, DocumentRequestDTO request, Long userId);

    DocumentResponseDTO getDocument(Long id, boolean isPremiumUser);

    List<DocumentResponseDTO> listDocuments(boolean isPremiumUser);
}
