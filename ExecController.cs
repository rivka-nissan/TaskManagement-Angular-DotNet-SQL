using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

using Microsoft.Data.SqlClient;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ExecController : ControllerBase
{
	private readonly IConfiguration _config;

	public ExecController(IConfiguration config)
	{
		_config = config;
	}

	[HttpPost]
	public async Task<IActionResult> Exec([FromBody] ExecRequest request)
	{
		using (SqlConnection conn = new SqlConnection(_config.GetConnectionString("Default")))
		using (SqlCommand cmd = new SqlCommand(request.ProcedureName, conn))
		{
			cmd.CommandType = CommandType.StoredProcedure;

			if (request.Parameters != null)
			{
				foreach (var param in request.Parameters)
				{
					cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
				}
			}

			await conn.OpenAsync();
			var reader = await cmd.ExecuteReaderAsync();
			var table = new DataTable();
			table.Load(reader);

			return Ok(table);
		}
	}
}
