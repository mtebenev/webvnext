using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.ServerAppMvc.Web.Core;

namespace Mt.WebVNext.ServerAppMvc.Web.Pages.Companies
{
  [Authorize]
  public class IndexModel : PageModel
  {
    private readonly ICompanyDataService _companyDataService;

    public IndexModel(ICompanyDataService companyDataService)
    {
      _companyDataService = companyDataService;
    }


    public IList<CompanyDto> Companies { get; private set; }

    public async Task OnGetAsync()
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var companies = await _companyDataService
        .GetCompaniesByUserAsync(userId, TODO);

      Companies = companies.Select(c => new CompanyDto {CompanyId = c.CompanyId, Name = c.Name, Description = c.Description}).ToList();
    }
  }
}
