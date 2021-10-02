Feature: Review Resource

Scenario: Get Review All by Movie Id
	Given I am a client
	When I make GET Request 'movies/1/reviews'
	Then response code must be '200'
	And response data must look like '[{"id":2,"comment":"Mock Comment 2"}]'

Scenario: Get Review by MovieId and Review Id
	Given I am a client
	When I make GET Request 'movies/1/reviews/1'
	Then response code must be '200'
	And response data must look like '{"id":1,"comment":"Mock Comment 1"}'

Scenario: Post Review
	Given I am a client
	When I am making a post request to 'movies/1/reviews' with the following Data '{"comment":"Mock Comment 3"}'
	Then response code must be '200'

Scenario: Update Review
	Given I am a client
	When I am making a PUT request to 'movies/1/reviews/2' with the following Data '{"comment":"Mock Comment 2"}'
	Then response code must be '200'

Scenario: Delete Review by Id
	Given I am a client
	When I make Delete Request 'movies/1/reviews/1'
	Then response code must be '200'