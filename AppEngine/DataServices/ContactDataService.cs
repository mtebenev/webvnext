using System.Threading.Tasks;
using Mt.WebVNext.DataModel;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.WebVNext.AppEngine.DataServices
{
  public class ContactDataService : IContactDataService
  {
    private readonly AppDataContext _dbContext;

    public ContactDataService(AppDataContext dbContext)
    {
      _dbContext = dbContext;
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
      var contact = new Contact
      {
        FirstName = contactDto.FirstName,
        LastName = contactDto.LastName
      };

      _dbContext.Contacts.Add(contact);
      await _dbContext.SaveChangesAsync();

        /*
      Contact result;
      using(var unitOfWork = _dcFactory.CreateUnitOfWork())
      {
        var dbSetContact = unitOfWork.GetSet<Contact>();
        result = new Contact();

        Mapper.Map(contactDto, result);
        result.UserId = userId;

        dbSetContact.Add(result);
        await unitOfWork.CommitAsync();
      }
      */

      return contact;
    }

    public Task UpdateContactAsync(ContactDto contactDto)
    {
      throw new System.NotImplementedException();
    }
  }
}
