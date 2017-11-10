using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using ServerApi.Core;

namespace ServerApi.Controllers
{
  [Authorize]
  [Route("api/companies")]
  public class CompaniesApiController : Controller
  {
    private readonly ICompanyDataService _companyDataService;

    public CompaniesApiController(ICompanyDataService companyDataService)
    {
      _companyDataService = companyDataService;
    }

    [HttpGet]
    public async Task<CompanyDto[]> GetCompanies()
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var companies = await _companyDataService
        .GetCompaniesByUserAsync(userId);

      var result = companies.Select(c => new CompanyDto {CompanyId = c.CompanyId, Name = c.Name, Description = c.Description}).ToArray();
      return result;
    }
  }
}
