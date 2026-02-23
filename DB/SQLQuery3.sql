-- יצירת מסד נתונים
CREATE DATABASE TaskManagement;
GO
USE TaskManagement;
GO

-- טבלת סטטוסים
CREATE TABLE Statuses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

-- טבלת קטגוריות
CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

-- טבלת משימות עם קשרים לטבלאות סטטוס וקטגוריה
CREATE TABLE Tasks (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    StatusId INT NOT NULL,
    CategoryId INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    DueDate DATETIME NULL,
    CONSTRAINT FK_Tasks_Statuses FOREIGN KEY (StatusId) REFERENCES Statuses(Id),
    CONSTRAINT FK_Tasks_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);
GO

-- Stored Procedure להוספת משימה
CREATE PROCEDURE Tasks_Create
    @Title NVARCHAR(100),
    @Description NVARCHAR(MAX),
    @StatusId INT,
    @CategoryId INT,
    @DueDate DATETIME = NULL
AS
BEGIN
    INSERT INTO Tasks (Title, Description, StatusId, CategoryId, DueDate)
    VALUES (@Title, @Description, @StatusId, @CategoryId, @DueDate);

    SELECT SCOPE_IDENTITY() AS NewTaskId;
END;
GO

-- Stored Procedure לעדכון משימה
CREATE PROCEDURE Tasks_Update
    @Id INT,
    @Title NVARCHAR(100),
    @Description NVARCHAR(MAX),
    @StatusId INT,
    @CategoryId INT,
    @DueDate DATETIME = NULL
AS
BEGIN
    UPDATE Tasks
    SET Title = @Title,
        Description = @Description,
        StatusId = @StatusId,
        CategoryId = @CategoryId,
        DueDate = @DueDate
    WHERE Id = @Id;
END;
GO

-- Stored Procedure לשליפת משימה לפי מזהה
CREATE PROCEDURE Tasks_GetById
    @Id INT
AS
BEGIN
    SELECT t.Id, t.Title, t.Description, t.CreatedAt, t.DueDate,
           s.Name AS StatusName,
           c.Name AS CategoryName
    FROM Tasks t
    JOIN Statuses s ON t.StatusId = s.Id
    JOIN Categories c ON t.CategoryId = c.Id
    WHERE t.Id = @Id;
END;
GO

-- Stored Procedure לשליפת כל המשימות
CREATE PROCEDURE Tasks_GetAll
AS
BEGIN
    SELECT t.Id, t.Title, t.Description, t.CreatedAt, t.DueDate,
           s.Name AS StatusName,
           c.Name AS CategoryName
    FROM Tasks t
    JOIN Statuses s ON t.StatusId = s.Id
    JOIN Categories c ON t.CategoryId = c.Id;
END;
GO

-- Stored Procedure למחיקת משימה
CREATE PROCEDURE Tasks_Delete
    @Id INT
AS
BEGIN
    DELETE FROM Tasks WHERE Id = @Id;
END;
GO
