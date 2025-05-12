package com.upm.resumenes.document.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.upm.resumenes.document.dto.DocumentRequestDTO;
import com.upm.resumenes.document.dto.DocumentResponseDTO;
import com.upm.resumenes.document.model.Document;
import com.upm.resumenes.document.repository.DocumentRepository;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;

    @Override
    public DocumentResponseDTO uploadDocument(MultipartFile file, DocumentRequestDTO request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!user.isWriter()) {
            throw new RuntimeException("Solo los escritores pueden subir documentos");
        }

        try {

            String contentType = file.getContentType();
            if (contentType == null ||
                    (!contentType.startsWith("audio/") && !contentType.equals("application/pdf"))) {
                throw new RuntimeException("Tipo de archivo no permitido. Solo se permiten audios o PDFs.");
            }

            System.out.println("Tipo MIME: " + contentType);

            // Elegimos el resource_type correcto
            String resourceType = contentType.equals("application/pdf") ? "raw" : "auto";

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("resource_type", resourceType));

            String url = uploadResult.get("secure_url").toString();

            Document doc = new Document();
            doc.setTitle(request.getTitle());
            doc.setDescription(request.getDescription());
            doc.setFree(request.isFree());
            doc.setType(request.getType());
            doc.setUrl(url);
            doc.setUploadedBy(user);

            doc = documentRepository.save(doc);
            return mapToDTO(doc);

        } catch (Exception e) {
            throw new RuntimeException("Error al subir archivo a Cloudinary: " + e.getMessage());
        }
    }

    @Override
    public DocumentResponseDTO getDocument(Long id, boolean isPremiumUser) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        if (!doc.isFree() && !isPremiumUser) {
            throw new RuntimeException("Este resumen requiere suscripción.");
        }

        return mapToDTO(doc);
    }

    @Override
    public List<DocumentResponseDTO> listDocuments(boolean isPremiumUser) {
        List<Document> docs = isPremiumUser
                ? documentRepository.findAll()
                : documentRepository.findByIsFreeTrue();

        return docs.stream().map(this::mapToDTO).toList();
    }

    private DocumentResponseDTO mapToDTO(Document doc) {
        return new DocumentResponseDTO(
                doc.getId(),
                doc.getTitle(),
                doc.getDescription(),
                doc.isFree(),
                doc.getType(),
                doc.getUrl(),
                doc.getUploadedBy().getEmail(),
                doc.getCreatedAt());
    }
}
