package com.baobeodev.identity_service.controller;


import com.baobeodev.identity_service.dto.request.ApiResponse;
import com.baobeodev.identity_service.dto.request.PasswordChangeRequest;
import com.baobeodev.identity_service.dto.request.UserCreationRequest;
import com.baobeodev.identity_service.dto.request.UserUpdateRequest;
import com.baobeodev.identity_service.dto.response.UserResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.baobeodev.identity_service.service.UserService;

import java.util.List;

// Lớp này chịu trách nhiệm nhận các yêu cầu HTTP từ client và chuyển chúng đến lớp service để xử lý.
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
     UserService userService;
    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }
    @GetMapping
    ApiResponse<List<UserResponse>> getUser(){
        var authetication= SecurityContextHolder.getContext().getAuthentication();//Lấy thông tin người dùng hiện tại đang xác thực trong hệ thống.
        log.info("Username: {}", authetication.getName());//Lấy tên người dùng từ thông tin xác thực.
        authetication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));// Lấy danh sách các quyền (authorities) mà người dùng có.

        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUsers())
                .build();
}
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId) {
        UserResponse userResponse = userService.getUser(userId);
        // Trả về ApiResponse chứa dữ liệu của người dùng
        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .message("GetUser successfully")
                .build();
    }
    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo() {
        UserResponse userResponse = userService.getMyInfo(); // Lấy thông tin user hiện tại1
        return ApiResponse.<UserResponse>builder()
                .result(userResponse) // Đính kèm kết quả vào ApiResponse
                .build();
    }
    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable  @Valid String userId, @RequestBody  @Valid UserUpdateRequest request){
        UserResponse userResponse = userService.updateUser(userId,request);
        // Trả về ApiResponse chứa dữ liệu của người dùng
        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .message("Update successfully")
                .build();
    }
@DeleteMapping("/{userId}")
String deleteUser(@PathVariable String userId){
         userService.deleteUser(userId);
        return  "User has been deleted" ;
}

    @PutMapping("/{userId}/change-password")
    public ApiResponse<String> changePassword(
            @PathVariable @Valid String userId,
            @RequestBody @Valid PasswordChangeRequest passwordChangeRequest) {
        try {
            userService.changePasswordForUser(userId, passwordChangeRequest);
            return ApiResponse.<String>builder()
                    .result("Password changed successfully")
                    .build();
        } catch (RuntimeException ex) {
            return ApiResponse.<String>builder()
                    .message(ex.getMessage())
                    .build();
        }
    }

}
