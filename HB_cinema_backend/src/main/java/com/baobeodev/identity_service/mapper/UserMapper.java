package com.baobeodev.identity_service.mapper;

import com.baobeodev.identity_service.dto.request.UserCreationRequest;
import com.baobeodev.identity_service.dto.request.UserUpdateRequest;
import com.baobeodev.identity_service.dto.response.UserResponse;
import com.baobeodev.identity_service.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);
    @Mapping(target = "roles", ignore = true)
    User updateUser(@MappingTarget User user, UserUpdateRequest request);
    UserResponse toUserResponse(User user);
}