using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mt.WebVNext.DataModel.Entities.ContactManager
{
	[Table("App_" + nameof(Contact))]
	public class Contact
	{
		[Key]
		public int ContactId { get; set; }

    public int UserId { get; set; }

		[Required, MaxLength(64)]
		public string FirstName { get; set; }

		[Required, MaxLength(64)]
		public string LastName { get; set; }

		public string Email { get; set; }
		public string Phone { get; set; }
	}
}
