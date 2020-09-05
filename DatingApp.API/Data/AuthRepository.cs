using System;
using System.Threading.Tasks;
using Data;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    public AuthRepository(DataContext context)
    {
      _context = context;

    }
    public async Task<User> Login(string username, string password)
    {
      var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(user => user.Username == username);

      if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;

      return user;
    }

    public async Task<User> Register(User user, string password)
    {
      CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      await _context.Users.AddAsync(user);
      await _context.SaveChangesAsync();

      return user;
    }

    public async Task<bool> UserExists(string username)
    {
      return await _context.Users.AnyAsync(user => user.Username == username) ? true : false;
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
      {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != passwordHash[i])
            return false;
        }
      }

      return true;
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }
  }
}