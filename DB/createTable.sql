CREATE TABLE Todos(
    id varchar(50) PRIMARY KEY,
    title varchar(100),
    description varchar(250),
    date varchar(50),
    start varchar(10) DEFAULT 'start'
)
Go
