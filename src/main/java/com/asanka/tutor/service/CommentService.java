package com.asanka.tutor.service;

import com.asanka.tutor.domain.Comment;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Comment.
 */
public interface CommentService {

    /**
     * Save a comment.
     *
     * @param comment the entity to save
     * @return the persisted entity
     */
    Comment save(Comment comment);

    /**
     * Get all the comments.
     *
     * @return the list of entities
     */
    List<Comment> findAll();


    /**
     * Get the "id" comment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Comment> findOne(String id);

    /**
     * Delete the "id" comment.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
