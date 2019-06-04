package com.asanka.tutor.repository;

import com.asanka.tutor.domain.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Comment entity.
 */
@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByVideoID(String videoID);
}
