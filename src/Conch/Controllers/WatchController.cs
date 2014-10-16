using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Runtime;
using System.Linq;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Conch.Controllers
{
    public class WatchController : Controller
    {
        private readonly IApplicationEnvironment _environment;
        public WatchController(IApplicationEnvironment environment)
        {
            _environment = environment;
        }

        // GET: /<controller>/
        public IActionResult Index(string deckName)
        {
            var deck = new Deck
            {
                Title = "The vNext Big Thing",
                Stylesheets = "//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/readable/bootstrap.min.css,//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css,/Content/conch.css"
            };
            return View(deck);
        }

        public IActionResult Slides(string deckName)
        {
            var deckData = new DeckData(_environment, deckName);
            var slides = deckData.GetSlides().ToList();
            if (slides.Count == 0)
            {
                return HttpNotFound();
            }

            return new ObjectResult(new SlideCollection
            {
                Slides = slides
            });
        }
    }
}
