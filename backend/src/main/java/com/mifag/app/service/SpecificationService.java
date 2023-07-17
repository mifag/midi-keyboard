package com.mifag.app.service;

import com.mifag.app.dto.SpecificationDto;
import com.mifag.app.entity.Specification;
import com.mifag.app.exception.SpecificationNotFoundException;
import com.mifag.app.repository.SpecificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Specification service.
 */
@Component
public class SpecificationService {

    private final SpecificationRepository specificationRepository;

    @Autowired
    public SpecificationService(SpecificationRepository specificationRepository) {
        this.specificationRepository = specificationRepository;
    }

    public Specification saveSpecification(Specification specification) {
        return specificationRepository.save(specification);
    }

    /**
     * Search by id.
     *
     * @param specId - id.
     * @return found specification.
     * @throws SpecificationNotFoundException if specification with specific id not found.
     */
    public SpecificationDto getSpecificationById(Long specId) throws SpecificationNotFoundException {
        Optional<Specification> optionalSpecification = specificationRepository.findById(specId);
        SpecificationDto specificationDto = new SpecificationDto();
        if (optionalSpecification.isPresent()) {
            Specification specification = optionalSpecification.get();
            return new SpecificationDto(specification);
        }
        throw new SpecificationNotFoundException(specId);
    }

    public SpecificationDto createSpecification(SpecificationDto addSpecification) {
        Specification specification = new Specification(addSpecification);
        Specification createdSpecification = specificationRepository.save(specification);
        return new SpecificationDto(createdSpecification);
    }

    public SpecificationDto updateSpecification(Long specificationId, SpecificationDto updateSpecificationDto)
            throws SpecificationNotFoundException {
        Specification specification = findSpecificationById(specificationId);
        specification.setWeight(updateSpecificationDto.getWeight());
        specification.setLength(updateSpecificationDto.getLength());
        specification.setWidth(updateSpecificationDto.getWidth());
        specification.setVelocity(updateSpecificationDto.getVelocity());
        specification.setTypeOfKey(updateSpecificationDto.getTypeOfKey());
        Specification updatedSpecification = specificationRepository.save(specification);
        return new SpecificationDto(updatedSpecification);
    }

    private Specification findSpecificationById(Long specificationId) throws SpecificationNotFoundException {
        Optional<Specification> specification = specificationRepository.findById(specificationId);
        if (specification.isPresent()) {
            return specification.get();
        }
        throw new SpecificationNotFoundException(specificationId);
    }
}
