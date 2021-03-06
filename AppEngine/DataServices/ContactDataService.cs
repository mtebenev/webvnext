using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Mt.WebVNext.DataModel;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.WebVNext.AppEngine.DataServices
{
  public class ContactDataService : IContactDataService
  {
    private readonly AppDataContext _dbContext;
    private readonly IMapper _mapper;

    public ContactDataService(AppDataContext dbContext, IMapper mapper)
    {
      _dbContext = dbContext;
      _mapper = mapper;
    }

    public async Task<PagedResult<Contact>> GetContactsByUserAsync(int userId, ContactQueryParamsDto queryParams)
    {
      var contactsQuery = _dbContext.Contacts
        .Where(c => c.UserId == userId);

      if(!string.IsNullOrWhiteSpace(queryParams.FilterText))
        contactsQuery = contactsQuery.Where(c => c.FirstName.Contains(queryParams.FilterText) || c.LastName.Contains(queryParams.FilterText));

      return await contactsQuery
        .AsNoTracking()
        .GetPagedAsync(queryParams.PageNumber, queryParams.PageSize);
    }

    public Task<Contact> GetContactAsync(int contactId)
    {
      return _dbContext.Contacts.FindAsync(contactId);
    }

    public async Task<Contact> CreateContactAsync(int userId, ContactDto contactDto)
    {

      var contact = _mapper.Map<Contact>(contactDto);
      contact.UserId = userId;
      _dbContext.Contacts.Add(contact);
      await _dbContext.SaveChangesAsync();

      return contact;
    }

    public async Task UpdateContactAsync(ContactDto contactDto)
    {
      var contact = await _dbContext.Contacts.FindAsync(contactDto.ContactId);
      contact.FirstName = contactDto.FirstName;
      contact.LastName = contactDto.LastName;
      contact.CompanyId = contactDto.CompanyId;

      await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteContactAsync(int contactId)
    {
      var contact = await _dbContext.Contacts.FindAsync(contactId);
      _dbContext.Contacts.Remove(contact);

      await _dbContext.SaveChangesAsync();
    }
  }
}
