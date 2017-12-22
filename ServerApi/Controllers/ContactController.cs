using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;
using ServerApi.Core;

namespace ServerApi.Controllers
{
  [Authorize]
  [Route("api/contacts")]
  public class ContactsApiController : Controller
  {
    private readonly IContactDataService _contactDataService;
    private readonly IMapper _mapper;

    public ContactsApiController(IContactDataService contactDataService, IMapper mapper)
    {
      _contactDataService = contactDataService;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<PagedResult<ContactDto>> GetContactsAsync(ContactQueryParamsDto queryParams)
    {
      var userId = this.GetCurrentUserId();
      var contacts = await _contactDataService
        .GetContactsByUserAsync(userId, queryParams);

      var result = contacts.Project<Contact, ContactDto>(_mapper.ConfigurationProvider);
      return result;
    }

    [HttpGet("{contactId}")]
    public async Task<ContactDto> GetContactAsync(int contactId)
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var contact = await _contactDataService
        .GetContactAsync(contactId);

      var result = new ContactDto {ContactId = contact.ContactId, FirstName = contact.FirstName, LastName = contact.LastName};
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

    [HttpPut]
    public async Task UpdateContactAsync([FromBody] ContactDto contactDto)
    {
      await _contactDataService.UpdateContactAsync(contactDto);
    }

    [HttpDelete]
    public async Task DeleteContactAsync(int contactId)
    {
      // TODO: use automapper
      await _contactDataService.DeleteContactAsync(contactId);
    }
  }
}
