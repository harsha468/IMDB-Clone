using System.Collections.Generic;
using IMDB.Model.Response;
using IMDB.Model.Request;

namespace IMDB.Service
{
    public interface IProducerService
    {
        public IEnumerable<ProducerResponse> GetAll();
        public ProducerResponse Get(int id);
        public int Post(ProducerRequest Producer);
        public void Delete(int id);
        public void Put(int id, ProducerRequest producer);

    }
}