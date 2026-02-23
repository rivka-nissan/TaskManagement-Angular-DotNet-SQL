
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


INSERT INTO Statuses (Name) VALUES (N'חדש');
INSERT INTO Statuses (Name) VALUES (N'בתהליך');
INSERT INTO Statuses (Name) VALUES (N'הושלם');
GO


INSERT INTO Categories (Name) VALUES (N'עבודה');
INSERT INTO Categories (Name) VALUES (N'אישי');
INSERT INTO Categories (Name) VALUES (N'לימודים');
GO
