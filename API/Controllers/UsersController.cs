
using API.Data;
using API.DTOs;
using API.entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{   
    // [ApiController]
    // [Route("api/[controller]")]
    
    [Authorize]
    public class UsersController:BaseApiController
    {
        public IUserRepository _UserRepository { get; }
        public IMapper _mapper { get; }
        public UsersController(IUserRepository userRepository , IMapper mapper)
        {
            _mapper = mapper;
            _UserRepository = userRepository;

        }
       
        [HttpGet]
        public async Task <ActionResult<IEnumerable<AppUser>>>GetUsers()
        {
                 var user=await _UserRepository.GetMembersAsync();
                 return Ok(user);
        }
         
         [HttpGet("{username}")]
         public async Task <ActionResult<MemberDTO>>Getuser(string username){

           return await _UserRepository.GetMemberAsync(username);
          
           
         }
        
    }
}