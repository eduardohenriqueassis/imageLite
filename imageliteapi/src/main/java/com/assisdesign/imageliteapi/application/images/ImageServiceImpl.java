package com.assisdesign.imageliteapi.application.images;

import com.assisdesign.imageliteapi.domain.entity.Image;
import com.assisdesign.imageliteapi.domain.enums.ImageExtension;
import com.assisdesign.imageliteapi.domain.service.ImageService;
import com.assisdesign.imageliteapi.infra.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository repository;
    @Override
    @Transactional
    public Image save(Image image) {
        return repository.save(image);
    }

    @Override
    public Image deleteImage(String id) {
        Image image = repository.findById(id).orElseThrow();
        repository.delete(image);
        return image;
    }

    @Override
    public Optional<Image> getById(String id) {
        return repository.findById(id);
    }

    @Override
    public List<Image> search(ImageExtension extension, String query) {
        return repository.findByExtensionAndNameOrTagsLike(extension, query);
    }
}
