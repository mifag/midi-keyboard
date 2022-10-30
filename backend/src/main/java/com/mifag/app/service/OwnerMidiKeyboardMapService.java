package com.mifag.app.service;

import com.mifag.app.dto.CreateOwnerKeyboardMapDto;
import com.mifag.app.dto.MidiKeyboardDto;
import com.mifag.app.entity.MidiKeyboard;
import com.mifag.app.entity.Owner;
import com.mifag.app.entity.OwnerMidiKeyboardMap;
import com.mifag.app.exception.MidiKeyboardNotFoundException;
import com.mifag.app.exception.OwnerNotFoundException;
import com.mifag.app.repository.MidiKeyboardRepository;
import com.mifag.app.repository.OwnerMidiKeyboardMapRepository;
import com.mifag.app.repository.OwnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class OwnerMidiKeyboardMapService {
    private final MidiKeyboardRepository midiKeyboardRepository;
    private final OwnerRepository ownerRepository;
    private final OwnerMidiKeyboardMapRepository ownerMidiKeyboardMapRepository;

    private static final Logger LOG = LoggerFactory.getLogger(OwnerMidiKeyboardMapService.class);

    public OwnerMidiKeyboardMapService(MidiKeyboardRepository midiKeyboardRepository,
                                       OwnerRepository ownerRepository,
                                       OwnerMidiKeyboardMapRepository ownerMidiKeyboardMapRepository) {
        this.midiKeyboardRepository = midiKeyboardRepository;
        this.ownerRepository = ownerRepository;
        this.ownerMidiKeyboardMapRepository = ownerMidiKeyboardMapRepository;
    }

    public MidiKeyboardDto addMapBetweenOwnerAndKeyboard(CreateOwnerKeyboardMapDto createOwnerKeyboardMapDto)
            throws OwnerNotFoundException, MidiKeyboardNotFoundException {
        Long ownerId = createOwnerKeyboardMapDto.getOwnerId();
        Long midiKeyboardId = createOwnerKeyboardMapDto.getMidiKeyboardId();
        Optional<Owner> ownerById = ownerRepository.findById(ownerId);
        Owner owner;
        if (ownerById.isEmpty()) {
            throw new OwnerNotFoundException(ownerId);
        } else {
            owner = ownerById.get();
        }
        Optional<MidiKeyboard> midiKeyboardById = midiKeyboardRepository.findById(midiKeyboardId);
        if (midiKeyboardById.isEmpty()) {
            throw new MidiKeyboardNotFoundException(midiKeyboardId);
        }
        MidiKeyboard midiKeyboard = midiKeyboardById.get();
        OwnerMidiKeyboardMap ownerMidiKeyboardMap = new OwnerMidiKeyboardMap();
        ownerMidiKeyboardMap.setOwner(owner);
        ownerMidiKeyboardMap.setMidiKeyboard(midiKeyboard);
        ownerMidiKeyboardMapRepository.save(ownerMidiKeyboardMap);
        MidiKeyboardDto midiKeyboardDto = new MidiKeyboardDto(midiKeyboard);
        return midiKeyboardDto;
    }

    public MidiKeyboardDto createOwnerMidiKeyboardMap2(Long ownerId, Long midiKeyboardId)
            throws OwnerNotFoundException, MidiKeyboardNotFoundException {
        Optional<Owner> ownerFoundById = ownerRepository.findById(ownerId);
        if (ownerFoundById.isEmpty()) {
            String regExp = "Owner with id: %s not found";
            String errorMessage = String.format(regExp, ownerId);
            LOG.error(errorMessage);
//            LOG.error("Owner with id:{} not found", ownerId);
            throw new OwnerNotFoundException(ownerId);
        }
        Owner owner = ownerFoundById.get();
        Optional<MidiKeyboard> midiKeyboardFoundById = midiKeyboardRepository.findById(midiKeyboardId);
        if (midiKeyboardFoundById.isEmpty()) {
            LOG.error("MidiKeyboard with id:{} not found", midiKeyboardId);
            throw new MidiKeyboardNotFoundException(midiKeyboardId);
        }
        MidiKeyboard midiKeyboard = midiKeyboardFoundById.get();
        OwnerMidiKeyboardMap ownerMidiKeyboardMap2 = new OwnerMidiKeyboardMap();
        ownerMidiKeyboardMap2.setOwner(owner);
        ownerMidiKeyboardMap2.setMidiKeyboard(midiKeyboard);
        ownerMidiKeyboardMapRepository.save(ownerMidiKeyboardMap2);
        return new MidiKeyboardDto(midiKeyboard);
    }
}
