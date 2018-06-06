using System;
using System.Web.Http;

namespace Conways.Controllers
{
    public class ConwaysController : ApiController
    {
        [HttpPost]
        public Request Post([FromBody] Request request)
        {
            var random = new Random();

            var response = new Request();
            response.Grid = new int[18,36];
            for(int i = 0; i < 18; i++)
            {
                for(int j = 0; j < 36; j++)
                {
                    response.Grid[i,j] = random.Next(2);
                }
            }
            return response;
        }

        public class Request
        {
            public int[,] Grid { get; set; } 
        }
    }
}
