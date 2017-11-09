using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ServerApi.Controllers
{
  [Authorize]
  [Route("api/contacts")]
  public class ContactsApiController : Controller
  {
    [HttpGet]
    public object GetContacts()
    {
      return new JsonResult(new {a = 1, b = 2});
    }
  }
}
