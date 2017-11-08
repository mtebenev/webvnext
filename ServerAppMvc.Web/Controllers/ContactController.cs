using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;

namespace Mt.WebVNext.ServerAppMvc.Web.Controllers
{
  public class ContactController : Controller
  {
    private readonly IContactDataService _contactDataService;

    public ContactController(IContactDataService contactDataService)
    {
      _contactDataService = contactDataService;
    }

    public IActionResult Index()
    {
      return View();
    }

    public IActionResult NewContact()
    {
      return View();
    }

    [HttpPost]
    public async Task<IActionResult> NewContact(ContactDto contactDto)
    {

      await _contactDataService.CreateContactAsync(1, contactDto);
      return View();
    }
  }
}
