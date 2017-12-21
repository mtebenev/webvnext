using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.Utils.AspNet;

namespace ServerApi.Controllers
{

  [Authorize]
  [Route("api/adminData")]
  public class AdminDataController : Controller
  {
    public AdminDataController()
    {
    }

    [HttpPost]
    [DisableFormValueModelBinding]
    public async Task<IActionResult> PostContactDataAsync()
    {
      byte[] fileBytes;
      using(var memoryStream = new MemoryStream())
      {
        var formValueProvider = await Request.StreamFile(memoryStream);
        fileBytes = memoryStream.ToArray();
      }

      return Ok();
    }
  }
}
