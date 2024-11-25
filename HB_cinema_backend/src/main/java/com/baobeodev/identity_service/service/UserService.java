package com.baobeodev.identity_service.service;

import com.baobeodev.identity_service.dto.request.UserCreationRequest;
import com.baobeodev.identity_service.dto.request.UserUpdateRequest;
import com.baobeodev.identity_service.dto.response.UserResponse;
import com.baobeodev.identity_service.entity.User;
import com.baobeodev.identity_service.exception.AppException;
import com.baobeodev.identity_service.exception.ErrorCode;
import com.baobeodev.identity_service.mapper.UserMapper;
import com.baobeodev.identity_service.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.baobeodev.identity_service.repository.UserRepository;
import org.springframework.web.servlet.View;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
//taoj cóntructor final
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@Slf4j
//tạo biến final
public class UserService {
     UserRepository userRepository;
     UserMapper userMapper;
     View error;
     PasswordEncoder passwordEncoder;
     RoleRepository roleRepository;

//     userCreationRequest is DTO (Data Transfer Object )(đối tượng truyền dữ liẹue)
    public UserResponse createUser(UserCreationRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
       User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        HashSet<String> roles = new HashSet<>();
        user= userRepository.save(user);
        return userMapper.toUserResponse(user);
    }
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName(); // Lấy tên người dùng hiện tại

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        log.info("Fetching user info for: {}", name); // Nếu không tìm thấy user
        return userMapper.toUserResponse(user);
    }
    public UserResponse updateUser(String userId, UserUpdateRequest request){
        User user =userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
         userMapper.updateUser(user,request);
        // Kiểm tra và cập nhật mật khẩu (nếu được cung cấp)
//        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
//            user.setPassword(passwordEncoder.encode(request.getPassword()));
//        }
         var roles = roleRepository.findAllById(request.getRoles());
    user.setRoles(new HashSet<>(roles));
        return userMapper.toUserResponse(userRepository.save(user));
    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
    //hasAuthority chỉ định đúng role hay pẻmi
//    @PreAuthorize("hasAuthority('')")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUser(String id){
        log.info("In method get User by Id");
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(()->new RuntimeException()));
    }
    // Đổi mật khẩu cho admin mà không cần mật khẩu cũ
    // cái này ít nên k dùng mapper
    public void changePasswordAsAdmin(String userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Cập nhật mật khẩu mới
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}

