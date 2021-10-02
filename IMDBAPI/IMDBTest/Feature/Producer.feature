Feature: Producer Resource

Scenario: Get all Producers
	Given I am a client
	When I make GET Request '/producers'
	Then response code must be '200'
	And response data must look like '[{"id":1,"name":"Mock Producer 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},{"id":2,"name":"Mock Producer 2","bio":"Bio2","dob":"2000-03-07T00:00:00","gender":"male"},{"id":3,"name":"Mock Producer 3","bio":"Bio3","dob":"2000-03-07T00:00:00","gender":"female"}]'

Scenario: Get Producer by Id
	Given I am a client
	When I make GET Request '/producers/1'
	Then response code must be '200'
	And response data must look like '{"id":1,"name":"Mock Producer 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"}'

Scenario: Get Producer by Id which doesn't exists
	Given I am a client
	When I make GET Request '/producers/20'
	Then response code must be '404'

Scenario: Post Producer
	Given I am a client
	When I am making a post request to '/producers' with the following Data '{"name":"Mock Producer 3","bio":"Bio3","dob":"2000-03-07","gender":"female"}'
	Then response code must be '200'

Scenario: Update Producer
	Given I am a client
	When I am making a PUT request to '/producers/3' with the following Data '{"name":"Mock Producer 3","bio":"Bio3","dob":"2000-03-07","gender":"female"}'
	Then response code must be '200'

Scenario: Delete Producer by Id
	Given I am a client
	When I make Delete Request '/producers/3'
	Then response code must be '200'