package com.assisdesign.imageliteapi.application.images;

import com.assisdesign.imageliteapi.domain.entity.Image;
import com.assisdesign.imageliteapi.domain.enums.ImageExtension;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Component
public class ImageMapper {
    public Image mapToImage(MultipartFile file, String name, List<String> tags, String userEmail) throws IOException {
        return Image.builder()
                .name(name)
                .tags(String.join(",", tags))
                .userEmail(userEmail)
                .size(file.getSize())
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
                .file(file.getBytes())
                .build();
    }

    public ImageDTO imageToDTO(Image image, String url){
        return ImageDTO.builder()
                .id(image.getId())
                .url(url)
                .extension(image.getExtension().name())
                .name(image.getName())
                .userEmail(image.getUserEmail())
                .size(image.getSize())
                .uploadDate(image.getUploadDate().toLocalDate())
                .build();
    }
}
