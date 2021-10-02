using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Model.Request;
using IMDB.Model.Response;
using IMDB.Repository;

namespace IMDB.Service
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        public ReviewService(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }
        public IEnumerable<ReviewResponse> GetAll( int movieId )
        {
            var reviews = _reviewRepository.GetAll( movieId );
            return reviews is null ? null : reviews.Select(r => new ReviewResponse
            {
                Id = r.Id,
                Comment = r.Comment
            });
        }
        public ReviewResponse Get( int movieId, int reviewId )
        {
            var review = _reviewRepository.Get( movieId, reviewId );
            return review is null ? null : new ReviewResponse
            {
                Id = review.Id,
                Comment = review.Comment,
            };
        }
        public void Post(int movieId, ReviewRequest review)
        {
            var reviewObject = new Review
            {
                Comment = review.Comment
            };
            _reviewRepository.Post(movieId, reviewObject);
        }
        public void Delete(int movieId, int reviewId)
        {
            _reviewRepository.Delete(reviewId, movieId);
        }
        public void Put(int reviewId, int movieId, ReviewRequest review)
        {
            var reviewObject = new Review
            {
                Comment = review.Comment
            };
            _reviewRepository.Put(reviewId, movieId, reviewObject);
        }
    }
}