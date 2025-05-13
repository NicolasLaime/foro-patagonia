package com.backend.foro.repository;

import com.backend.foro.model.Post;
import com.backend.foro.model.UserEntity;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IPostRepository extends JpaRepository<Post,Long> {

    List<Post> findByCategoryId(Long categoryId);

    List<Post> findByUser(UserEntity user);


}
