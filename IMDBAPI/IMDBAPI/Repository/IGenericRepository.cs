using System.Collections.Generic;

namespace IMDB.Repository
{
    public interface IGenericRepository<TClass>
    {
        public IEnumerable<TClass> GetAll(string query);
        public TClass Get(string query, object ob);
        public IEnumerable<TClass> GetMany(string query, object ob);
        public void Delete(string query, object ob);
        public void ExecuteProcedure(string procedureName, object ob);
    }
}
