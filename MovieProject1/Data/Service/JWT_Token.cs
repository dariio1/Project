using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MovieProject1.Data.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MovieProject1.Data.Service
{
    public class JWT_Token
    {
        private readonly ApplicationSettings _appSettings;
        public JWT_Token(IOptions<ApplicationSettings> appSettings)
        {
            _appSettings = appSettings.Value;

        }
        public string GenerateToken(User user)
        {
            /* var tokenHandler = new JwtSecurityTokenHandler();
             var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
             var tokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(new Claim[] { new Claim("Id", user.Id.ToString()),
                                                            new Claim("Username", user.Username.ToString())}),
                 Expires = DateTime.UtcNow.AddMinutes(5),
                 SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
             };
             var Securitytoken = tokenHandler.CreateToken(tokenDescriptor);
             var token = tokenHandler.WriteToken(Securitytoken);
             return token;*/

            var claims = new List<Claim>
            {
                new Claim("username", user.Username.ToString()),
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString()),

            };
            var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:44384",
                audience: "http://localhost:44384",
                claims: claims,
                expires: DateTime.Now.AddMinutes(7),
                signingCredentials: signingCredentials
                );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

    }
}
