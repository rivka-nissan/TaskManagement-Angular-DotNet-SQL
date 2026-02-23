# TaskManagement-Angular-DotNet-SQL
Full Stack Task Management System using Angular, .NET Web API and SQL Server Stored Procedures
# מערכת ניהול משימות

## 1. נושא הפרויקט
מערכת לניהול משימות עם אפשרות ליצירה, עריכה, צפייה ומחיקה של משימות.
המערכת מאפשרת ארגון משימות לפי סטטוס וקטגוריה, עם מעקב אחר תאריכי יצירה ויעד.

## 2. תיאור הטבלאות והקשרים

### טבלאות:

**Tasks (טבלה ראשית)**
- Id - מזהה ייחודי (מפתח ראשי)
- Title - כותרת המשימה
- Description - תיאור המשימה
- StatusId - מזהה סטטוס (מפתח זר ל-Statuses)
- CategoryId - מזהה קטגוריה (מפתח זר ל-Categories)
- CreatedAt - תאריך יצירה
- DueDate - תאריך יעד

**Statuses (טבלת סטטוסים)**
- Id - מזהה ייחודי (מפתח ראשי)
- Name - שם הסטטוס (חדש, בתהליך, הושלם)

**Categories (טבלת קטגוריות)**
- Id - מזהה ייחודי (מפתח ראשי)
- Name - שם הקטגוריה (עבודה, אישי, דחוף)

### קשרים:
- Tasks.StatusId → Statuses.Id (Foreign Key)
- Tasks.CategoryId → Categories.Id (Foreign Key)

## 3. רשימת Stored Procedures

1. **Tasks_Create** - יצירת משימה חדשה
2. **Tasks_Update** - עדכון משימה קיימת
3. **Tasks_GetById** - שליפת משימה לפי מזהה (כולל JOIN לשמות ידידותיים)
4. **Tasks_GetAll** - שליפת כל המשימות (כולל JOIN)
5. **Tasks_Delete** - מחיקת משימה
6. **Statuses_GetAll** - שליפת כל הסטטוסים
7. **Categories_GetAll** - שליפת כל הקטגוריות

## 4. הרצת הפרויקט

### מסד נתונים:
1. פתח SQL Server Management Studio
2. התחבר לשרת: `MININT-OUNN1FJ\SQLEXPRESS`
3. הרץ את הסקריפט ליצירת מסד הנתונים והטבלאות
4. הרץ את כל ה-Stored Procedures
5. הרץ את additional-procedures.sql להוספת נתוני דוגמה

### צד שרת (.NET API):
1. פתח את הפרויקט ב-Visual Studio
2. ודא שמחרוזת החיבור ב-appsettings.json נכונה:
   ```
   Server=MININT-OUNN1FJ\\SQLEXPRESS;Database=TaskManagement;Integrated Security=True;TrustServerCertificate=True;Encrypt=False;
   ```
3. הרץ את הפרויקט (F5)
4. ה-API ירוץ על: http://localhost:5258

### צד לקוח (Angular):
1. פתח terminal בתיקיית client
2. הרץ: `npm install` (פעם ראשונה בלבד)
3. הרץ: `ng serve`
4. פתח דפדפן בכתובת: http://localhost:4200

## מסכים במערכת

1. **מסך רשימה** (/tasks) - הצגת כל המשימות עם חיפוש וכפתורי פעולה
2. **מסך יצירה/עריכה** (/tasks/new, /tasks/edit/:id) - טופס Reactive Forms
3. **מסך פרטים** (/tasks/:id) - הצגת כל פרטי המשימה

