Feature: Movie Resource

Scenario: Get Movie All
	Given I am a client
	When I make GET Request '/movies'
	Then response code must be '200'
	And response data must look like '[{"id":1,"name":"Mock Movie 1","yearOfRelease":2010,"plot":"Mock Plot 1","actors":[{"id":1,"name":"Mock Actor 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},{"id":2,"name":"Mock Actor 2","bio":"Bio2","dob":"2000-03-07T00:00:00","gender":"male"}],"genres":[{"id":1,"name":"Mock Genre 1"},{"id":2,"name":"Mock Genre 2"}],"producer":{"id":1,"name":"Mock Producer 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},"coverImage":"XYZ.jpg"},{"id":2,"name":"Mock Movie 1","yearOfRelease":2010,"plot":"Mock Plot 1","actors":[{"id":1,"name":"Mock Actor 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},{"id":2,"name":"Mock Actor 2","bio":"Bio2","dob":"2000-03-07T00:00:00","gender":"male"}],"genres":[{"id":1,"name":"Mock Genre 1"},{"id":2,"name":"Mock Genre 2"}],"producer":{"id":1,"name":"Mock Producer 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},"coverImage":"XYZ.jpg"}]'

Scenario: Get Movie by Id
	Given I am a client
	When I make GET Request '/movies/2'
	Then response code must be '200'
	And response data must look like '{"id":2,"name":"Mock Movie 1","yearOfRelease":2010,"plot":"Mock Plot 1","actors":[{"id":1,"name":"Mock Actor 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},{"id":2,"name":"Mock Actor 2","bio":"Bio2","dob":"2000-03-07T00:00:00","gender":"male"}],"genres":[{"id":1,"name":"Mock Genre 1"},{"id":2,"name":"Mock Genre 2"}],"producer":{"id":1,"name":"Mock Producer 1","bio":"Bio1","dob":"2000-03-07T00:00:00","gender":"male"},"coverImage":"XYZ.jpg"}'

Scenario: Get Movie by Id which doesn't exists
	Given I am a client
	When I make GET Request '/movies/6'
	Then response code must be '404'

Scenario: Post Movie
	Given I am a client
	When I am making a post request to '/movies' with the following Data '{"name":"Mock Movie 1","yearOfRelease":2010,"plot":"Mock Plot 1","actorsids":"1,2","genresids":"1,2","producerid":1,"coverImage":"XYZ.jpg"}'
	Then response code must be '200'

Scenario: Update Movie
	Given I am a client
	When I am making a PUT request to '/movies/1' with the following Data '{"name":"Mock Movie 1","yearOfRelease":2010,"plot":"Mock Plot 1","actorsids":"1,2","genresids":"1,2","producerid":1,"coverImage":"XYZ.jpg"}'
	Then response code must be '200'

Scenario: Delete Movie
	Given I am a client
	When I make Delete Request '/movies/2'
	Then response code must be '200'

Scenario: Delete Movie which doesn't exists
	Given I am a client
	When I make Delete Request '/movies/7'
	Then response code must be '404'