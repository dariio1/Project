using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MovieProject1.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
                if (!context.Users.Any())
                    context.Users.AddRange(new User()
                    {
                        Username = "Korisnik1",
                        Name = "korisnik",
                        Lastname = "Koris",
                        Email = "korisnik@mail.com",
                        Password = "123",
                        DateOfReg = DateTime.Now
                    },
                    new User()
                    {
                        Username = "Korisnik2",
                        Name = "korisnik2",
                        Lastname = "Koris2",
                        Email = "korisnik2@mail.com",
                        Password = "1234",
                        DateOfReg = DateTime.Now
                    }
                    );
                context.SaveChanges();
            }
        }
    }
}
