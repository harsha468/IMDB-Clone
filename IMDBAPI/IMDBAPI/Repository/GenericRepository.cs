using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Options;

namespace IMDB.Repository
{
    public class GenericRepository<TClass>: IGenericRepository<TClass>
    {
        private readonly Connection _connection;
        public GenericRepository(IOptions<Connection> connectionString)
        {
            _connection = connectionString.Value;
        }
        public IEnumerable<TClass> GetAll(string query)
        {
            using var connection = new SqlConnection(_connection.DB);
            return connection.Query<TClass>(query);
        }
        public IEnumerable<TClass> GetMany(string query, object ob)
        {
            using var connection = new SqlConnection(_connection.DB);
            return connection.Query<TClass>(query, ob);
        }
        public TClass Get(string query, object ob)
        {
            using var connection = new SqlConnection(_connection.DB);
            return connection.QueryFirstOrDefault<TClass>(query, ob);
        }
        public void Delete(string query, object ob)
        {
            using var connection = new SqlConnection(_connection.DB);
            connection.Execute(query, ob);
        }
        public void ExecuteQuery(string procedureName, Object ob)
        {
            using var connection = new SqlConnection(_connection.DB);
            connection.Execute(procedureName, ob);
        }
        public int ExecuteQuery(string query)
        {
            using var connection = new SqlConnection(_connection.DB);
            return connection.QueryFirstOrDefault<int>(query);
        }
        public void ExecuteProcedure(string procedureName, object ob)
        {
            using var connection = new SqlConnection(_connection.DB);
            connection.Execute(procedureName, ob, commandType: CommandType.StoredProcedure);
        }
    }
}