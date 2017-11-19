using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using ServerApi.Core;

namespace ServerApi.Controllers
{
  [Authorize]
  [Route("api/contacts")]
  public class ContactsApiController : Controller
  {
    private readonly IContactDataService _contactDataService;

    public ContactsApiController(IContactDataService contactDataService)
    {
      _contactDataService = contactDataService;
    }

    [HttpGet]
    public async Task<ContactDto[]> GetContactsAsync()
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var contacts = await _contactDataService
        .GetContactsByUserAsync(userId);

      var result = contacts.Select(c => new ContactDto { ContactId = c.ContactId, FirstName = c.FirstName, LastName = c.LastName }).ToArray();
      return result;
    }

    [HttpPost]
    public async Task<ContactDto> CreateContactAsync([FromBody] ContactDto contactDto)
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var contact = await _contactDataService.CreateContactAsync(userId, contactDto);

      return new ContactDto
      {
        ContactId = contact.ContactId,
        FirstName = contact.FirstName,
        LastName = contact.LastName
      };
    }
  }
}
