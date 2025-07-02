package com.backend.foro.mapper;

import com.backend.foro.dtos.UserResponseDto;
import com.backend.foro.dtos.UserResponseDto;
import com.backend.foro.model.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "role.roleName", target = "role")
    UserResponseDto toDto(UserEntity user);


}
