package com.Green_Tech.Green_Tech.Service;

import com.Green_Tech.Green_Tech.CustomException.DeviceAlreadyFoundException;
import com.Green_Tech.Green_Tech.CustomException.DeviceNotFoundException;
import com.Green_Tech.Green_Tech.CustomException.UserNotFoundException;
import com.Green_Tech.Green_Tech.Entity.Device;
import com.Green_Tech.Green_Tech.Entity.User;
import com.Green_Tech.Green_Tech.Repository.DeviceRepo;
import com.Green_Tech.Green_Tech.Repository.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class DeviceServiceTest {

    @InjectMocks
    private DeviceService deviceService;

    @Mock
    private DeviceRepo deviceRepo;

    @Mock
    private UserRepo userRepo;

    @Mock
    private ExtractUserService extractUserService;

    @Mock
    private AwsIotProvisioningService awsIotProvisioningService;

    private AutoCloseable closeable;

    private User user;
    private Device device;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");

        device = Device.builder()
                .id(1L)
                .mac("00:11:22:33:44:55")
                .active(false)
                .user(user)
                .zoneName("zoneA")
                .name("device1")
                .location("loc")
                .addedAt(new Date())
                .build();
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    void testGetDevicesByUser() throws UserNotFoundException {
        when(extractUserService.extractUserFromJwt(anyString())).thenReturn(user);
        when(deviceRepo.findByUserAndActive(user, false)).thenReturn(List.of(device));

        List<Device> result = deviceService.getDevicesByUser("Bearer token");
        assertEquals(1, result.size());
        assertEquals(device.getMac(), result.get(0).getMac());
    }

    // @Test
    // void testGetActiveDevicesByUser() throws UserNotFoundException {
    //     device.setActive(true);
    //     when(extractUserService.extractUserFromJwt(anyString())).thenReturn(user);
    //     when(deviceRepo.findByUserAndActive(user, true)).thenReturn(List.of(device));

    //     List<Device> result = deviceService.getActiveDevicesByUser("Bearer token");
    //     assertEquals(1, result.size());
    //     assertTrue(result.get(0).getActive());
    // }

    // @Test
    // void testCreateDevice_Success() throws Exception {
    //     Map<String, String> data = new HashMap<>();
    //     data.put("mac", "00:11:22:33:44:55");
    //     data.put("email", "test@example.com");

    //     AwsIotCredentials credentials = new AwsIotCredentials("cert-pem", "private-key", "endpoint");

    //     when(userRepo.findByEmail("test@example.com")).thenReturn(Optional.of(user));
    //     when(deviceRepo.existsByMac("00:11:22:33:44:55")).thenReturn(false);
    //     when(awsIotProvisioningService.createThing("00:11:22:33:44:55")).thenReturn(credentials);

    //     AwsIotCredentials result = deviceService.createDevice(data);

    //     assertEquals("cert-pem", result.getCertificate());
    //     verify(deviceRepo, times(1)).save(any(Device.class));
    //     verify(awsIotProvisioningService).createThing("00:11:22:33:44:55");
    // }

    @Test
    void testCreateDevice_AlreadyExists() {
        Map<String, String> data = new HashMap<>();
        data.put("mac", "00:11:22:33:44:55");
        data.put("email", "test@example.com");

        when(userRepo.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(deviceRepo.existsByMac("00:11:22:33:44:55")).thenReturn(true);

        assertThrows(DeviceAlreadyFoundException.class, () -> deviceService.createDevice(data));
    }

//    @Test
//    void testUpdateDevice() throws DeviceNotFoundException {
//        Map<String, String> updates = Map.of(
//                "name", "UpdatedDevice",
//                "location", "UpdatedLoc",
//                "zoneName", "ZoneUpdated"
//        );
//
//        when(deviceRepo.findById(1L)).thenReturn(Optional.of(device));
//        when(deviceRepo.save(any(Device.class))).thenReturn(device);
//
//        Device updated = deviceService.updateDevice(1L, updates);
//
//        assertEquals("UpdatedDevice", updated.getName());
//        assertEquals("UpdatedLoc", updated.getLocation());
//        assertEquals("ZoneUpdated", updated.getZoneName());
//    }

    @Test
    void testDeleteDevice() throws DeviceNotFoundException {
        when(deviceRepo.findById(1L)).thenReturn(Optional.of(device));

        boolean deleted = deviceService.deleteDevice(1L);

        assertTrue(deleted);
        verify(deviceRepo).delete(device);
    }

    @Test
    void testActivateDevice() throws DeviceNotFoundException {
        when(deviceRepo.findById(1L)).thenReturn(Optional.of(device));
        when(deviceRepo.save(any(Device.class))).thenAnswer(invocation -> {
            Device updated = invocation.getArgument(0);
            updated.setActive(true);
            return updated;
        });

        // Device activated = deviceService.activateDevice(1L);

        // assertTrue(activated.getActive());
        verify(deviceRepo).save(any(Device.class));
    }

    // @Test
    // void testGetActiveDevicesByZone() throws UserNotFoundException {
    //     device.setZoneName("ZoneA");
    //     device.setActive(true);

    //     when(extractUserService.extractUserFromJwt(anyString())).thenReturn(user);
    //     when(deviceRepo.findByUserAndActive(user, true)).thenReturn(List.of(device));

    //     Map<String, List<DeviceDTO>> result = deviceService.getActiveDevicesByZone("Bearer token");
    //     assertTrue(result.containsKey("ZoneA"));
    //     assertEquals(1, result.get("ZoneA").size());
    // }
}
