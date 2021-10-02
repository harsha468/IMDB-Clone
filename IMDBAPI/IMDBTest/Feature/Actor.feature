Feature: Actor Resource

Scenario: Get Actor All
	Given I am a client
	When I make GET Request '/actors'
	Then response code must be '200'
	And response data must look like '[{"id":1,"name":"Mock Actor 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},{"id":2,"name":"Mock Actor 2","bio":"Bio2","dob":"2000-03-07T00:00:00","gender":"male"}]'

Scenario: Get actor by Id
	Given I am a client
	When I make GET Request '/actors/1'
	Then response code must be '200'
	And response data must look like '{"id":1,"name":"Mock Actor 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"}'

Scenario: Get actor by Id which doesn't exists
	Given I am a client
	When I make GET Request '/actors/6'
	Then response code must be '404'

Scenario: Post actor
	Given I am a client
	When I am making a post request to '/actors' with the following Data '{"name":"Mock Actor 3","bio":"Bio3","dob":"2000-03-07","gender":"female"}'
	Then response code must be '200'

Scenario: Update actor
	Given I am a client
	When I am making a PUT request to '/actors/3' with the following Data '{"name":"Mock Actor 3","bio":"Bio3","dob":"2000-03-07","gender":"female"}'
	Then response code must be '200'

Scenario: Delete actor by Id
	Given I am a client
	When I make Delete Request '/actors/2'
	Then response code must be '200'

