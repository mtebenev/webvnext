using AutoMapper;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.Psyworks.AppEngine.AutoMapperConfig
{
  public class DtoProfile: Profile
	{
    public DtoProfile()
    {
      CreateMap<Contact, ContactDto>().ReverseMap();
    }
	}
}
