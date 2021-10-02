using System.Collections.Generic;
using IMDB.Model.DB;
using Microsoft.Extensions.Options;

namespace IMDB.Repository
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        private readonly Connection _connection;
        public GenreRepository(IOptions<Connection> connection) : base(connection)
        {
            _connection = connection.Value;
        }
        public IEnumerable<Genre> GetAll()
        {            
            const string sql = @"SELECT * 
                                FROM Genres";
            return base.GetAll( sql );
        }
        public Genre Get(int id)
        {
            const string sql = @"SELECT *  
                                FROM Genres 
                                WHERE id = @Id;";
            return base.Get( sql, new { Id = id });
        }
        public IEnumerable<Genre> GetByMovieId(int movieId)
        {
            const string sql = @"
                                SELECT G.*
                                FROM Genres G
                                INNER JOIN MovieGenreMapping MGM
                                    ON G.Id = MGM.GenreId
                                WHERE MGM.MovieId = @MovieId
                                ";
            return base.GetMany(sql, new { MovieId = movieId });
        }
        public int Post(Genre genre)
        {
            const string sql = @"INSERT INTO Genres 
                                (Name)
                                VALUES (@Name)";
            base.ExecuteQuery(sql, new { Name = genre.Name });
            const string sql1 = @"SELECT MAX(Id) FROM Genres;";
            return base.ExecuteQuery(sql1);
        }
        public void Delete(int id)
        {
            const string sql =@"DELETE FROM MovieGenreMapping WHERE GenreId = @Id;
                                DELETE FROM Genres WHERE Id = @Id;";
            base.ExecuteQuery(sql, new { Id = id });
        }
        public void Put(int id, Genre genre)
        {
            const string sql = @"UPDATE Genres 
                                SET Name = @Name
                                WHERE Id = @Id;";
            base.ExecuteQuery(sql, new { Id = id, Name = genre.Name });
        }
    }
}