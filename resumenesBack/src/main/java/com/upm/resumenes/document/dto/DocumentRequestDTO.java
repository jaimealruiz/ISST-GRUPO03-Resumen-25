package com.upm.resumenes.document.dto;

import com.upm.resumenes.document.model.DocumentType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class DocumentRequestDTO {
    private String title;
    private String description;
    private boolean isFree;
    private DocumentType type;
}
