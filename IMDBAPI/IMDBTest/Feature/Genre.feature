Feature: Genre Resource

Scenario: Get Genre All
	Given I am a client
	When I make GET Request '/genres'
	Then response code must be '200'
	And response data must look like '[{"id":1,"name":"Mock Genre 1"},{"id":2,"name":"Mock Genre 2"}]'

Scenario: Get Genre by Id
	Given I am a client
	When I make GET Request '/genres/1'
	Then response code must be '200'
	And response data must look like '{"id":1,"name":"Mock Genre 1"}'

Scenario: Get Genre by Id which doesn't exists
	Given I am a client
	When I make GET Request '/genres/6'
	Then response code must be '404'

Scenario: Post Genre
	Given I am a client
	When I am making a post request to '/genres' with the following Data '{"name":"Mock Genre 3"}'
	Then response code must be '200'

Scenario: Update Genre
	Given I am a client
	When I am making a PUT request to '/genres/1' with the following Data '{"name":"Mock Genre 1"}'
	Then response code must be '200'

Scenario: Delete Genre by Id
	Given I am a client
	When I make Delete Request '/genres/2'
	Then response code must be '200'