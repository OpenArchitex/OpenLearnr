package com.asanka.tutor.service;

import com.asanka.tutor.domain.Course;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Course.
 */
public interface CourseService {

    /**
     * Save a course.
     *
     * @param course the entity to save
     * @return the persisted entity
     */
    Course save(Course course);

    /**
     * Get all the courses.
     *
     * @return the list of entities
     */
    List<Course> findAll();


    /**
     * Get the "id" course.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Course> findOne(String id);

    /**
     * Delete the "id" course.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
