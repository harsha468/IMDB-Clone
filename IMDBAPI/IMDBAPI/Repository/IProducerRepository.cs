using System.Collections.Generic;
using IMDB.Model.DB;

namespace IMDB.Repository
{
    public interface IProducerRepository
    {
        public IEnumerable<Producer> GetAll();
        public Producer Get(int id);
        public int Post(Producer producer);
        public void Delete(int id);
        public void Put(int id, Producer producer);
    }
}