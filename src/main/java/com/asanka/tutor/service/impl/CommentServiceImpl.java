package com.asanka.tutor.service.impl;

import com.asanka.tutor.domain.User;
import com.asanka.tutor.security.UserNotLoggedInException;
import com.asanka.tutor.service.CommentService;
import com.asanka.tutor.domain.Comment;
import com.asanka.tutor.repository.CommentRepository;
import com.asanka.tutor.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Comment.
 */
@Service
public class CommentServiceImpl implements CommentService {

    private final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepository;

    private final UserService userService;

    public CommentServiceImpl(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    /**
     * Save a comment.
     *
     * @param comment the entity to save
     * @return the persisted entity
     */
    @Override
    public Comment save(Comment comment) {
        log.debug("Request to save Comment : {}", comment);
        Optional<User> user = userService.getUserWithAuthorities();
        if (!user.isPresent()) {
            throw new UserNotLoggedInException("User is currently not logged in");
        }
        comment.setCreatedBy(user.get().getLogin());
        return commentRepository.save(comment);
    }

    /**
     * Get all the comments.
     *
     * @return the list of entities
     */
    @Override
    public List<Comment> findAll() {
        log.debug("Request to get all Comments");
        return commentRepository.findAll();
    }


    /**
     * Get one comment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Comment> findOne(String id) {
        log.debug("Request to get Comment : {}", id);
        return commentRepository.findById(id);
    }

    /**
     * Get comments for video by videoID.
     *
     * @param videoID the videoID of the entity
     * @return the comments for the video
     */
    @Override
    public List<Comment> findComments(String videoID) {
        log.debug("Request to get comments for Video : {}", videoID);
        return commentRepository.findAllByVideoID(videoID);
    }

    /**
     * Delete the comment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Comment : {}", id);
        commentRepository.deleteById(id);
    }
}
