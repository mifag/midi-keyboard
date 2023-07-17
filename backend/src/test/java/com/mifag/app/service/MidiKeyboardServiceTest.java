package com.mifag.app.service;

import com.mifag.app.dto.MidiKeyboardDto;
import com.mifag.app.entity.MidiKeyboard;
import com.mifag.app.entity.OwnerMidiKeyboardMap;
import com.mifag.app.exception.MidiKeyboardNotFoundException;
import com.mifag.app.repository.MidiKeyboardRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class MidiKeyboardServiceTest {

    @Mock
    private MidiKeyboardRepository midiKeyboardRepository;

    @InjectMocks
    private MidiKeyboardService midiKeyboardService;

    @Test
    public void testGetMidiById() throws MidiKeyboardNotFoundException {
        //Arrange
        Long midiId = 3L;

        MidiKeyboard foundMidiKeyboard = new MidiKeyboard();
        List<OwnerMidiKeyboardMap> ownerMidiKeyboardMaps = new ArrayList<>();
        foundMidiKeyboard.setId(2L);
        foundMidiKeyboard.setManufacturer("Arturia");
        foundMidiKeyboard.setModel("Keylab3");
        foundMidiKeyboard.setKeysNumber(61);
        foundMidiKeyboard.setHasMidiOut(true);
        foundMidiKeyboard.setPrice(20900L);
        foundMidiKeyboard.setOwnerMidiKeyboardMaps(ownerMidiKeyboardMaps);
        Optional<MidiKeyboard> optionalFoundMidiKeyboard = Optional.of(foundMidiKeyboard);

        doReturn(optionalFoundMidiKeyboard).when(midiKeyboardRepository).findById(midiId);

        //Act
        MidiKeyboardDto actual = midiKeyboardService.getMidiById(midiId);

        //Assert
        assertNotNull(actual);
        assertEquals(2L, actual.getId());
        assertEquals("Arturia", actual.getManufacturer());
        assertEquals("Keylab3", actual.getModel());
        assertEquals(61, actual.getKeysNumber());
        assertEquals(true, actual.getHasMidiOut());
        assertEquals(20900L, actual.getPrice());
    }
}
