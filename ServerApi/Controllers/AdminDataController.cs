using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.Utils.AspNet;
using Mt.WebVNext.AppEngine.AppServices;
using ServerApi.Core;

namespace ServerApi.Controllers
{

  [Authorize]
  [Route("api/adminData")]
  public class AdminDataController : Controller
  {
    private readonly IDataImportService _dataImportService;

    public AdminDataController(IDataImportService dataImportService)
    {
      _dataImportService = dataImportService;
    }

    [HttpPost]
    [DisableFormValueModelBinding]
    public async Task<IActionResult> PostContactDataAsync()
    {
      using(var memoryStream = new MemoryStream())
      {
        await Request.StreamFile(memoryStream);
        memoryStream.Seek(0, SeekOrigin.Begin);

        using(var streamReder = new StreamReader(memoryStream))
        {
          var userId = this.GetCurrentUserId();
          await _dataImportService.ImportContactsAsync(streamReder, userId);
        }
      }

      return Ok();
    }
  }
}
