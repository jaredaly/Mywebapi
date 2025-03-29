using Microsoft.AspNetCore.Mvc;

namespace Mywebapi.Controllers
{
    [ApiController]    // Marks this as an API controller
    [Route("api/myapi")]  // Defines the base route for this controller
    public class MyApiController : ControllerBase
    {
        // GET api/myapi
        [HttpGet]
        public String Get()
        {
            // return Ok(new { message = "Hello from API!" });
            return "yay";
        }

        // POST api/myapi
        
    }

    
}