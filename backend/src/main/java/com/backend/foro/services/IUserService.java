package com.backend.foro.services;

import com.backend.foro.model.UserEntity;
import org.apache.catalina.User;

import java.util.Optional;

public interface IUserService {

    public Optional<UserEntity> findUser(String email);
}
