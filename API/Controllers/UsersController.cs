
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.entities;
using API.EXtensions;
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
        public IPhotoService _photoService { get; }
        public UsersController(IUserRepository userRepository , IMapper mapper ,IPhotoService photoService)
        {
           _photoService = photoService;
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
         [HttpPut]
         public async Task <ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            // var username=User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user=await _UserRepository.GetUserByUsernameAsync(User.GetUsername());
            if(user==null) return NotFound();

            _mapper.Map(memberUpdateDTO,user);

            if(await _UserRepository.SaveAllAsync()) return NoContent();

            return BadRequest("failed to update user");
        }

        [HttpPost("add-photo")]

        public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file){
            var user=await _UserRepository.GetUserByUsernameAsync(User.GetUsername());
            if(user==null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error!=null) return BadRequest(result.Error.Message);

            var photo=new Photo{
                Url=result.SecureUrl.AbsoluteUri,
                PublicId=result.PublicId
            };

            if(user.Photos.Count==0) photo.IsMain=true;

            user.Photos.Add(photo);

            if(await _UserRepository.SaveAllAsync())
            {
                 return CreatedAtAction(nameof(GetUsers),
                 new{username=user.UserName}, _mapper.Map<PhotoDTO>(photo)) ;
            }

            return BadRequest("problem Adding photos");
        }

        [HttpPut("set-main-photo/{photoId}")]
         public async Task <ActionResult> SetMainPhoto(int photoId){
             var user=await _UserRepository.GetUserByUsernameAsync(User.GetUsername());

             if(user==null) return NotFound();

             var photo=user.Photos.FirstOrDefault(x=>x.Id==photoId);

            if(photo==null) return NotFound();

            if(photo.IsMain) return BadRequest("this photo is already your main photo");

            var currentMain=user.Photos.FirstOrDefault(x=>x.IsMain);

            if(currentMain!=null) currentMain.IsMain=false;

            photo.IsMain=true;

            if(await _UserRepository.SaveAllAsync()) return NoContent();

            return BadRequest("problem setting the main photo");
         }
         [HttpDelete("delete-photo/{photoId}")]
         
         public async Task <ActionResult>DeletePhoto(int photoId){
            var user=await _UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo=user.Photos.FirstOrDefault(x=>x.Id==photoId);

            if(photo==null) return NotFound();

            if(photo.IsMain) return BadRequest("you can not delete this photo");

            if(photo.PublicId!=null)
            {
                var result=await _photoService.DeletePhotoAsync(photo.PublicId);

                if(result.Error!=null) return BadRequest(result.Error.Message);
            }
            user.Photos.Remove(photo);

            if(await _UserRepository.SaveAllAsync()) return Ok();
            return BadRequest("problem deleting photo");
         }
}
}