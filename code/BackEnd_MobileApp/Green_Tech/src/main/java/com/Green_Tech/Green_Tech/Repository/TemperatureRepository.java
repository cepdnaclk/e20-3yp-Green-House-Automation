// TemperatureRepository.java
package com.Green_Tech.Green_Tech.Repository;

import com.Green_Tech.Green_Tech.DTO.DailyAverageDTO;
import com.Green_Tech.Green_Tech.Entity.TemperatureData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TemperatureRepository extends JpaRepository<TemperatureData, Long> {
    
    @Query("SELECT new com.Green_Tech.Green_Tech.DTO.DailyAverageDTO(" +
           "t.date, AVG(t.value), '°C') " +  // Hardcoded unit as °C
           "FROM TemperatureData t " +
           "WHERE t.date BETWEEN :startDate AND :endDate " +
           "GROUP BY t.date " +
           "ORDER BY t.date")
    List<DailyAverageDTO> findDailyAverages(LocalDate startDate, LocalDate endDate);
}