package com.asanka.tutor.service.impl;

import com.asanka.tutor.service.CommentService;
import com.asanka.tutor.domain.Comment;
import com.asanka.tutor.repository.CommentRepository;
import com.asanka.tutor.service.dto.CommentDTO;
import com.asanka.tutor.service.mapper.CommentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Comment}.
 */
@Service
public class CommentServiceImpl implements CommentService {

    private final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepository;

    private final CommentMapper commentMapper;

    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    /**
     * Save a comment.
     *
     * @param commentDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CommentDTO save(CommentDTO commentDTO) {
        log.debug("Request to save Comment : {}", commentDTO);
        Comment comment = commentMapper.toEntity(commentDTO);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    /**
     * Get all the comments.
     *
     * @return the list of entities.
     */
    @Override
    public List<CommentDTO> findAll() {
        log.debug("Request to get all Comments");
        return commentRepository.findAll().stream()
            .map(commentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one comment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<CommentDTO> findOne(String id) {
        log.debug("Request to get Comment : {}", id);
        return commentRepository.findById(id)
            .map(commentMapper::toDto);
    }

    /**
     * Delete the comment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Comment : {}", id);
        commentRepository.deleteById(id);
    }
}
