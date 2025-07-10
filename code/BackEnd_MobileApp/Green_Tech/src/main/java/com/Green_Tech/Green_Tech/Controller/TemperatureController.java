// TemperatureController.java
package com.Green_Tech.Green_Tech.Controller;

import com.Green_Tech.Green_Tech.DTO.DailyAverageDTO;
import com.Green_Tech.Green_Tech.Repository.TemperatureRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/temperature")
public class TemperatureController {

    private final TemperatureRepository temperatureRepository;

    public TemperatureController(TemperatureRepository temperatureRepository) {
        this.temperatureRepository = temperatureRepository;
    }

    @GetMapping("/daily-averages")
    public List<DailyAverageDTO> getDailyAverages(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return temperatureRepository.findDailyAverages(startDate, endDate);
    }
}