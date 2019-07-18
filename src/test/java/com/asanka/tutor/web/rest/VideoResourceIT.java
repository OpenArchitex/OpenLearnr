package com.asanka.tutor.web.rest;

import com.asanka.tutor.OpenLearnrApp;
import com.asanka.tutor.domain.Video;
import com.asanka.tutor.repository.VideoRepository;
import com.asanka.tutor.service.VideoService;
import com.asanka.tutor.service.dto.VideoDTO;
import com.asanka.tutor.service.mapper.VideoMapper;
import com.asanka.tutor.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static com.asanka.tutor.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link VideoResource} REST controller.
 */
@SpringBootTest(classes = OpenLearnrApp.class)
public class VideoResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_EPISODE = 1;
    private static final Integer UPDATED_EPISODE = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_COURSE_ID = "AAAAAAAAAA";
    private static final String UPDATED_COURSE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CHAPTER_ID = "AAAAAAAAAA";
    private static final String UPDATED_CHAPTER_ID = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_SAMPLE = false;
    private static final Boolean UPDATED_IS_SAMPLE = true;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private VideoMapper videoMapper;

    @Autowired
    private VideoService videoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restVideoMockMvc;

    private Video video;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VideoResource videoResource = new VideoResource(videoService);
        this.restVideoMockMvc = MockMvcBuilders.standaloneSetup(videoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Video createEntity() {
        Video video = new Video()
            .name(DEFAULT_NAME)
            .episode(DEFAULT_EPISODE)
            .description(DEFAULT_DESCRIPTION)
            .url(DEFAULT_URL)
            .courseID(DEFAULT_COURSE_ID)
            .chapterID(DEFAULT_CHAPTER_ID)
            .isSample(DEFAULT_IS_SAMPLE);
        return video;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Video createUpdatedEntity() {
        Video video = new Video()
            .name(UPDATED_NAME)
            .episode(UPDATED_EPISODE)
            .description(UPDATED_DESCRIPTION)
            .url(UPDATED_URL)
            .courseID(UPDATED_COURSE_ID)
            .chapterID(UPDATED_CHAPTER_ID)
            .isSample(UPDATED_IS_SAMPLE);
        return video;
    }

    @BeforeEach
    public void initTest() {
        videoRepository.deleteAll();
        video = createEntity();
    }

    @Test
    public void createVideo() throws Exception {
        int databaseSizeBeforeCreate = videoRepository.findAll().size();

        // Create the Video
        VideoDTO videoDTO = videoMapper.toDto(video);
        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isCreated());

        // Validate the Video in the database
        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeCreate + 1);
        Video testVideo = videoList.get(videoList.size() - 1);
        assertThat(testVideo.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVideo.getEpisode()).isEqualTo(DEFAULT_EPISODE);
        assertThat(testVideo.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVideo.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testVideo.getCourseID()).isEqualTo(DEFAULT_COURSE_ID);
        assertThat(testVideo.getChapterID()).isEqualTo(DEFAULT_CHAPTER_ID);
        assertThat(testVideo.isIsSample()).isEqualTo(DEFAULT_IS_SAMPLE);
    }

    @Test
    public void createVideoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = videoRepository.findAll().size();

        // Create the Video with an existing ID
        video.setId("existing_id");
        VideoDTO videoDTO = videoMapper.toDto(video);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Video in the database
        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setName(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEpisodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setEpisode(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setDescription(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setUrl(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCourseIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setCourseID(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkChapterIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setChapterID(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIsSampleIsRequired() throws Exception {
        int databaseSizeBeforeTest = videoRepository.findAll().size();
        // set the field null
        video.setIsSample(null);

        // Create the Video, which fails.
        VideoDTO videoDTO = videoMapper.toDto(video);

        restVideoMockMvc.perform(post("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllVideos() throws Exception {
        // Initialize the database
        videoRepository.save(video);

        // Get all the videoList
        restVideoMockMvc.perform(get("/api/videos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(video.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].episode").value(hasItem(DEFAULT_EPISODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].courseID").value(hasItem(DEFAULT_COURSE_ID)))
            .andExpect(jsonPath("$.[*].chapterID").value(hasItem(DEFAULT_CHAPTER_ID)))
            .andExpect(jsonPath("$.[*].isSample").value(hasItem(DEFAULT_IS_SAMPLE)));
    }
    
    @Test
    public void getVideo() throws Exception {
        // Initialize the database
        videoRepository.save(video);

        // Get the video
        restVideoMockMvc.perform(get("/api/videos/{id}", video.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(video.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.episode").value(DEFAULT_EPISODE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.courseID").value(DEFAULT_COURSE_ID))
            .andExpect(jsonPath("$.chapterID").value(DEFAULT_CHAPTER_ID))
            .andExpect(jsonPath("$.isSample").value(DEFAULT_IS_SAMPLE));
    }

    @Test
    public void getNonExistingVideo() throws Exception {
        // Get the video
        restVideoMockMvc.perform(get("/api/videos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateVideo() throws Exception {
        // Initialize the database
        videoRepository.save(video);

        int databaseSizeBeforeUpdate = videoRepository.findAll().size();

        // Update the video
        Video updatedVideo = videoRepository.findById(video.getId()).get();
        updatedVideo
            .name(UPDATED_NAME)
            .episode(UPDATED_EPISODE)
            .description(UPDATED_DESCRIPTION)
            .url(UPDATED_URL)
            .courseID(UPDATED_COURSE_ID)
            .chapterID(UPDATED_CHAPTER_ID)
            .isSample(UPDATED_IS_SAMPLE);
        VideoDTO videoDTO = videoMapper.toDto(updatedVideo);

        restVideoMockMvc.perform(put("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isOk());

        // Validate the Video in the database
        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeUpdate);
        Video testVideo = videoList.get(videoList.size() - 1);
        assertThat(testVideo.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVideo.getEpisode()).isEqualTo(UPDATED_EPISODE);
        assertThat(testVideo.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVideo.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testVideo.getCourseID()).isEqualTo(UPDATED_COURSE_ID);
        assertThat(testVideo.getChapterID()).isEqualTo(UPDATED_CHAPTER_ID);
        assertThat(testVideo.isIsSample()).isEqualTo(UPDATED_IS_SAMPLE);
    }

    @Test
    public void updateNonExistingVideo() throws Exception {
        int databaseSizeBeforeUpdate = videoRepository.findAll().size();

        // Create the Video
        VideoDTO videoDTO = videoMapper.toDto(video);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideoMockMvc.perform(put("/api/videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Video in the database
        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteVideo() throws Exception {
        // Initialize the database
        videoRepository.save(video);

        int databaseSizeBeforeDelete = videoRepository.findAll().size();

        // Delete the video
        restVideoMockMvc.perform(delete("/api/videos/{id}", video.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Video> videoList = videoRepository.findAll();
        assertThat(videoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Video.class);
        Video video1 = new Video();
        video1.setId("id1");
        Video video2 = new Video();
        video2.setId(video1.getId());
        assertThat(video1).isEqualTo(video2);
        video2.setId("id2");
        assertThat(video1).isNotEqualTo(video2);
        video1.setId(null);
        assertThat(video1).isNotEqualTo(video2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VideoDTO.class);
        VideoDTO videoDTO1 = new VideoDTO();
        videoDTO1.setId("id1");
        VideoDTO videoDTO2 = new VideoDTO();
        assertThat(videoDTO1).isNotEqualTo(videoDTO2);
        videoDTO2.setId(videoDTO1.getId());
        assertThat(videoDTO1).isEqualTo(videoDTO2);
        videoDTO2.setId("id2");
        assertThat(videoDTO1).isNotEqualTo(videoDTO2);
        videoDTO1.setId(null);
        assertThat(videoDTO1).isNotEqualTo(videoDTO2);
    }
}
