package com.mifag.app.controller;

import java.nio.charset.StandardCharsets;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mifag.app.dto.SpecificationDto;
import com.mifag.app.entity.KeyboardImage;
import com.mifag.app.entity.KeyboardImageBlob;
import com.mifag.app.exception.SpecificationNotFoundException;
import com.mifag.app.repository.KeyboardImageBlobRepository;
import com.mifag.app.repository.KeyboardImageRepository;
import com.mifag.app.service.SpecificationService;

/**
 * @author <a href='mailto:mifag92@rambler.ru'>mifag</a>
 * @version 03.09.2020
 */

@RestController

@RequestMapping("/api/specification")
public class SpecificationController {

    private static final Logger LOG = LoggerFactory.getLogger(OwnerController.class);

    private final SpecificationService specificationService;

    @Autowired
    private KeyboardImageRepository keyboardImageRepository;

    @Autowired
    private KeyboardImageBlobRepository keyboardImageBlobRepository;

    /**
     * Constructor.
     *
     * @param specificationService - specification service.
     */
    @Autowired
    public SpecificationController(SpecificationService specificationService) {
        this.specificationService = specificationService;
    }

    @GetMapping(path = "/testAssBlob")
    public ResponseEntity<String> createImageBlob() {
        KeyboardImageBlob keyboardImageBlob = new KeyboardImageBlob();
        keyboardImageBlob.setImage("assBlob".getBytes(StandardCharsets.UTF_8));
        keyboardImageBlob = keyboardImageBlobRepository.save(keyboardImageBlob);
        return ResponseEntity.ok(new String(keyboardImageBlob.getImage()));
    }

    @GetMapping(path = "/testBlob")
    public ResponseEntity<String> getImageBlob() {
        Iterable<KeyboardImageBlob> keyboardImages = keyboardImageBlobRepository.findAll();
        for (KeyboardImageBlob keyboardImage : keyboardImages) {
            return ResponseEntity.ok(new String(keyboardImage.getImage()));
        }
        return ResponseEntity.ok("pissBlob");
    }

    @GetMapping(path = "/testAss")
    public ResponseEntity<String> createImage() {
        KeyboardImage keyboardImage = new KeyboardImage();
        keyboardImage.setImage("ass".getBytes(StandardCharsets.UTF_8));
        keyboardImage = keyboardImageRepository.save(keyboardImage);
        return ResponseEntity.ok(new String(keyboardImage.getImage()));
    }

    @GetMapping(path = "/test")
    public ResponseEntity<String> getImage() {
        Iterable<KeyboardImage> keyboardImages = keyboardImageRepository.findAll();
        for (KeyboardImage keyboardImage : keyboardImages) {
            return ResponseEntity.ok(new String(keyboardImage.getImage()));
        }
        return ResponseEntity.ok("piss");
    }

    /**
     * Get Specification by id.
     *
     * @param specId - specification id.
     * @return specification dto.
     * @throws SpecificationNotFoundException if specification not found.
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/{specId}")
    public ResponseEntity<SpecificationDto> getSpecificationById(@PathVariable(value = "specId") Long specId)
            throws SpecificationNotFoundException {
        LOG.info("SpecificationController. GetSpecificationById. Finding specification with Id: {}.", specId);
        SpecificationDto specificationDto = specificationService.getSpecificationById(specId);
        LOG.info("Specification with id: {} successfully found.", specId);
        return ResponseEntity.ok(specificationDto);
    }



    /**
     * Update Specification by id.
     *
     * @param specificationId - specification id.
     * @return specification dto.
     * @throws SpecificationNotFoundException if specification not found.
     */
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/{specificationId}")
    public ResponseEntity<SpecificationDto> updateSpecification(
            @PathVariable(value = "specificationId") Long specificationId,
            @RequestBody @Valid SpecificationDto updateSpecification) throws SpecificationNotFoundException {
        LOG.info("SpecificationController. UpdateSpecificationById. Updating specification with Id: {}.",
                specificationId);
        SpecificationDto updatedSpecification = specificationService.updateSpecification(specificationId,
                updateSpecification);
        LOG.info("Specification with id: {} successfully updated.", specificationId);
        return ResponseEntity.ok(updatedSpecification);
    }
//    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<SpecificationDto> createSpecification( SpecificationDto newSpecificationDto) {
//
//    }
}
