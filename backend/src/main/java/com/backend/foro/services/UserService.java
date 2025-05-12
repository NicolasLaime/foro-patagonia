package com.backend.foro.services;

import com.backend.foro.model.UserEntity;
import com.backend.foro.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    UserRepository userRepo;

    @Override
    public Optional<UserEntity> findUser(String email) {
        return userRepo.findByEmail(email);
    }
}
