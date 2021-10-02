using IMDB.Test.MockResources;
using Microsoft.Extensions.DependencyInjection;
using TechTalk.SpecFlow;

namespace IMDB.Test.StepFiles
{
    [Scope(Feature = "Actor Resource")]
    [Binding]
    public class ActorSteps : BaseSteps
    {
        public ActorSteps(CustomWebApplicationFactory factory)
            : base(factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Mock Repo
                    services.AddScoped(_ => ActorMock.ActorRepoMock.Object);
                });
            }))
        {
        }

        [BeforeScenario]
        public static void Mocks()
        {
            ActorMock.MockInitialize();
        }
    }
}