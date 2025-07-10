// DailyAverageDTO.java
package com.Green_Tech.Green_Tech.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DailyAverageDTO {
    private LocalDate date;
    private Double averageTemp;
    private String unit;

    public DailyAverageDTO(LocalDate date, Double averageTemp, String unit) {
        this.date = date;
        this.averageTemp = averageTemp;
        this.unit = unit;
    }
}