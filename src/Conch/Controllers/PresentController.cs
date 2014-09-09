using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Conch.Controllers
{
    public class PresentController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index(string deckName, string eventName)
        {
            var deck = new Deck
            {
                Title = "The vNext Big Thing",
                Stylesheets = "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/readable/bootstrap.min.css,/Content/conch.css"
            };
            return View();
        }
    }
}
