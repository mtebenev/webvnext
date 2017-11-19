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
    public async Task<CompanyDto[]> GetCompaniesAsync()
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var companies = await _companyDataService
        .GetCompaniesByUserAsync(userId);

      var result = companies.Select(c => new CompanyDto { CompanyId = c.CompanyId, Name = c.Name, Description = c.Description }).ToArray();
      return result;
    }

    [HttpGet("{companyId}")]
    public async Task<CompanyDto> GetCompanyAsync(int companyId)
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var company = await _companyDataService
        .GetCompanyAsync(companyId);

      var result = new CompanyDto { CompanyId = company.CompanyId, Name = company.Name, Description = company.Description };
      return result;
    }

    [HttpPost]
    public async Task<CompanyDto> CreateCompanyAsync([FromBody] CompanyDto companyDto)
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      var company = await _companyDataService.CreateCompanyAsync(userId, companyDto);

      return new CompanyDto
      {
        CompanyId = company.CompanyId,
        Name = company.Name,
        Description = company.Description
      };
    }

    [HttpPut]
    public async Task UpdateCompanyAsync([FromBody] CompanyDto companyDto)
    {
      await _companyDataService.UpdateCompanyAsync(companyDto);
    }

    [HttpDelete]
    public async Task DeleteCompany(int companyId)
    {
      // TODO: use automapper
      var userId = this.GetCurrentUserId();
      await _companyDataService.DeleteCompanyAsync(companyId);
    }

  }
}
