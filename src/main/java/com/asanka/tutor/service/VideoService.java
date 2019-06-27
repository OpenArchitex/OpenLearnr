package com.asanka.tutor.service;

import com.asanka.tutor.service.dto.VideoDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asanka.tutor.domain.Video}.
 */
public interface VideoService {

    /**
     * Save a video.
     *
     * @param videoDTO the entity to save.
     * @return the persisted entity.
     */
    VideoDTO save(VideoDTO videoDTO);

    /**
     * Get all the videos.
     *
     * @return the list of entities.
     */
    List<VideoDTO> findAll();

    /**
     * Get all the videos for a collection of chapters.
     *
     * @return the list of entities
     */
    List<VideoDTO> findAllVideosForChapters(String[] chapterIDs);

    /**
     * Get the "id" video.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VideoDTO> findOne(String id);

    /**
     * Delete the "id" video.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
