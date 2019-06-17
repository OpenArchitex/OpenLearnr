package com.asanka.tutor.service.impl;

import com.asanka.tutor.service.ChapterService;
import com.asanka.tutor.domain.Chapter;
import com.asanka.tutor.repository.ChapterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Chapter}.
 */
@Service
public class ChapterServiceImpl implements ChapterService {

    private final Logger log = LoggerFactory.getLogger(ChapterServiceImpl.class);

    private final ChapterRepository chapterRepository;

    public ChapterServiceImpl(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    /**
     * Save a chapter.
     *
     * @param chapter the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Chapter save(Chapter chapter) {
        log.debug("Request to save Chapter : {}", chapter);
        return chapterRepository.save(chapter);
    }

    /**
     * Get all the chapters.
     *
     * @return the list of entities.
     */
    @Override
    public List<Chapter> findAll() {
        log.debug("Request to get all Chapters");
        return chapterRepository.findAll();
    }


    /**
     * Get one chapter by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Chapter> findOne(String id) {
        log.debug("Request to get Chapter : {}", id);
        return chapterRepository.findById(id);
    }

    /**
     * Delete the chapter by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Chapter : {}", id);
        chapterRepository.deleteById(id);
    }
}
