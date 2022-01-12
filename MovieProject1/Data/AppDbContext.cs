using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieProject1.Data.Model
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favorite>()
                .HasOne(m => m.Class)
                .WithMany(mf => mf.Favorites)
                .HasForeignKey(mi => mi.MovieId);

            modelBuilder.Entity<Favorite>()
                .HasOne(u => u.User)
                .WithMany(uf => uf.Favorites)
                .HasForeignKey(ui => ui.UserId);

        }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Class> Class { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
    }
}
