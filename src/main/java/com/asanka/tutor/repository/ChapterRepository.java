package com.asanka.tutor.repository;

import com.asanka.tutor.domain.Chapter;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Chapter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChapterRepository extends MongoRepository<Chapter, String> {
    List<Chapter> findChaptersByCourseID(String courseID);
}
