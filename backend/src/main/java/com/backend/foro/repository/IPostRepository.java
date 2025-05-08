package com.backend.foro.repository;

import com.backend.foro.model.Post;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post,Long> {

    List<Post> findByCategoryId(Long categoryId);
}
