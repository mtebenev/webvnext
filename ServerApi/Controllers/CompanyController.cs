using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;
using ServerApi.Core;

namespace ServerApi.Controllers
{
  [Authorize]
  [Route("api/companies")]
  public class CompaniesApiController : Controller
  {
    private readonly ICompanyDataService _companyDataService;
    private readonly IMapper _mapper;

    public CompaniesApiController(ICompanyDataService companyDataService, IMapper mapper)
    {
      _companyDataService = companyDataService;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<PagedResult<CompanyDto>> GetCompaniesAsync(CompanyQueryParamsDto queryParams)
    {
      var userId = this.GetCurrentUserId();
      var companies = await _companyDataService
        .GetCompaniesByUserAsync(userId, queryParams);

      var result = companies.Project<Company, CompanyDto>(_mapper.ConfigurationProvider);
      return result;
    }

    [HttpGet("{companyId}")]
    public async Task<CompanyDto> GetCompanyAsync(int companyId)
    {
      var company = await _companyDataService
        .GetCompanyAsync(companyId);

      var result = _mapper.Map<CompanyDto>(company);
      return result;
    }

    [HttpPost]
    public async Task<CompanyDto> CreateCompanyAsync([FromBody] CompanyDto companyDto)
    {
      var userId = this.GetCurrentUserId();
      var company = await _companyDataService.CreateCompanyAsync(userId, companyDto);

      var result = _mapper.Map<CompanyDto>(company);
      return result;
    }

    [HttpPut]
    public async Task UpdateCompanyAsync([FromBody] CompanyDto companyDto)
    {
      await _companyDataService.UpdateCompanyAsync(companyDto);
    }

    [HttpDelete]
    public async Task DeleteCompany(int companyId)
    {
      await _companyDataService.DeleteCompanyAsync(companyId);
    }

  }
}
