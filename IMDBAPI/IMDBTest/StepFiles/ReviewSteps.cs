using IMDB.Test.MockResources;
using Microsoft.Extensions.DependencyInjection;
using TechTalk.SpecFlow;

namespace IMDB.Test.StepFiles
{
    [Scope(Feature = "Review Resource")]
    [Binding]
    public class ReviewSteps : BaseSteps
    {
        ActorMock am = new ActorMock();
        public ReviewSteps(CustomWebApplicationFactory factory)
            : base(factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Mock Repo
                    services.AddScoped(_ => ReviewMock.ReviewRepoMock.Object);
                });
            }))
        {
        }

        [BeforeScenario]
        public static void Mocks()
        {
            ReviewMock.MockInitialize();
        }
    }
}