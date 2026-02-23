
CREATE PROCEDURE Tasks_GetByIdWithIds
    @Id INT
AS
BEGIN
    SELECT t.Id, t.Title, t.Description, t.StatusId, t.CategoryId, t.CreatedAt, t.DueDate,
           s.Name AS StatusName,
           c.Name AS CategoryName
    FROM Tasks t
    JOIN Statuses s ON t.StatusId = s.Id
    JOIN Categories c ON t.CategoryId = c.Id
    WHERE t.Id = @Id;
END;
GO
