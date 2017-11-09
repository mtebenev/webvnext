using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Mt.WebVNext.DataModel;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.WebVNext.AppEngine.DataServices
{
  public class CompanyDataService : ICompanyDataService
  {
    private readonly AppDataContext _dbContext;
    private readonly IMapper _mapper;

    public CompanyDataService(AppDataContext dbContext, IMapper mapper)
    {
      _dbContext = dbContext;
      _mapper = mapper;
    }

    public async Task<Company> CreateCompanyAsync(int userId, CompanyDto companyDto)
    {
      var company = _mapper.Map<Company>(companyDto);
      company.UserId = userId;
      _dbContext.Companies.Add(company);
      await _dbContext.SaveChangesAsync();

      return company;
    }

    public async Task<IList<Company>> GetCompaniesByUserAsync(int userId)
    {
      return await _dbContext.Companies
        .Where(c => c.UserId == userId)
        .AsNoTracking()
        .ToListAsync();
    }
  }
}
