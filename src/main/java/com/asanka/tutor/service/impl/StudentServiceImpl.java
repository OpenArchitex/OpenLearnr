package com.asanka.tutor.service.impl;

import com.asanka.tutor.service.StudentService;
import com.asanka.tutor.domain.Student;
import com.asanka.tutor.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Student.
 */
@Service
public class StudentServiceImpl implements StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentServiceImpl.class);

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Save a student.
     *
     * @param student the entity to save
     * @return the persisted entity
     */
    @Override
    public Student save(Student student) {
        log.debug("Request to save Student : {}", student);        return studentRepository.save(student);
    }

    /**
     * Get all the students.
     *
     * @return the list of entities
     */
    @Override
    public List<Student> findAll() {
        log.debug("Request to get all Students");
        return studentRepository.findAll();
    }


    /**
     * Get one student by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Student> findOne(String id) {
        log.debug("Request to get Student : {}", id);
        return studentRepository.findById(id);
    }

    /**
     * Delete the student by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Student : {}", id);
        studentRepository.deleteById(id);
    }
}
