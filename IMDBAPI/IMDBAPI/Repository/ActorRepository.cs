using System.Collections.Generic;
using IMDB.Model.DB;
using Microsoft.Extensions.Options;

namespace IMDB.Repository
{
    public class ActorRepository : GenericRepository<Actor>, IActorRepository
    {
        private readonly Connection _connection;
        public ActorRepository(IOptions<Connection> connection) : base(connection)
        {
            _connection = connection.Value;
        }
        public IEnumerable<Actor> GetAll()
        {
            const string sql = @"SELECT * 
                                FROM Actors";
            return base.GetAll( sql );
        }
        public Actor Get(int id)
        {
            const string sql = @"SELECT * 
                                FROM Actors 
                                WHERE Id = @Id;";
            return base.Get( sql, new { Id = id } );
        }
        public IEnumerable<Actor> GetByMovieId(int movieId)
        {
            const string sql = @"
                                SELECT A.*
                                FROM Actors A
                                INNER JOIN MovieActorMapping MAM
                                ON A.Id = MAM.ActorId
                                WHERE MAM.MovieId = @MovieId
                                ";
            return base.GetMany( sql, new { MovieId = movieId} );
        }
        public int Post(Actor actor)
        {
            const string sql = @"INSERT INTO Actors (
                                Name, Gender, DOB, Bio)
                                VALUES (@Name, @Gender, @DOB, @Bio);";
            base.ExecuteQuery(sql, new { Name = actor.Name, Gender = actor.Gender, DOB = actor.DOB, Bio = actor.Bio });
            const string sql1 = @"SELECT MAX(Id) FROM Actors;";
            return base.ExecuteQuery(sql1);
        }
        public void Delete(int id)
        {
            const string sql =@"DELETE FROM MovieActorMapping WHERE ActorId = @Id;
                                DELETE FROM Actors WHERE Id = @Id;";
            base.Delete( sql, new { Id = id } );
        }
        public void Put(int id, Actor actor)
        {
            const string sql = @"UPDATE Actors 
                                SET Name = @Name, 
                                Gender = @Gender, 
                                DOB = @DOB, 
                                Bio = @Bio 
                                WHERE Actors.Id = @Id;";
            base.ExecuteQuery( sql, new { Name = actor.Name, Gender = actor.Gender, DOB = actor.DOB, Bio = actor.Bio, Id = actor.Id } );
        }
    }
}