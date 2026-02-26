public class ExecRequest
{
	// התגית הזו אומרת לשרת: "גם אם אנגולר שולח s קטנה, תכניס את זה למשתנה SpName"
	[System.Text.Json.Serialization.JsonPropertyName("spName")]
	public string SpName { get; set; }

	[System.Text.Json.Serialization.JsonPropertyName("parameters")]
	public Dictionary<string, object> Parameters { get; set; }
}