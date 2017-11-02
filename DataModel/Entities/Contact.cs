using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mt.WebVNext.DataModel.Entities
{
	[Table("App" + nameof(Contact))]
	public class Contact
	{
		[Key]
		public int ContactId { get; set; }

		[Required, MaxLength(64)]
		public string FirstName { get; set; }

		[Required, MaxLength(64)]
		public string LastName { get; set; }

		public string Email { get; set; }
		public string Phone { get; set; }
	}
}
