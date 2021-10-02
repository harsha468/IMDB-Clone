using System.Collections.Generic;
using IMDB.Model.Response;
using IMDB.Model.Request;

namespace IMDB.Service
{
    public interface IReviewService
    {
        public IEnumerable<ReviewResponse> GetAll(int movieId);
        public ReviewResponse Get(int movieId, int reviewId);
        public void Post(int movieId, ReviewRequest review);
        public void Delete(int movieId, int reviewId);
        public void Put(int movieId, int reviewId, ReviewRequest review);
    }
}