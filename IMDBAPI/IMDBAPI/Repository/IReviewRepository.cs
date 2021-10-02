using System.Collections.Generic;
using IMDB.Model.DB;

namespace IMDB.Repository
{
    public interface IReviewRepository
    {
        public IEnumerable<Review> GetAll(int movieId);
        public Review Get(int movieId, int reviewId);
        public void Post(int movieId, Review review);
        public void Delete(int movieId, int reviewId);
        public void Put(int movieId, int reviewId, Review review);
    }
}