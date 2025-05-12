package com.upm.resumenes.ia.dto;

import java.util.List;

public class IaResponseDTO {
    private List<String> keywords;
    private List<String> resumen;

    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }

    public List<String> getResumen() { return resumen; }
    public void setResumen(List<String> resumen) { this.resumen = resumen; }
}
