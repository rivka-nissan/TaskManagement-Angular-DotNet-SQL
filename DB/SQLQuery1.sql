USE TaskManagement;
GO

INSERT INTO Statuses (Name)
VALUES
('חדש'),
('בתהליך'),
('הושלם');

INSERT INTO Categories (Name)
VALUES
('לימודים'),
('עבודה'),
('אישי');
SELECT * FROM Statuses;
SELECT * FROM Categories;