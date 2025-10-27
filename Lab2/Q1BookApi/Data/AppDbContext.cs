﻿using Microsoft.EntityFrameworkCore;
using Q1BookApi.Model;

namespace Q1BookApi.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Book> Books { get; set; }

    }
}
