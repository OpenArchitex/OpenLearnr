package com.asanka.tutor.service.impl;

import com.asanka.tutor.service.VideoService;
import com.asanka.tutor.domain.Video;
import com.asanka.tutor.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Video.
 */
@Service
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    /**
     * Save a video.
     *
     * @param video the entity to save
     * @return the persisted entity
     */
    @Override
    public Video save(Video video) {
        log.debug("Request to save Video : {}", video);        return videoRepository.save(video);
    }

    /**
     * Get all the videos.
     *
     * @return the list of entities
     */
    @Override
    public List<Video> findAll() {
        log.debug("Request to get all Videos");
        return videoRepository.findAll();
    }

    /**
     * Get all the videos for the chapter.
     *
     * @return the list of entities
     */
    @Override
    public List<Video> findAllVideosForChapter(String chapterID) {
        log.debug("Request to get all Vidoes for the chapterID" + chapterID);
        return videoRepository.findVideosByChapterID(chapterID);
    }

    /**
     * Get one video by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Video> findOne(String id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findById(id);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.deleteById(id);
    }
}
