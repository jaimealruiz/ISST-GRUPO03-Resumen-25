package com.upm.resumenes.document.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.upm.resumenes.document.dto.DocumentRequestDTO;
import com.upm.resumenes.document.dto.DocumentResponseDTO;
import com.upm.resumenes.document.model.DocumentType;
import com.upm.resumenes.document.service.DocumentService;
import com.upm.resumenes.user.model.User;
import com.upm.resumenes.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity<DocumentResponseDTO> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("isFree") boolean isFree,
            @RequestParam("type") DocumentType type,
            @AuthenticationPrincipal UserDetails userDetails) {

        Long userId = getUserId(userDetails);
        DocumentRequestDTO request = new DocumentRequestDTO(title, description, isFree, type);
        return ResponseEntity.ok(documentService.uploadDocument(file, request, userId));
    }

    
    @GetMapping
    public ResponseEntity<List<DocumentResponseDTO>> listDocuments(
            @AuthenticationPrincipal UserDetails userDetails) {
    
        boolean isPremium = isUserPremium(userDetails); // si no hay token => false
        return ResponseEntity.ok(documentService.listDocuments(isPremium));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponseDTO> getDocument(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
    
        boolean isPremium = isUserPremium(userDetails);
        return ResponseEntity.ok(documentService.getDocument(id, isPremium));
    }
    



    // Métodos auxiliares
    private Long getUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .map(User::getId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    private boolean isUserPremium(UserDetails userDetails) {
        if (userDetails == null) return false;
    
        return userRepository.findByEmail(userDetails.getUsername())
                .map(user -> user.getSubscription() != null &&
                             user.getSubscription().getEndDate() != null &&
                             user.getSubscription().getEndDate().isAfter(LocalDate.now()))
                .orElse(false);
    }
    
    
}
