package com.upm.resumenes.ia.service;

import com.cloudinary.Cloudinary;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.document.repository.DocumentRepository;
import com.upm.resumenes.ia.dto.IaResponseDTO;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IaService {



    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String HUGGINGFACE_URL = "https://router.huggingface.co/hyperbolic/v1/chat/completions";

    @Value("${hf.secret.key}")
    private static String HF_TOKEN;

    private static final String MODEL = "deepseek-ai/DeepSeek-V3-0324";

    public IaResponseDTO analizarDocumento(Long documentId, UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        try {
            String texto = extraerTextoDesdePDF(doc.getUrl());
            String prompt = construirPromptResumen(texto);
            String respuestaJson = llamarIaConPrompt(prompt);
            return parsearRespuesta(respuestaJson);

        } catch (Exception e) {
            throw new RuntimeException("Error al analizar el documento: " + e.getMessage());
        }
    }

    private String extraerTextoDesdePDF(String urlPdf) throws IOException {
        URL pdfUrl = new URL(urlPdf);
        try (InputStream inputStream = pdfUrl.openStream(); PDDocument pdf = PDDocument.load(inputStream)) {
            return new PDFTextStripper().getText(pdf);
        }
    }

    private String construirPromptResumen(String texto) {
        return ("""
You are an expert AI assistant specialized in analyzing PDF documents and extracting structured information.
Respond exclusively in Spanish, using clear and formal language.

Your task is to carefully read the provided TEXT and return a strict JSON object containing:
- A summary of the content in exactly **3 concise and informative sentences**.
- A list of exactly **10 keywords** that are relevant and representative of the content.

Follow these instructions precisely:

1. Think about the content as a whole. Do **not** simply extract sentences from the original text — **rephrase** and **compress** the information.
2. The summary must be 3 **independent**, **clear**, and **non-redundant** sentences that together capture the essence of the document.
3. The keywords must be:
   - Written as lowercase strings.
   - Concepts, themes, or important nouns (no stopwords, no verbs).
   - All **different** (no duplicates or synonyms).
   - Sorted by **relevance** (most important first).
4. Your response must be a **valid JSON object** with this exact structure:
   - Use **double quotes**.
   - Use plain ASCII (avoid smart quotes or special characters).
   - Do not include any explanation or commentary.

### Example:

{
  \"resumen\": [
    \"This document explores the role of artificial intelligence in modern education systems.\",
    \"It highlights use cases like personalized learning and automated assessment.\",
    \"It also addresses ethical concerns related to data usage and algorithmic bias.\"
  ],
  \"keywords\": [
    \"artificial intelligence\",
    \"education\",
    \"personalization\",
    \"automation\",
    \"learning\",
    \"assessment\",
    \"technology\",
    \"data\",
    \"bias\",
    \"ethics\"
  ]
}

Now, carefully read the following TEXT and respond ONLY with the structured JSON in the same format as shown above:

TEXT:
""") + texto;
    }

    private String llamarIaConPrompt(String prompt) throws IOException {
        URL url = new URL(HUGGINGFACE_URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Authorization", "Bearer " + HF_TOKEN);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String safePrompt = prompt
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "")
                .replace("\t", "    ");

        String jsonInput = String.format("""
            {
              \"messages\": [
                {
                  \"role\": \"user\",
                  \"content\": \"%s\"
                }
              ],
              \"model\": \"%s\",
              \"stream\": false
            }
            """, safePrompt, MODEL);

        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonInput.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining());
        }
    }

    private IaResponseDTO parsearRespuesta(String json) throws IOException {
        String content = objectMapper.readTree(json)
                .path("choices").get(0)
                .path("message").path("content").asText();

        if (content.startsWith("```json")) {
            content = content.replaceFirst("(?s)```json\\s*", "");
            content = content.replaceFirst("(?s)\\s*```$", "");
        }

        return objectMapper.readValue(content.trim(), IaResponseDTO.class);
    }
}
