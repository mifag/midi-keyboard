package com.mifag.app.service.job;

import com.mifag.app.repository.OwnerMidiKeyboardMapRepository;
import com.mifag.app.repository.OwnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;

@Component
public class AverageKeyboardsNumberJob {

    private final OwnerRepository ownerRepository;
    private final OwnerMidiKeyboardMapRepository ownerMidiKeyboardMapRepository;
    private static final Logger LOG = LoggerFactory.getLogger(AverageKeyboardsNumberJob.class);

    public AverageKeyboardsNumberJob(OwnerRepository ownerRepository,
                                     OwnerMidiKeyboardMapRepository ownerMidiKeyboardMapRepository) {
        this.ownerRepository = ownerRepository;
        this.ownerMidiKeyboardMapRepository = ownerMidiKeyboardMapRepository;
    }

    @Scheduled(cron = "0 * * * * ?")
    public void countAverageKeyboardsNumber() {
        LOG.info("countAverageKeyboardsNumber started");
        long ownersCount = ownerRepository.count();
        long midiKeyboardCount = ownerMidiKeyboardMapRepository.count();
        Double countedAverage = (double) midiKeyboardCount / ownersCount;
        String formattedAverage = new DecimalFormat("#0.00").format(countedAverage);
        LOG.info("average:{}", formattedAverage);
    }
}

