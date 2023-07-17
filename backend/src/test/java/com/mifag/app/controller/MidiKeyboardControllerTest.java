package com.mifag.app.controller;

import com.mifag.app.dto.MidiKeyboardDto;
import com.mifag.app.service.MidiKeyboardService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class MidiKeyboardControllerTest {

    @Mock
    private MidiKeyboardService midiService;

    @InjectMocks
    private MidiKeyboardController midiKeyboardController;

    @Test
    public void testCreateMidiKeyboardSuccess() {
        //Arrange
        MidiKeyboardDto midiKeyboardDto = new MidiKeyboardDto();
        midiKeyboardDto.setManufacturer("Yamaha");
        midiKeyboardDto.setModel("Px-35");
        midiKeyboardDto.setKeysNumber(88);
        midiKeyboardDto.setHasMidiOut(true);
        midiKeyboardDto.setPrice(12350L);

        MidiKeyboardDto createdMidiKeyboardDto = new MidiKeyboardDto();
        createdMidiKeyboardDto.setManufacturer("Korg");
        createdMidiKeyboardDto.setModel("Ct-4");
        createdMidiKeyboardDto.setKeysNumber(61);
        createdMidiKeyboardDto.setHasMidiOut(false);
        createdMidiKeyboardDto.setPrice(14500L);
        createdMidiKeyboardDto.setId(1L);

        doReturn(createdMidiKeyboardDto).when(midiService).createMidi(midiKeyboardDto);

        //Act
        ResponseEntity<MidiKeyboardDto> actual = midiKeyboardController.createMidiKeyboard(midiKeyboardDto);

        //Assert
        assertNotNull(actual.getBody());
        assertEquals(HttpStatus.OK, actual.getStatusCode());
        assertEquals("Korg",actual.getBody().getManufacturer());
        assertEquals("Ct-4",actual.getBody().getModel());
        assertEquals(61,actual.getBody().getKeysNumber());
        assertEquals(false,actual.getBody().getHasMidiOut());
        assertEquals(14500L, actual.getBody().getPrice());
        assertEquals(1L, actual.getBody().getId());
    }
}
