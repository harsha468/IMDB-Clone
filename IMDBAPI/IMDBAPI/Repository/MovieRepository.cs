using System.Collections.Generic;
using System.Data.SqlClient;
using IMDB.Model.DB;
using Microsoft.Extensions.Options;

namespace IMDB.Repository
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRepository
    {
        private readonly Connection _connection;
        public MovieRepository(IOptions<Connection> connection) : base(connection)
        {
            _connection = connection.Value;
        }
        public IEnumerable<Movie> GetAll()
        {
            const string sql = @"SELECT * 
                                FROM Movies";
            return base.GetAll( sql );
        }
        public Movie Get(int id)
        {
            const string sql = @"SELECT * 
                                FROM Movies 
                                WHERE Id = @Id;";
            return base.Get( sql, new { Id = id } );
        }
        public void Post(Movie movie, string ActorsIds, string GenresIds)
        {
            base.ExecuteProcedure( "Add_Movie", new { movie.Name, movie.YearOfRelease, movie.Plot, movie.ProducerId, ActorsIds, GenresIds, CoverImage = movie.CoverImage } );
        }
        public void Delete(int id)
        {
            const string sql =@"DELETE FROM MovieActorMapping WHERE MovieId = @Id;
                                DELETE FROM MovieGenreMapping WHERE MovieId = @Id;
                                DELETE FROM Reviews WHERE MovieId = @Id;
                                DELETE FROM Movies WHERE Id = @Id;";
            base.ExecuteQuery( sql, new { Id = id } );
        }
        public void Put(int id, Movie movie, string ActorsIds, string GenresIds)
        {
            base.ExecuteProcedure( "Update_Movie", new { id, movie.Name, movie.YearOfRelease, movie.Plot, movie.ProducerId, ActorsIds, GenresIds, CoverImage = movie.CoverImage } );
        }
    }
}