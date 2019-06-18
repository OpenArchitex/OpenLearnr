package com.asanka.tutor.web.rest;

import com.asanka.tutor.security.AuthoritiesConstants;
import com.asanka.tutor.domain.Chapter;
import com.asanka.tutor.service.ChapterService;
import com.asanka.tutor.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.asanka.tutor.domain.Chapter}.
 */
@RestController
@RequestMapping("/api")
public class ChapterResource {

    private final Logger log = LoggerFactory.getLogger(ChapterResource.class);

    private static final String ENTITY_NAME = "chapter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChapterService chapterService;

    public ChapterResource(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    /**
     * {@code POST  /chapters} : Create a new chapter.
     *
     * @param chapter the chapter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chapter, or with status {@code 400 (Bad Request)} if the chapter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chapters")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Chapter> createChapter(@Valid @RequestBody Chapter chapter) throws URISyntaxException {
        log.debug("REST request to save Chapter : {}", chapter);
        if (chapter.getId() != null) {
            throw new BadRequestAlertException("A new chapter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chapter result = chapterService.save(chapter);
        return ResponseEntity.created(new URI("/api/chapters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * POST  /chaptersForCourse : Return all Chapters for a Course.
     *
     * @param courseID the courseID of the course
     * @return the ResponseEntity with status 200 (OK) and the list of chapters for the course in body
     * @throws BadRequestAlertException if the courseID parameter is null
     */
    @PostMapping("/chapters/chaptersForCourse")
    public List<Chapter> getChaptersForCourse(@Valid @RequestBody String courseID) {
        log.debug("REST request to get all Chapters for a Course");
        if (courseID == null) {
            throw new BadRequestAlertException("The courseID parameter cannot be null", ENTITY_NAME, "courseIDNull");
        }
        return chapterService.findAllChaptersForCourse(courseID);
    }

    /**
     * {@code PUT  /chapters} : Updates an existing chapter.
     *
     * @param chapter the chapter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chapter,
     * or with status {@code 400 (Bad Request)} if the chapter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chapter couldn't be updated.
     */
    @PutMapping("/chapters")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Chapter> updateChapter(@Valid @RequestBody Chapter chapter) {
        log.debug("REST request to update Chapter : {}", chapter);
        if (chapter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Chapter result = chapterService.save(chapter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chapter.getId()))
            .body(result);
    }

    /**
     * {@code GET  /chapters} : get all the chapters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chapters in body.
     */
    @GetMapping("/chapters")
    public List<Chapter> getAllChapters() {
        log.debug("REST request to get all Chapters");
        return chapterService.findAllChaptersForCourse();
    }

    /**
     * {@code GET  /chapters/:id} : get the "id" chapter.
     *
     * @param id the id of the chapter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chapter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chapters/{id}")
    public ResponseEntity<Chapter> getChapter(@PathVariable String id) {
        log.debug("REST request to get Chapter : {}", id);
        Optional<Chapter> chapter = chapterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(chapter);
    }

    /**
     * {@code DELETE  /chapters/:id} : delete the "id" chapter.
     *
     * @param id the id of the chapter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chapters/{id}")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteChapter(@PathVariable String id) {
        log.debug("REST request to delete Chapter : {}", id);
        chapterService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
