package com.upm.resumenes.document.dto;

import java.time.LocalDateTime;

import com.upm.resumenes.document.model.DocumentType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class DocumentResponseDTO {
    private Long id;
    private String title;
    private String description;
    private boolean isFree;
    private DocumentType type;
    private String url;
    private String uploadedByEmail;
    private LocalDateTime createdAt;
}
