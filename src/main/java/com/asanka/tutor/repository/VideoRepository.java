package com.asanka.tutor.repository;

import com.asanka.tutor.domain.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Video entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoRepository extends MongoRepository<Video, String> {

}
