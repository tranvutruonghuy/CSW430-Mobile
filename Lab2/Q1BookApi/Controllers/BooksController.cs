using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Q1BookApi.Data;
using Q1BookApi.Model;

namespace Q1BookApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController(AppDbContext context) : Controller
    {
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = context.Books.ToList();
            return Ok(books);
        }
        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = context.Books.FirstOrDefault(b => b.bookId == id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            
            context.Books.Add(newBook);
            
            context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var book = context.Books.FirstOrDefault(b => b.bookId == id);
            if (book == null)
            {
                return NotFound();
            }
            book.Name = updatedBook.Name;
            book.Description = updatedBook.Description;
            book.Price = updatedBook.Price;
            book.Note = updatedBook.Note;

            context.SaveChanges();
            return Ok(book);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = context.Books.FirstOrDefault(b => b.bookId == id);
            if (book == null)
            {
                return NotFound();
            }
            context.Books.Remove(book);
            context.SaveChanges();
            return NoContent();
        }

    }
}
