using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Conch.Controllers
{
    [Authorize]
    public class PresentController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index(string deckName)
        {
            if (Context.User.Identity.Name != "mark") return new HttpStatusCodeResult(403);
            var deck = new Deck
            {
                Title = "The vNext Big Thing",
                Stylesheets = "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/readable/bootstrap.min.css,//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css,/Content/conch.css"
            };
            return View(deck);
        }

        public IActionResult Slides(string deckName)
        {
            return new ObjectResult(new SlideCollection
            {
                Slides = new[]
                {
                    new Slide("welcome")
                    {
                        Title = "Welcome",
                        TemplateUrl = "/Decks/vNext/welcome.html"
                    }
                }
            });
        }
    }
}
