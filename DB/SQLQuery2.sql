
-- יצירת מסד נתונים
CREATE DATABASE TaskManagement;
GO

GO
DROP DATABASE TaskManagement;
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

-- טבלת משימות
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

-- הוספת נתונים
INSERT INTO Statuses (Name) VALUES (N'חדש');
INSERT INTO Statuses (Name) VALUES (N'בתהליך');
INSERT INTO Statuses (Name) VALUES (N'הושלם');
GO

INSERT INTO Categories (Name) VALUES (N'עבודה');
INSERT INTO Categories (Name) VALUES (N'אישי');
INSERT INTO Categories (Name) VALUES (N'דחוף');
GO

-- Stored Procedures
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
    SET Title = @Title, Description = @Description, StatusId = @StatusId, CategoryId = @CategoryId, DueDate = @DueDate
    WHERE Id = @Id;
END;
GO

CREATE PROCEDURE Tasks_GetById
    @Id INT
AS
BEGIN
    SELECT t.Id, t.Title, t.Description, t.CreatedAt, t.DueDate,
           s.Name AS StatusName, c.Name AS CategoryName
    FROM Tasks t
    JOIN Statuses s ON t.StatusId = s.Id
    JOIN Categories c ON t.CategoryId = c.Id
    WHERE t.Id = @Id;
END;
GO

CREATE PROCEDURE Tasks_GetAll
AS
BEGIN
    SELECT t.Id, t.Title, t.Description, t.CreatedAt, t.DueDate,
           s.Name AS StatusName, c.Name AS CategoryName
    FROM Tasks t
    JOIN Statuses s ON t.StatusId = s.Id
    JOIN Categories c ON t.CategoryId = c.Id;
END;
GO

CREATE PROCEDURE Tasks_Delete
    @Id INT
AS
BEGIN
    DELETE FROM Tasks WHERE Id = @Id;
END;
GO

CREATE PROCEDURE Statuses_GetAll
AS
BEGIN
    SELECT Id, Name FROM Statuses;
END;
GO

CREATE PROCEDURE Categories_GetAll
AS
BEGIN
    SELECT Id, Name FROM Categories;
END;
GO
