CREATE OR ALTER PROCEDURE insertTodo(
    @id VARCHAR(50), 
    @title VARCHAR(50), 
    @description VARCHAR(100), 
    @date VARCHAR(50),
    @start VARCHAR(10)
    )
AS
BEGIN

INSERT INTO Todos(id,title,description,date,start)
VALUES(@id,@title,@description,@date, @start)

END
GO

CREATE PROCEDURE getTodos
AS
BEGIN

SELECT * FROM Todos
END
GO

CREATE PROCEDURE getTodo(@id VARCHAR(50))
AS
BEGIN

SELECT id, title, description, date, start FROM Todos WHERE id=@id
END
GO

CREATE PROCEDURE updateTodo(@id VARCHAR(50), @title VARCHAR(50), @description VARCHAR(100), @date VARCHAR(50), @start VARCHAR(10))
AS
BEGIN
UPDATE Todos SET title = @title, description = @description, date = @date, start = @start WHERE id=@id
END
GO

CREATE PROCEDURE updateCOMPLETE(@id VARCHAR(50), @start VARCHAR(10))
AS
BEGIN
UPDATE Todos SET start = @start WHERE id=@id
END
GO

CREATE PROCEDURE deleteTodo(@id VARCHAR(50))
AS
BEGIN
DELETE FROM Todos WHERE id = @id
END
GO
