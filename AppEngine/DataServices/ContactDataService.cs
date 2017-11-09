using System.Threading.Tasks;
using AutoMapper;
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

    public Task<Contact[]> GetContactsAsync(int userId)
    {
      throw new System.NotImplementedException();
    }

    public Task<Contact> GetContactAsync(int contactId)
    {
      throw new System.NotImplementedException();
    }

    public async Task<Contact> CreateContactAsync(int userId, ContactDto contactDto)
    {

      var contact = _mapper.Map<Contact>(contactDto);
      _dbContext.Contacts.Add(contact);
      await _dbContext.SaveChangesAsync();

      return contact;
    }

    public Task UpdateContactAsync(ContactDto contactDto)
    {
      throw new System.NotImplementedException();
    }
  }
}
