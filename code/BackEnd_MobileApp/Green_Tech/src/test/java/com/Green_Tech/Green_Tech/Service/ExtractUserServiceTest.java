package com.Green_Tech.Green_Tech.Service;

import com.Green_Tech.Green_Tech.Config.JwtService;
import com.Green_Tech.Green_Tech.CustomException.UserNotFoundException;
import com.Green_Tech.Green_Tech.Entity.Admin;
import com.Green_Tech.Green_Tech.Entity.User;
import com.Green_Tech.Green_Tech.Repository.AdminRepo;
import com.Green_Tech.Green_Tech.Repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ExtractUserServiceTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepo userRepo;

    @Mock
    private AdminRepo adminRepo;

    @InjectMocks
    private ExtractUserService extractUserService;

    private final String validToken = "valid.jwt.token";
    private final String validAuthHeader = "Bearer " + validToken;
    private final String userEmail = "user@example.com";
    private final String adminEmail = "admin@example.com";

    @Test
    void testExtractUserFromJwt_Success() throws UserNotFoundException {
        // Arrange
        User mockUser = new User();
        mockUser.setEmail(userEmail);

        when(jwtService.extractUserEmail(validToken)).thenReturn(userEmail);
        when(userRepo.findByEmail(userEmail)).thenReturn(Optional.of(mockUser));

        // Act
        User result = extractUserService.extractUserFromJwt(validAuthHeader);

        // Assert
        assertNotNull(result);
        assertEquals(userEmail, result.getEmail());
        verify(jwtService, times(1)).extractUserEmail(validToken);
        verify(userRepo, times(1)).findByEmail(userEmail);
    }

    @Test
    void testExtractUserFromJwt_UserNotFound() {
        // Arrange
        when(jwtService.extractUserEmail(validToken)).thenReturn(userEmail);
        when(userRepo.findByEmail(userEmail)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> {
            extractUserService.extractUserFromJwt(validAuthHeader);
        });
    }

    @Test
    void testExtractAdminFromJwt_Success() throws UserNotFoundException {
        // Arrange
        Admin mockAdmin = new Admin();
        mockAdmin.setEmail(adminEmail);

        when(jwtService.extractUserEmail(validToken)).thenReturn(adminEmail);
        when(adminRepo.findByEmail(adminEmail)).thenReturn(Optional.of(mockAdmin));

        // Act
        Admin result = extractUserService.extractAdminFromJwt(validAuthHeader);

        // Assert
        assertNotNull(result);
        assertEquals(adminEmail, result.getEmail());
        verify(jwtService, times(1)).extractUserEmail(validToken);
        verify(adminRepo, times(1)).findByEmail(adminEmail);
    }

    @Test
    void testExtractAdminFromJwt_AdminNotFound() {
        // Arrange
        when(jwtService.extractUserEmail(validToken)).thenReturn(adminEmail);
        when(adminRepo.findByEmail(adminEmail)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> {
            extractUserService.extractAdminFromJwt(validAuthHeader);
        });
    }

    @Test
    void testExtractUserFromJwt_InvalidAuthHeader() {
        // Arrange
        String invalidAuthHeader = "InvalidHeader";

        // Act & Assert
        assertThrows(StringIndexOutOfBoundsException.class, () -> {
            extractUserService.extractUserFromJwt(invalidAuthHeader);
        });
    }
}