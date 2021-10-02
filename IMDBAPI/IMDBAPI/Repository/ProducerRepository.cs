using System.Collections.Generic;
using IMDB.Model.DB;
using Microsoft.Extensions.Options;

namespace IMDB.Repository
{
    public class ProducerRepository : GenericRepository<Producer>, IProducerRepository
    {
        private readonly Connection _connection;
        public ProducerRepository(IOptions<Connection> connection) : base(connection)
        {
            _connection = connection.Value;
        }
        public IEnumerable<Producer> GetAll()
        {
            const string sql = @"SELECT * 
                                FROM Producers";
            return base.GetAll(sql);
        }
        public Producer Get(int id)
        {
            const string sql = @"SELECT * 
                                FROM Producers 
                                WHERE Id = @Id;";
            return base.Get(sql, new { Id = id });
        }
        public int Post(Producer producer)
        {
            const string sql = @"INSERT INTO Producers 
                                (Name, Gender, DOB, Bio)
                                VALUES (@Name, @Gender, @DOB, @Bio);";
            base.ExecuteQuery( sql, new { Name = producer.Name, Gender = producer.Gender, DOB = producer.DOB, Bio = producer.Bio, Id = producer.Id } );
            const string sql1 = @"SELECT MAX(Id) FROM Producers;";
            return base.ExecuteQuery(sql1);
        }
        public void Delete(int id)
        {
            base.ExecuteProcedure( "Delete_Producer", new { ProducerId = id } );
        }
        public void Put(int id, Producer producer)
        {
            const string sql = @"UPDATE Producers
                                SET Name = @Name, 
                                Gender = @Gender, 
                                DOB = @DOB, 
                                Bio = @Bio 
                                WHERE Id = @Id;";
            base.ExecuteQuery(sql, new { Name = producer.Name, Gender = producer.Gender, DOB = producer.DOB, Bio = producer.Bio, Id = producer.Id});
        }
    }
}