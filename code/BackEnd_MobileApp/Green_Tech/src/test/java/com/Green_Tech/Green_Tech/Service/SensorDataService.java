package com.Green_Tech.Green_Tech.Service;

import com.Green_Tech.Green_Tech.CustomException.DeviceNotFoundException;
import com.Green_Tech.Green_Tech.Entity.Device;
import com.Green_Tech.Green_Tech.Entity.SensorData;
import com.Green_Tech.Green_Tech.Repository.DeviceRepo;
import com.Green_Tech.Green_Tech.Repository.SensorDataRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SensorDataService {

    private final SensorDataRepository sensorDataRepository;
    private final DeviceRepo deviceRepo;
    private final ObjectMapper objectMapper;

    public SensorDataService(SensorDataRepository sensorDataRepository, 
                           DeviceRepo deviceRepo,
                           ObjectMapper objectMapper) {
        this.sensorDataRepository = sensorDataRepository;
        this.deviceRepo = deviceRepo;
        this.objectMapper = objectMapper;
    }

    public HashMap<String, Object> convertByteArrayToHashMap(byte[] jsonBytes) {
        if (jsonBytes == null || jsonBytes.length == 0) {
            return null;
        }

        try {
            String jsonString = new String(jsonBytes, StandardCharsets.UTF_8);
            return objectMapper.readValue(jsonString, 
                new TypeReference<HashMap<String, Object>>() {});
        } catch (JsonProcessingException e) {
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public void getDataFromAWS(byte[] jsonBytes) throws DeviceNotFoundException {
        HashMap<String, Object> dataMap = convertByteArrayToHashMap(jsonBytes);
        if (dataMap == null || !dataMap.containsKey("mac")) {
            throw new IllegalArgumentException("Invalid sensor data format");
        }

        String macAddress = (String) dataMap.get("mac");
        Device device = deviceRepo.findByMac(macAddress);
        if (device == null) {
            throw new DeviceNotFoundException("Device with MAC " + macAddress + " not found");
        }

        SensorData sensorData = new SensorData();
        sensorData.setDevice(device);
        sensorData.setTemperature((Double) dataMap.get("temperature"));
        sensorData.setHumidity((Double) dataMap.get("humidity"));
        sensorData.setSoilMoisture((Double) dataMap.get("moisture"));
        sensorData.setUpdatedAt(new Date());

        sensorDataRepository.save(sensorData);
    }

    public Map<String, Object> getSensorData(Long deviceId) {
        SensorData sensorData = sensorDataRepository
            .findFirstByDeviceIdOrderByIdDesc(deviceId);
        
        if (sensorData == null) {
            return new HashMap<>();
        }

        Map<String, Object> result = new HashMap<>();
        result.put("temperature", sensorData.getTemperature());
        result.put("humidity", sensorData.getHumidity());
        result.put("moisture", sensorData.getSoilMoisture());
        result.put("nitrogen", sensorData.getNitrogenLevel());
        result.put("phosphorus", sensorData.getPhosphorusLevel());
        result.put("potassium", sensorData.getPotassiumLevel());
        result.put("lastUpdated", sensorData.getUpdatedAt());

        return result;
    }
}