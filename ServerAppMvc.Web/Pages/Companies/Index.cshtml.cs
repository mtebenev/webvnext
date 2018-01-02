using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;
using Mt.WebVNext.ServerAppMvc.Web.Core;
using Mt.WebVNext.ServerAppMvc.Web.Models;

namespace Mt.WebVNext.ServerAppMvc.Web.Pages.Companies
{
  [Authorize]
  public class IndexModel : PageModel
  {
    private readonly ICompanyDataService _companyDataService;
    private readonly IMapper _mapper;
    private const int PageSize = 10;

    public IndexModel(ICompanyDataService companyDataService, IMapper mapper)
    {
      _companyDataService = companyDataService;
      _mapper = mapper;
    }
    
    public PaginatedListModel<CompanyDto> Companies { get; private set; }

    public async Task OnGetAsync(int? pageNumber)
    {
      var userId = this.GetCurrentUserId();
      CompanyQueryParamsDto queryParams = new CompanyQueryParamsDto
      {
        PageNumber = pageNumber ?? 0,
        PageSize = PageSize
      };

      var companies = await _companyDataService
        .GetCompaniesByUserAsync(userId, queryParams);

      var result = companies.Project<Company, CompanyDto>(_mapper.ConfigurationProvider);
      Companies = new PaginatedListModel<CompanyDto>(result);
    }
  }
}
