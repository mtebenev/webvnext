using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mt.WebVNext.DataModel.Entities
{
	[Table("App" + nameof(Company))]
	public class Company
	{
		[Key]
		public int CompanyId { get; set; }

		[Required, MaxLength(64)]
		public string Name { get; set; }
		public string Description { get; set; }
	}
}
