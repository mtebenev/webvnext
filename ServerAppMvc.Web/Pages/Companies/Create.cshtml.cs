using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.ServerAppMvc.Web.Core;

namespace Mt.WebVNext.ServerAppMvc.Web.Pages.Companies
{
  /// <summary>
  /// Creates a new company
  /// </summary>
  [Authorize]
  public class CreateModel : PageModel
  {
    private readonly ICompanyDataService _companyDataService;

    public CreateModel(ICompanyDataService companyDataService)
    {
      _companyDataService = companyDataService;
    }

    [BindProperty]
    public CompanyDto Company { get; set; }

    public void OnGet()
    {

    }

    public async Task<IActionResult> OnPostAsync()
    {
      if(!ModelState.IsValid)
        return Page();

      var userId = this.GetCurrentUserId();
      await _companyDataService.CreateCompanyAsync(userId, Company);

      return Page();
    }
  }
}
