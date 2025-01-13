using Application.Activities;
using Application.Comments;
using Application.Profiles;
using Domain;
using Profile = AutoMapper.Profile;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).AppUser.UserName));

        CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Icon, o => o.MapFrom(s => s.AppUser.Icon));

        CreateMap<AppUser, Profiles.Profile>();

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Icon, o => o.MapFrom(s => s.Author.Icon));

        CreateMap<ActivityAttendee, UserActivityDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.ActivityId))
            .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
            .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
            .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
            .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
                s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
    }
}