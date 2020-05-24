package com.asanka.tutor.web.rest;

import com.asanka.tutor.OpenLearnrApp;
import com.asanka.tutor.domain.Comment;
import com.asanka.tutor.domain.CommentReply;
import com.asanka.tutor.repository.CommentRepository;
import com.asanka.tutor.repository.CustomAuditEventRepository;
import com.asanka.tutor.service.CommentService;
import com.asanka.tutor.service.UserService;
import com.asanka.tutor.service.dto.CommentDTO;
import com.asanka.tutor.service.dto.UserDTO;
import com.asanka.tutor.service.mapper.CommentMapper;
import com.asanka.tutor.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.validation.Validator;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CommentResource} REST controller.
 */
@AutoConfigureMockMvc
@SpringBootTest(classes = OpenLearnrApp.class)
public class CommentResourceIT {

    private static final String DEFAULT_VIDEO_ID = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_ID = "BBBBBBBBBB";

    private static final String DEFAULT_VIDEO_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_NAME = "BBBBBBBBBB";


    private static final String DEFAULT_COMMENT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT_BODY = "BBBBBBBBBB";

    private static final Integer DEFAULT_LIKES_COUNT = 1;
    private static final Integer UPDATED_LIKES_COUNT = 2;

    private static final Integer DEFAULT_DISLIKES_COUNT = 1;
    private static final Integer UPDATED_DISLIKES_COUNT = 2;

    private static final Boolean DEFAULT_IS_APPROVED = false;
    private static final Boolean UPDATED_IS_APPROVED = true;

    private static final Boolean DEFAULT_IS_ADMINCOMMENT = false;
    private static final Boolean UPDATED_IS_ADMINCOMMENT = true;

    private static final String DEFAULT_REPLY_BODY = "CCCCCCCCCC";
    private static final String UPDATED_REPLY_BODY = "DDDDDDDDDD";

    private static final boolean DEFAULT_IS_ADMIN_REPLY = false;
    private static final boolean UPDATED_IS_ADMIN_REPLY = true;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private MockMvc restCommentMockMvc;

    private Comment comment;

    private CommentReply commentReply;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comment createEntity() {
        return new Comment()
            .videoID(DEFAULT_VIDEO_ID)
            .videoName(DEFAULT_VIDEO_NAME)
            .commentBody(DEFAULT_COMMENT_BODY)
            .likesCount(DEFAULT_LIKES_COUNT)
            .dislikesCount(DEFAULT_DISLIKES_COUNT)
            .isApproved(DEFAULT_IS_APPROVED)
            .isAdminComment(DEFAULT_IS_ADMINCOMMENT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comment createUpdatedEntity() {
        return new Comment()
            .videoID(UPDATED_VIDEO_ID)
            .videoName(UPDATED_VIDEO_NAME)
            .commentBody(UPDATED_COMMENT_BODY)
            .likesCount(UPDATED_LIKES_COUNT)
            .dislikesCount(UPDATED_DISLIKES_COUNT)
            .isApproved(UPDATED_IS_APPROVED)
            .isAdminComment(UPDATED_IS_ADMINCOMMENT);
    }

    /**
     * Create a CommentReply object for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentReply createCommentReplyEntity() {
        return new CommentReply()
            .replyBody(DEFAULT_REPLY_BODY)
            .isAdminReply(DEFAULT_IS_ADMIN_REPLY)
            .isApproved(DEFAULT_IS_APPROVED);
    }

    /**
     * Create an updated CommentReply object for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentReply createCommentUpdatedEntity() {
        return new CommentReply()
            .replyBody(UPDATED_REPLY_BODY)
            .isAdminReply(UPDATED_IS_ADMIN_REPLY)
            .isApproved(UPDATED_IS_APPROVED);
    }

    @BeforeEach
    public void initTest() {
        commentRepository.deleteAll();
        comment = createEntity();
        commentReply = createCommentReplyEntity();
    }

    @Test
    @WithMockUser("create-comment")
    public void createComment() throws Exception {
        int databaseSizeBeforeCreate = commentRepository.findAll().size();
        UserDTO user = new UserDTO();
        user.setLogin("create-comment");
        user.setEmail("create-comment@example.com");

        userService.createUser(user);

        // Create the Comment
        CommentDTO commentDTO = commentMapper.toDto(comment);
        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isCreated());

        // Validate the Comment in the database
        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeCreate + 1);
        Comment testComment = commentList.get(commentList.size() - 1);
        assertThat(testComment.getVideoID()).isEqualTo(DEFAULT_VIDEO_ID);
        assertThat(testComment.getCommentBody()).isEqualTo(DEFAULT_COMMENT_BODY);
        assertThat(testComment.getLikesCount()).isEqualTo(DEFAULT_LIKES_COUNT);
        assertThat(testComment.getDislikesCount()).isEqualTo(DEFAULT_DISLIKES_COUNT);
        assertThat(testComment.isIsApproved()).isEqualTo(DEFAULT_IS_APPROVED);
        assertThat(testComment.getIsAdminComment()).isEqualTo(DEFAULT_IS_ADMINCOMMENT);
    }

    @Test
    @WithMockUser("add-reply-to-comment")
    public void addReplyToComment() throws Exception {
        UserDTO user = new UserDTO();
        user.setLogin("add-reply-to-comment");
        user.setEmail("add-reply-to-comment@example.com");

        userService.createUser(user);

        // Add a comment
        CommentDTO commentDTO = commentMapper.toDto(comment);
        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isCreated());

        List<Comment> commentList = commentRepository.findAll();
        Comment testComment = commentList.get(0);
        commentReply.commentID(testComment.getId());

        // Add a reply to Comment
        restCommentMockMvc.perform(post("/api/comments/addReply")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentReply)))
            .andExpect(status().isOk());

        // Validate the Comment in the database
        List<Comment> updatedCommentList = commentRepository.findAll();
        Comment updatedTestComment = updatedCommentList.get(0);
        CommentReply testReply = updatedTestComment.getReplies().get(0);
        assertThat(testReply.getReplyBody()).isEqualTo(DEFAULT_REPLY_BODY);
        assertThat(testReply.getIsAdminReply()).isEqualTo(DEFAULT_IS_ADMIN_REPLY);
        assertThat(testReply.getCreatedBy()).isEqualTo("add-reply-to-comment");
        assertThat(testReply.isApproved()).isEqualTo(DEFAULT_IS_APPROVED);
    }

    @Test
    public void createCommentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commentRepository.findAll().size();

        // Create the Comment with an existing ID
        comment.setId("existing_id");
        CommentDTO commentDTO = commentMapper.toDto(comment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comment in the database
        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkVideoIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentRepository.findAll().size();
        // set the field null
        comment.setVideoID(null);

        // Create the Comment, which fails.
        CommentDTO commentDTO = commentMapper.toDto(comment);

        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isBadRequest());

        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkVideoNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentRepository.findAll().size();
        // set the field null
        comment.setVideoName(null);

        // Create the Comment, which fails.
        CommentDTO commentDTO = commentMapper.toDto(comment);

        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isBadRequest());

        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCommentBodyIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentRepository.findAll().size();
        // set the field null
        comment.setCommentBody(null);

        // Create the Comment, which fails.
        CommentDTO commentDTO = commentMapper.toDto(comment);

        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isBadRequest());

        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIsApprovedIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentRepository.findAll().size();
        // set the field null
        comment.setIsApproved(null);

        // Create the Comment, which fails.
        CommentDTO commentDTO = commentMapper.toDto(comment);

        restCommentMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isBadRequest());

        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllComments() throws Exception {
        // Initialize the database
        commentRepository.save(comment);

        // Get all the commentList
        restCommentMockMvc.perform(get("/api/comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comment.getId())))
            .andExpect(jsonPath("$.[*].videoID").value(hasItem(DEFAULT_VIDEO_ID)))
            .andExpect(jsonPath("$.[*].commentBody").value(hasItem(DEFAULT_COMMENT_BODY)))
            .andExpect(jsonPath("$.[*].likesCount").value(hasItem(DEFAULT_LIKES_COUNT)))
            .andExpect(jsonPath("$.[*].dislikesCount").value(hasItem(DEFAULT_DISLIKES_COUNT)))
            .andExpect(jsonPath("$.[*].isApproved").value(hasItem(DEFAULT_IS_APPROVED)))
            .andExpect(jsonPath("$.[*].isAdminComment").value(hasItem(DEFAULT_IS_ADMINCOMMENT)));
    }

    @Test
    public void getComment() throws Exception {
        // Initialize the database
        commentRepository.save(comment);

        // Get the comment
        restCommentMockMvc.perform(get("/api/comments/{id}", comment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(comment.getId()))
            .andExpect(jsonPath("$.videoID").value(DEFAULT_VIDEO_ID))
            .andExpect(jsonPath("$.commentBody").value(DEFAULT_COMMENT_BODY))
            .andExpect(jsonPath("$.likesCount").value(DEFAULT_LIKES_COUNT))
            .andExpect(jsonPath("$.dislikesCount").value(DEFAULT_DISLIKES_COUNT))
            .andExpect(jsonPath("$.isApproved").value(DEFAULT_IS_APPROVED))
            .andExpect(jsonPath("$.isAdminComment").value(DEFAULT_IS_ADMINCOMMENT));
    }

    @Test
    public void getCommentsForVideo() throws Exception {
        // Initialize the database
        commentRepository.save(comment.isApproved(UPDATED_IS_APPROVED));

        // Get comments for video
        restCommentMockMvc.perform(get("/api/comments/commentsForVideo/{videoID}", comment.getVideoID()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].videoID").value(hasItem(DEFAULT_VIDEO_ID)))
            .andExpect(jsonPath("$.[*].commentBody").value(hasItem(DEFAULT_COMMENT_BODY)))
            .andExpect(jsonPath("$.[*].likesCount").value(hasItem(DEFAULT_LIKES_COUNT)))
            .andExpect(jsonPath("$.[*].dislikesCount").value(hasItem(DEFAULT_DISLIKES_COUNT)))
            .andExpect(jsonPath("$.[*].isApproved").value(hasItem(UPDATED_IS_APPROVED)))
            .andExpect(jsonPath("$.[*].isAdminComment").value(hasItem(DEFAULT_IS_ADMINCOMMENT)));
    }

    @Test
    public void getNonExistingComment() throws Exception {
        // Get the comment
        restCommentMockMvc.perform(get("/api/comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateComment() throws Exception {
        // Initialize the database
        commentRepository.save(comment);

        int databaseSizeBeforeUpdate = commentRepository.findAll().size();

        // Update the comment
        Comment updatedComment = commentRepository.findById(comment.getId()).get();
        updatedComment
            .videoID(UPDATED_VIDEO_ID)
            .videoName(UPDATED_VIDEO_NAME)
            .commentBody(UPDATED_COMMENT_BODY)
            .likesCount(UPDATED_LIKES_COUNT)
            .dislikesCount(UPDATED_DISLIKES_COUNT)
            .isApproved(UPDATED_IS_APPROVED)
            .isAdminComment(UPDATED_IS_ADMINCOMMENT);
        CommentDTO commentDTO = commentMapper.toDto(updatedComment);

        restCommentMockMvc.perform(put("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isOk());

        // Validate the Comment in the database
        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeUpdate);
        Comment testComment = commentList.get(commentList.size() - 1);
        assertThat(testComment.getVideoID()).isEqualTo(UPDATED_VIDEO_ID);
        assertThat(testComment.getCommentBody()).isEqualTo(UPDATED_COMMENT_BODY);
        assertThat(testComment.getLikesCount()).isEqualTo(UPDATED_LIKES_COUNT);
        assertThat(testComment.getDislikesCount()).isEqualTo(UPDATED_DISLIKES_COUNT);
        assertThat(testComment.isIsApproved()).isEqualTo(UPDATED_IS_APPROVED);
        assertThat(testComment.getIsAdminComment()).isEqualTo(UPDATED_IS_ADMINCOMMENT);
    }

    @Test
    public void updateNonExistingComment() throws Exception {
        int databaseSizeBeforeUpdate = commentRepository.findAll().size();

        // Create the Comment
        CommentDTO commentDTO = commentMapper.toDto(comment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentMockMvc.perform(put("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comment in the database
        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteComment() throws Exception {
        // Initialize the database
        commentRepository.save(comment);

        int databaseSizeBeforeDelete = commentRepository.findAll().size();

        // Delete the comment
        restCommentMockMvc.perform(delete("/api/comments/{id}", comment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Comment> commentList = commentRepository.findAll();
        assertThat(commentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comment.class);
        Comment comment1 = new Comment();
        comment1.setId("id1");
        Comment comment2 = new Comment();
        comment2.setId(comment1.getId());
        assertThat(comment1).isEqualTo(comment2);
        comment2.setId("id2");
        assertThat(comment1).isNotEqualTo(comment2);
        comment1.setId(null);
        assertThat(comment1).isNotEqualTo(comment2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommentDTO.class);
        CommentDTO commentDTO1 = new CommentDTO();
        commentDTO1.setId("id1");
        CommentDTO commentDTO2 = new CommentDTO();
        assertThat(commentDTO1).isNotEqualTo(commentDTO2);
        commentDTO2.setId(commentDTO1.getId());
        assertThat(commentDTO1).isEqualTo(commentDTO2);
        commentDTO2.setId("id2");
        assertThat(commentDTO1).isNotEqualTo(commentDTO2);
        commentDTO1.setId(null);
        assertThat(commentDTO1).isNotEqualTo(commentDTO2);
    }
}
