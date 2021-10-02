using System;
using System.Collections.Generic;
using System.Linq;
using IMDB.Model.DB;
using IMDB.Model.Request;
using IMDB.Model.Response;
using IMDB.Repository;

namespace IMDB.Service
{
    public class ProducerService : IProducerService
    {
        private readonly IProducerRepository _producerRepository;
        public ProducerService(IProducerRepository producerRepository)
        {
            _producerRepository = producerRepository;
        }
        public IEnumerable<ProducerResponse> GetAll()
        {
            var producers = _producerRepository.GetAll();
            return producers.Select(p => new ProducerResponse
            {
                Id = p.Id,
                Name = p.Name,
                DOB = p.DOB,
                Bio = p.Bio,
                Gender = p.Gender
            });
        }
        public ProducerResponse Get(int id)
        {
            var producer = _producerRepository.Get(id);
            return producer is null ? null : new ProducerResponse
            {
                Id = producer.Id,
                Name = producer.Name,
                DOB = producer.DOB,
                Bio = producer.Bio,
                Gender = producer.Gender
            };
        }
        public int Post(ProducerRequest producer)
        {
            if (producer.DOB < Convert.ToDateTime("01/01/1920") || producer.DOB > DateTime.Now)
                throw new ArgumentException();
            if (string.IsNullOrEmpty(producer.Name) || string.IsNullOrEmpty(producer.Bio) || string.IsNullOrEmpty(producer.Gender))
                throw new ArgumentException();
            var producerObject = new Producer
            {
                Name = producer.Name,
                DOB = producer.DOB,
                Bio = producer.Bio,
                Gender = producer.Gender
            };
            return _producerRepository.Post(producerObject);
        }
        public void Delete(int id)
        {
            _producerRepository.Delete(id);
        }
        public void Put(int id, ProducerRequest producer)
        {
            if (producer.DOB < Convert.ToDateTime("01/01/1920") || producer.DOB > DateTime.Now)
                throw new ArgumentException();
            if (string.IsNullOrEmpty(producer.Name) || string.IsNullOrEmpty(producer.Bio) || string.IsNullOrEmpty(producer.Gender))
                throw new ArgumentException();
            var producerObject = new Producer
            {
                Id = id,
                Name = producer.Name,
                DOB = producer.DOB,
                Bio = producer.Bio,
                Gender = producer.Gender
            };
            _producerRepository.Put(id, producerObject);
        }
    }
}