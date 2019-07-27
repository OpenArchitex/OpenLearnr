package com.asanka.tutor.web.rest;

import com.asanka.tutor.domain.Authority;
import com.asanka.tutor.domain.CommentReply;
import com.asanka.tutor.domain.User;
import com.asanka.tutor.repository.CustomAuditEventRepository;
import com.asanka.tutor.security.AuthoritiesConstants;
import com.asanka.tutor.security.UserNotLoggedInException;
import com.asanka.tutor.service.CommentService;
import com.asanka.tutor.service.UserService;
import com.asanka.tutor.service.dto.CommentDTO;
import com.asanka.tutor.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.asanka.tutor.domain.Comment}.
 */
@RestController
@RequestMapping("/api")
public class CommentResource {

    private final Logger log = LoggerFactory.getLogger(CommentResource.class);

    private static final String ENTITY_NAME = "comment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommentService commentService;

    private final UserService userService;

    private CustomAuditEventRepository customAuditEventRepository;

    public CommentResource(CommentService commentService, UserService userService, CustomAuditEventRepository customAuditEventRepository) {
        this.commentService = commentService;
        this.userService = userService;
        this.customAuditEventRepository = customAuditEventRepository;
    }

    /**
     * {@code POST  /comments} : Create a new comment.
     *
     * @param commentDTO the commentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commentDTO, or with status {@code 400 (Bad Request)} if the comment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comments")
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CommentDTO commentDTO) throws URISyntaxException {
        log.debug("REST request to save Comment : {}", commentDTO);
        if (commentDTO.getId() != null) {
            throw new BadRequestAlertException("A new comment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Optional<User> currentUser = userService.getUserWithAuthorities();
        if (!currentUser.isPresent()) {
            throw new UserNotLoggedInException("The user seems not to be logged in.");
        }
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        if (currentUser.get().getAuthorities().contains(adminAuthority)) {
            commentDTO.setIsAdminComment(true);
        } else {
            commentDTO.setIsAdminComment(false);
        }
        CommentDTO result = commentService.save(commentDTO);
        return ResponseEntity.created(new URI("/api/comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /comments} : Updates an existing comment.
     *
     * @param commentDTO the commentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commentDTO,
     * or with status {@code 400 (Bad Request)} if the commentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commentDTO couldn't be updated.
     */
    @PutMapping("/comments")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<CommentDTO> updateComment(@Valid @RequestBody CommentDTO commentDTO) {
        log.debug("REST request to update Comment : {}", commentDTO);
        if (commentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "is null");
        }
        Optional<CommentDTO> oldComment = commentService.findOne(commentDTO.getId());
        CommentDTO result = commentService.update(commentDTO);
        Optional<User> currentUser = userService.getUserWithAuthorities();
        if(currentUser.isPresent() && oldComment.isPresent()) {
            AuditEvent event = new AuditEvent(currentUser.get().getLogin(), "COMMENT UPDATED", "message=Comment (before update): " + oldComment.get().toString());
            customAuditEventRepository.add(event);
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, commentDTO.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /comments/addReply} : Add a reply to a comment.
     *
     * @param commentReply the reply for a comment.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commentDTO,
     * or with status {@code 400 (Bad Request)} if the commentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commentDTO couldn't be updated.
     */
    @PostMapping("/comments/addReply")
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<CommentDTO> addReplyToComment(@Valid @RequestBody CommentReply commentReply) {
        log.debug("REST request to add reply to Comment : {}", commentReply);
        if (commentReply.getCommentID() == null) {
            throw new BadRequestAlertException("Invalid comment id " + commentReply.getCommentID(), ENTITY_NAME, "is null");
        }
        Optional<CommentDTO> oldComment = commentService.findOne(commentReply.getCommentID());
        if (!oldComment.isPresent()) {
            throw new BadRequestAlertException("Invalid comment id " + commentReply.getCommentID(), ENTITY_NAME, "is null");
        }
        Optional<User> currentUser = userService.getUserWithAuthorities();
        if (!currentUser.isPresent()) {
            throw new UserNotLoggedInException("The user seems not to be logged in.");
        }
        commentReply.setCreatedBy(currentUser.get().getLogin());
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        if (currentUser.get().getAuthorities().contains(adminAuthority)) {
            commentReply.setIsAdminReply(true);
        } else {
            commentReply.setIsAdminReply(false);
        }
        CommentDTO comment = oldComment.get();
        if (comment.getReplies() != null) {
            comment.getReplies().add(commentReply);
        } else {
            List<CommentReply> commentReplies = new ArrayList<>();
            commentReplies.add(commentReply);
            comment.setReplies(commentReplies);
        }
        CommentDTO result = commentService.update(comment);
        AuditEvent event = new AuditEvent(currentUser.get().getLogin(), "COMMENT ADD REPLY", "message=Comment: " + comment.toString());
        customAuditEventRepository.add(event);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comment.getId()))
            .body(result);
    }

    /**
     * {@code GET  /comments} : get all the comments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comments in body.
     */
    @GetMapping("/comments")
    public List<CommentDTO> getAllComments() {
        log.debug("REST request to get all Comments");
        return commentService.findAll();
    }

    /**
     * {@code GET  /comments/:id} : get the "id" comment.
     *
     * @param id the id of the commentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comments/{id}")
    public ResponseEntity<CommentDTO> getComment(@PathVariable String id) {
        log.debug("REST request to get Comment : {}", id);
        Optional<CommentDTO> commentDTO = commentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commentDTO);
    }

    /**
     * GET  /comments/commentsOfVideo/{videoID} : get comments for the video.
     *
     * @param videoID the id of the video where the comments to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comments, or with status 404 (Not Found)
     */
    @GetMapping("/comments/commentsForVideo/{videoID}")
    public List<CommentDTO> getComments(@PathVariable String videoID) {
        log.debug("REST request to get Comments for Video : {}", videoID);
        return commentService.findComments(videoID);
    }

    /**
     * {@code DELETE  /comments/:id} : delete the "id" comment.
     *
     * @param id the id of the commentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comments/{id}")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        log.debug("REST request to delete Comment : {}", id);
        Optional<CommentDTO> oldComment = commentService.findOne(id);
        commentService.delete(id);
        Optional<User> currentUser = userService.getUserWithAuthorities();
        if (currentUser.isPresent() && oldComment.isPresent()) {
            AuditEvent event = new AuditEvent(currentUser.get().getLogin(), "COMMENT DELETED", "message=Comment: " + oldComment.get().toString());
            customAuditEventRepository.add(event);
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
