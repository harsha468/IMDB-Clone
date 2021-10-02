using System.Collections.Generic;
using IMDB.Model.DB;
using Microsoft.Extensions.Options;

namespace IMDB.Repository
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        private readonly Connection _connection;
        public ReviewRepository(IOptions<Connection> connection) : base(connection)
        {
            _connection = connection.Value;
        }
        public IEnumerable<Review> GetAll(int movieId)
        {
            const string sql = @"SELECT * 
                                FROM Reviews
                                WHERE MovieId = @MovieId;";
            return base.GetMany( sql, new { MovieId = movieId });
        }
        public Review Get(int movieId, int reviewId)
        {
            const string sql = @"SELECT * 
                                FROM Reviews 
                                WHERE Id = @Id AND MovieId = @MovieId;";
            return base.Get(sql, new { Id = reviewId, MovieId = movieId });
        }
        public void Post(int movieId, Review review)
        {
            const string sql = @"INSERT INTO Reviews (Comment, MovieId)
                                VALUES (@Comment, @MovieId);";
            base.ExecuteQuery( sql, new { Comment = review.Comment, MovieId = movieId} );
        }
        public void Delete(int movieId, int reviewId)
        {
            const string sql = @"DELETE FROM Reviews 
                                WHERE Id = @Id;";
            base.ExecuteQuery( sql, new { Id = reviewId } );
        }
        public void Put(int movieId, int reviewId, Review review)
        {
            const string sql = @"UPDATE Reviews 
                                SET Comment = @Comment
                                Id = @Id;";
            base.ExecuteQuery( sql, new { Comment = review.Comment, Id = reviewId } );
        }
    }
}