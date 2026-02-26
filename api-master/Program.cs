var builder = WebApplication.CreateBuilder(args);

// הוספת שירותים למכולה (Container)
builder.Services.AddControllers();

// הגדרת CORS - מאפשר לאנגולר (פורט 4200) לגשת לשרת
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", policy =>
	{
		policy.AllowAnyOrigin()
			  .AllowAnyMethod()
			  .AllowAnyHeader();
	});
});

var app = builder.Build();

// --- חשוב: סדר ה-Middleware ---

// 1. קודם כל CORS - כדי שהדפדפן יאשר את הבקשה
app.UseCors("AllowAll");

// 2. ניתוב (Routing)
app.UseRouting();

// 3. אופציונלי: הרשאות (אם תוסיפי בעתיד)
// app.UseAuthorization();

// 4. מיפוי ה-Controllers
app.MapControllers();

app.Run();