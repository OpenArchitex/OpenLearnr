package com.asanka.tutor.service.impl;

import com.asanka.tutor.service.CourseService;
import com.asanka.tutor.domain.Course;
import com.asanka.tutor.repository.CourseRepository;
import com.asanka.tutor.service.dto.CourseDTO;
import com.asanka.tutor.service.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Course}.
 */
@Service
public class CourseServiceImpl implements CourseService {

    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

    private final CourseRepository courseRepository;

    private final CourseMapper courseMapper;

    public CourseServiceImpl(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    /**
     * Save a course.
     *
     * @param courseDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        log.debug("Request to save Course : {}", courseDTO);
        Course course = courseMapper.toEntity(courseDTO);
        course = courseRepository.save(course);
        return courseMapper.toDto(course);
    }

    /**
     * Get all the courses.
     *
     * @return the list of entities.
     */
    @Override
    public List<CourseDTO> findAll() {
        log.debug("Request to get all Courses");
        return courseRepository.findAll().stream()
            .map(courseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one course by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<CourseDTO> findOne(String id) {
        log.debug("Request to get Course : {}", id);
        return courseRepository.findById(id)
            .map(courseMapper::toDto);
    }

    /**
     * Delete the course by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Course : {}", id);
        courseRepository.deleteById(id);
    }
}
