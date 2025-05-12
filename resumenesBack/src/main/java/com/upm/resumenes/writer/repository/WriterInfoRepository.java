package com.upm.resumenes.writer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.resumenes.user.model.User;
import com.upm.resumenes.writer.model.WriterInfo;

public interface WriterInfoRepository extends JpaRepository<WriterInfo, Long> {
    Optional<WriterInfo> findByUser(User user);
}