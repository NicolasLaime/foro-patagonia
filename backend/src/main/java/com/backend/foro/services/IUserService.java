package com.backend.foro.services;

import com.backend.foro.model.UserEntity;
import org.apache.catalina.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    public Optional<UserEntity> findUser(String email);

    List<UserEntity> getAllUsers();

    void deleteUserById(Long id);

    Optional<UserEntity> getUserById(Long id);



}
