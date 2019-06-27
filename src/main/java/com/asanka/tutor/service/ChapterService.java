package com.asanka.tutor.service;

import com.asanka.tutor.service.dto.ChapterDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asanka.tutor.domain.Chapter}.
 */
public interface ChapterService {

    /**
     * Save a chapter.
     *
     * @param chapterDTO the entity to save.
     * @return the persisted entity.
     */
    ChapterDTO save(ChapterDTO chapterDTO);

    /**
     * Get all the chapters.
     *
     * @return the list of entities.
     */
    List<ChapterDTO> findAll();

    /**
     * Get all the chapters for the course.
     *
     * @return the list of entities
     */
    List<ChapterDTO> findAllChaptersForCourse(String courseID);

    /**
     * Get the "id" chapter.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ChapterDTO> findOne(String id);

    /**
     * Delete the "id" chapter.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
