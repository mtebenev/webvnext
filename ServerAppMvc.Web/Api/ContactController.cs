using Microsoft.AspNetCore.Mvc;

namespace Mt.WebVNext.ServerAppMvc.Web.Api
{
  [Route("api/[controller]")]
  public class ContactController : Controller
  {
    [HttpGet]
    public object GetContacts()
    {
      return new JsonResult(new {a = 1, b = 2});
    }
  }
}
