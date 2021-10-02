using IMDB.Test.MockResources;
using Microsoft.Extensions.DependencyInjection;
using TechTalk.SpecFlow;

namespace IMDB.Test.StepFiles
{
    [Scope(Feature = "Movie Resource")]
    [Binding]
    public class MovieSteps : BaseSteps
    {
        public MovieSteps(CustomWebApplicationFactory factory)
            : base(factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.AddScoped(_ => MovieMock.MovieRepoMock.Object);
                    services.AddScoped(_ => ActorMock.ActorRepoMock.Object);
                    services.AddScoped(_ => GenreMock.GenreRepoMock.Object);
                    services.AddScoped(_ => ProducerMock.ProducerRepoMock.Object);
                });
            }))
        {
        }

        [BeforeScenario]
        public static void Mocks()
        {
            MovieMock.MockInitialize();
        }
    }
}