DROP DATABASE IMDBAPI;

CREATE DATABASE IMDBAPI;
USE IMDBAPI;

CREATE TABLE Actors (
Id INT PRIMARY KEY IDENTITY(1,1), 
Name VARCHAR(100), 
Gender VARCHAR(MAX), 
DOB Date, 
Bio VARCHAR(MAX));

CREATE TABLE Producers (
Id INT PRIMARY KEY IDENTITY(1,1), 
Name VARCHAR(100), 
Gender VARCHAR(10), 
DOB Date, 
Bio VARCHAR(MAX));

CREATE TABLE Genres (
Id INT PRIMARY KEY IDENTITY(1,1), 
Name VARCHAR(100));

CREATE TABLE Movies (
Id INT PRIMARY KEY IDENTITY(1,1), 
Name VARCHAR(100), 
YearOfRelease INT, 
Plot VARCHAR(MAX), 
CoverImage VARCHAR(MAX),
ProducerId INT FOREIGN KEY REFERENCES Producers(Id));

--DROP TABLE Reviews;

CREATE TABLE Reviews(
Id INT PRIMARY KEY IDENTITY(1,1), 
MovieId INT FOREIGN KEY REFERENCES Movies(Id), 
Comment NVARCHAR(MAX));

CREATE TABLE MovieActorMapping(
Id INT PRIMARY KEY IDENTITY(1,1),
MovieId INT FOREIGN KEY REFERENCES Movies(Id), 
ActorId INT FOREIGN KEY REFERENCES Actors(Id));

CREATE TABLE MovieGenreMapping(
Id INT PRIMARY KEY IDENTITY(1,1),
MovieId INT FOREIGN KEY REFERENCES Movies(Id), 
GenreId INT FOREIGN KEY REFERENCES Genres(Id));

INSERT INTO Actors values ('Actor1','Male','1999/12/10','Hero');
INSERT INTO Actors values ('Actor2','Female','1999/12/11','Comedian');
INSERT INTO Actors values ('Actor3','Male','1999/12/12','Villian');

INSERT INTO Producers values ('Producer1','Male','1999/12/11','Bio1');
INSERT INTO Producers values ('Producer2','Female','1999/12/12','Bio2');
INSERT INTO Producers values ('Producer3','Male','1999/12/13','Bio3');

INSERT INTO Genres values ('Genre1');
INSERT INTO Genres values ('Genre2');
INSERT INTO Genres values ('Genre3');

INSERT INTO Movies values ('Movie1','2010','Plot1','Image1.jpg',1);
INSERT INTO Movies values ('Movie2','2011','Plot2','Image2.png',2);
INSERT INTO Movies values ('Movie3','2012','Plot3','Image3.jpeg',3);

INSERT INTO MovieActorMapping values (1,1);
INSERT INTO MovieActorMapping values (1,2);
INSERT INTO MovieActorMapping values (2,2);
INSERT INTO MovieActorMapping values (2,3);
INSERT INTO MovieActorMapping values (3,1);
INSERT INTO MovieActorMapping values (3,3);

INSERT INTO MovieGenreMapping values (1,1);
INSERT INTO MovieGenreMapping values (1,2);
INSERT INTO MovieGenreMapping values (2,2);
INSERT INTO MovieGenreMapping values (2,3);
INSERT INTO MovieGenreMapping values (3,1);
INSERT INTO MovieGenreMapping values (3,3);

INSERT INTO Reviews values (1,'Good');
INSERT INTO Reviews values (2,'Flop');
INSERT INTO Reviews values (2,'Great');
INSERT INTO Reviews values (3,'Great');
INSERT INTO Reviews values (3,'Good');

GO
CREATE PROCEDURE Add_Movie @Name VARCHAR(100),@YearOfRelease int, @Plot VARCHAR(MAX), @ProducerId int, @ActorsIds VARCHAR(MAX), @GenresIds VARCHAR(MAX),@CoverImage VARCHAR(MAX)
AS
	INSERT INTO Movies 
	VALUES(@Name,@YearOfRelease,@Plot,@CoverImage,@ProducerId)

	DECLARE @Id INT = SCOPE_IDENTITY();

    INSERT INTO MovieActorMapping
    SELECT @Id [MovieId], [value] [ActorId]
    FROM string_split(@ActorsIds, ',');

    INSERT INTO MovieGenreMapping
    SELECT @Id [MovieId], [value] [GenreId]
    FROM string_split(@GenresIds, ',');
GO


--Drop Procedure dbo.Update_Movie;
GO
CREATE PROCEDURE Update_Movie @Id int, @Name VARCHAR(100),@YearOfRelease int, @Plot VARCHAR(MAX), @ProducerId int, @ActorsIds VARCHAR(MAX), @GenresIds VARCHAR(MAX),@CoverImage VARCHAR(MAX)
AS
    DELETE FROM MovieActorMapping
	WHERE MovieId = @Id;

    DELETE FROM MovieGenreMapping
	WHERE MovieId = @Id;

    INSERT INTO MovieActorMapping
    SELECT @Id [MovieId], [value] [ActorId]
    FROM string_split(@ActorsIds, ',')

    INSERT INTO MovieGenreMapping
    SELECT @Id [MovieId], [value] [GenreId]
    FROM string_split(@GenresIds, ',')

	UPDATE Movies 
	SET Name = @Name,
	YearOfRelease = @YearOfRelease, 
	Plot = @Plot, 
	ProducerId = @ProducerId, 
	CoverImage = @CoverImage 
	WHERE Id = @Id;
GO

CREATE PROCEDURE Delete_Producer @ProducerId int
AS
BEGIN
Declare @MovieId int
DECLARE MovieIds CURSOR FOR 
        SELECT Id 
        FROM Movies 
        WHERE ProducerId = @ProducerId
OPEN MovieIds
FETCH NEXT FROM MovieIds INTO @MovieId
WHILE @@FETCH_STATUS = 0
BEGIN
	  DELETE FROM MovieActorMapping WHERE MovieId = @MovieId;
      DELETE FROM MovieGenreMapping WHERE MovieId = @MovieId;
      DELETE FROM Reviews WHERE MovieId = @MovieId;
      DELETE FROM Movies WHERE Id = @MovieId;
      FETCH NEXT FROM MovieIds INTO @MovieId 
END 

CLOSE MovieIds
    DELETE FROM Producers WHERE Id = @ProducerId
END
GO

Drop Procedure dbo.Delete_Producer;
