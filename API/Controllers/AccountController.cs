using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context , ITokenService tokenService)
        {
            _context = context;
             _tokenService = tokenService;
        }
        [HttpPost("register")]

        public async Task<ActionResult<UserDTO>> Register(RegisterDto registerDTO)
        {
            
            if (await UserExist(registerDTO.Username)) 
    {
        if(string.IsNullOrWhiteSpace(registerDTO.Username)){
            return BadRequest("Please enter a username");
        }
        return BadRequest("Username is taken");
        
    }

    using var hmac = new HMACSHA512();

    // Generate a unique salt for the user
  // var salt = Encoding.UTF8.GetBytes($"{registerDTO.Username}:{Guid.NewGuid()}");

    var user = new AppUser
    {
        UserName = registerDTO.Username.ToLower(),
        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
        PasswordSalt = hmac.Key
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return new UserDTO{
        Username=user.UserName,
        Token = _tokenService.CreateToken(user)
    };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == loginDTO.Username);
                
            // if (user == null) return Unauthorized();

              if (user == null) 
                {
                    return Unauthorized("Invalid username");
                }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("invalid password");
                }
            }
            return new UserDTO{
                Username=user.UserName,
                Token = _tokenService.CreateToken(user)
            };
     
     }

        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}


