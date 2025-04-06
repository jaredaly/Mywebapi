using Microsoft.EntityFrameworkCore;

namespace Mywebapi.Data
{
    
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define your DbSets (tables)
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Name = "John Doe", Email = "john@example.com" },
            new User { Id = 2, Name = "Jane Smith", Email = "jane@example.com" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Laptop", amount = 10 },
            new Product { Id = 2, Name = "Smartphone", amount = 25 },
            new Product { Id = 3, Name = "Tablet", amount = 15 }
        );
    }

    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

       
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int amount { get; set; }

        
    }
}