using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class ExecController : ControllerBase
{
	[HttpPost]
	public IActionResult Execute([FromBody] ExecRequest request)
	{
		if (request == null || string.IsNullOrEmpty(request.SpName))
			return BadRequest("Request or Procedure Name is null");

		string connString = "Server=MININT-OUNN1FJ\\SQLEXPRESS;Database=TaskManagement;Trusted_Connection=True;TrustServerCertificate=True;";

		try
		{
			using (SqlConnection conn = new SqlConnection(connString))
			{
				SqlCommand cmd = new SqlCommand(request.SpName, conn);
				cmd.CommandType = CommandType.StoredProcedure;

				if (request.Parameters != null)
				{
					foreach (var param in request.Parameters)
					{
						string pName = param.Key.StartsWith("@") ? param.Key : "@" + param.Key;

	
						object pValue = param.Value;
						if (pValue is System.Text.Json.JsonElement element)
						{
							
							pValue = element.ValueKind == System.Text.Json.JsonValueKind.String ? element.GetString() : element.GetRawText();
						}

						cmd.Parameters.AddWithValue(pName, pValue ?? DBNull.Value);
					}
				}

				conn.Open();
				DataTable dt = new DataTable();
				using (SqlDataAdapter da = new SqlDataAdapter(cmd)) { da.Fill(dt); }

				// התיקון הקריטי: הופכים את ה-DataTable לרשימה פשוטה שה-JSON יכול לעכל
				var rows = new List<Dictionary<string, object>>();
				foreach (DataRow dr in dt.Rows)
				{
					var row = new Dictionary<string, object>();
					foreach (DataColumn col in dt.Columns)
					{
						row[col.ColumnName] = dr[col];
					}
					rows.Add(row);
				}

				return Ok(rows); // 
			}
		}
		catch (Exception ex)
		{
			return StatusCode(500, new { error = ex.Message });
		}
	}
}
