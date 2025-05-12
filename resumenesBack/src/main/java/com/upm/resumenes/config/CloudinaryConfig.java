package com.upm.resumenes.config;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dnps4zhgp",
                "api_key", "556727727382168",
                "api_secret", "C1HgUBR0vQXFrHmah7cLdQnuH_U",
                "secure", true
        ));
    }
}

