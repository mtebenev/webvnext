using System.Threading.Tasks;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.WebVNext.AppEngine.DataServices
{
  public interface IContactDataService
  {
    /// <summary>
    /// Get existing contacts for specified user
    /// </summary>
    Task<Contact[]> GetContactsByUserAsync(int userId);

    /// <summary>
    /// Get specific contact
    /// </summary>
    Task<Contact> GetContactAsync(int contactId);

    /// <summary>
    /// Creates a new contact for specific user
    /// </summary>
    Task<Contact> CreateContactAsync(int userId, ContactDto contactDto);

    /// <summary>
    /// Creates a new contact for specific user
    /// </summary>
    Task UpdateContactAsync(ContactDto contactDto);
  }
}
