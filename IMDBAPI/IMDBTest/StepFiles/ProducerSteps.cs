using IMDB.Test.MockResources;
using Microsoft.Extensions.DependencyInjection;
using TechTalk.SpecFlow;

namespace IMDB.Test.StepFiles
{
    [Scope(Feature = "Producer Resource")]
    [Binding]
    public class ProducerSteps : BaseSteps
    {
        public ProducerSteps(CustomWebApplicationFactory factory)
            : base(factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Mock Repo
                    services.AddScoped(_ => ProducerMock.ProducerRepoMock.Object);
                });
            }))
        {
        }

        [BeforeScenario]
        public static void Mocks()
        {
            ProducerMock.MockInitialize();
        }
    }
}