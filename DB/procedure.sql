CREATE OR ALTER PROCEDURE insertUser(
    @id VARCHAR(50), 
    @title VARCHAR(50), 
    @description VARCHAR(100), 
    @date VARCHAR(50)
    )
AS
BEGIN

INSERT INTO Users(id,title,description,date)
VALUES(@id,@title,@description,@date)

END
GO

CREATE PROCEDURE getUsers
AS
BEGIN

SELECT id, title, description, date FROM Users
END
GO

CREATE PROCEDURE getSingleUser(@id VARCHAR(50))
AS
BEGIN

SELECT id, title, description, date FROM Users WHERE id=@id
END
GO

CREATE PROCEDURE updateUser(@id VARCHAR(50), @title VARCHAR(50), @description VARCHAR(100), @date VARCHAR(50))
AS
BEGIN
UPDATE Users SET title = @title, description = @description, date = @date WHERE id=@id
END
GO

CREATE PROCEDURE deleteUser(@id VARCHAR(50))
AS
BEGIN
DELETE FROM Users WHERE id = @id
END
GO
