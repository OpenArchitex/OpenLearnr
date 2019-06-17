package com.asanka.tutor.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.asanka.tutor.domain.Chapter;
import com.asanka.tutor.service.ChapterService;
import com.asanka.tutor.web.rest.errors.BadRequestAlertException;
import com.asanka.tutor.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Chapter.
 */
@RestController
@RequestMapping("/api")
public class ChapterResource {

    private final Logger log = LoggerFactory.getLogger(ChapterResource.class);

    private static final String ENTITY_NAME = "chapter";

    private final ChapterService chapterService;

    public ChapterResource(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    /**
     * POST  /chapters : Create a new chapter.
     *
     * @param chapter the chapter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chapter, or with status 400 (Bad Request) if the chapter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chapters")
    @Timed
    public ResponseEntity<Chapter> createChapter(@Valid @RequestBody Chapter chapter) throws URISyntaxException {
        log.debug("REST request to save Chapter : {}", chapter);
        if (chapter.getId() != null) {
            throw new BadRequestAlertException("A new chapter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chapter result = chapterService.save(chapter);
        return ResponseEntity.created(new URI("/api/chapters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chapters : Updates an existing chapter.
     *
     * @param chapter the chapter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chapter,
     * or with status 400 (Bad Request) if the chapter is not valid,
     * or with status 500 (Internal Server Error) if the chapter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chapters")
    @Timed
    public ResponseEntity<Chapter> updateChapter(@Valid @RequestBody Chapter chapter) throws URISyntaxException {
        log.debug("REST request to update Chapter : {}", chapter);
        if (chapter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Chapter result = chapterService.save(chapter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chapter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chapters : get all the chapters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chapters in body
     */
    @GetMapping("/chapters")
    @Timed
    public List<Chapter> getAllChapters() {
        log.debug("REST request to get all Chapters");
        return chapterService.findAll();
    }

    /**
     * GET  /chapters/:id : get the "id" chapter.
     *
     * @param id the id of the chapter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chapter, or with status 404 (Not Found)
     */
    @GetMapping("/chapters/{id}")
    @Timed
    public ResponseEntity<Chapter> getChapter(@PathVariable String id) {
        log.debug("REST request to get Chapter : {}", id);
        Optional<Chapter> chapter = chapterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(chapter);
    }

    /**
     * DELETE  /chapters/:id : delete the "id" chapter.
     *
     * @param id the id of the chapter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chapters/{id}")
    @Timed
    public ResponseEntity<Void> deleteChapter(@PathVariable String id) {
        log.debug("REST request to delete Chapter : {}", id);
        chapterService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
