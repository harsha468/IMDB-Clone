using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Repository;
using Moq;

namespace IMDB.Test.MockResources
{
    public class ReviewMock
    {
        public static Mock<IReviewRepository> ReviewRepoMock = new Mock<IReviewRepository>();

        private static int _id = 3;

        private static List<Review> ListOfReviews = new List<Review>
        {
            new Review
            {
                Id = 1,
                Comment = "Mock Comment 1",
            },
            new Review
            {
                Id = 2,
                Comment = "Mock Comment 2"
            },
            new Review
            {
                Id = 3,
                Comment = "Mock Comment 3",
            },
            new Review
            {
                Id = 4,
                Comment = "Mock Comment 4"
            }
        };
        private static Dictionary<int, List<int>> Movie_Review = new Dictionary<int, List<int>>
        {
            { 1, new List<int> {1, 2} },
            { 2, new List<int> {3, 4} },
        };
        public static void MockInitialize()
        {
            ReviewRepoMock.Setup(R => R.GetAll(It.IsAny<int>())).Returns((int movieId) => ListOfReviews.Where(R => Movie_Review.SingleOrDefault(r => r.Key == movieId).Value.Contains(R.Id)));

            ReviewRepoMock.Setup(R => R.Get(It.IsAny<int>(), It.IsAny<int>())).Returns((int movieId, int reviewId) => ListOfReviews.SingleOrDefault(R => R.Id == reviewId));

            ReviewRepoMock.Setup(A => A.Post(It.IsAny<int>(), It.IsAny<Review>()))
                .Callback((int movieId, Review s) => ListOfReviews.Add( 
                    new Review{ 
                        Id = _id++,
                        Comment = s.Comment
                }));

            ReviewRepoMock.Setup(A => A.Put(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<Review>()))
                .Callback((int movieId, int reviewId, Review s) => {
                    var review = ListOfReviews.SingleOrDefault(R => R.Id == reviewId);
                    review.Comment = s.Comment;
                    }
                );

            ReviewRepoMock.Setup(_ => _.Delete(It.IsAny<int>(), It.IsAny<int>()))
                .Callback((int movieId, int reviewId) => {
                    ListOfReviews.RemoveAll((x) => x.Id == reviewId);
                });
        }
    }
}