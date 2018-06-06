using System.Web.Mvc;

namespace Conways.Controllers
{
    public class HomeController: Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Directive()
        {
            return PartialView("conway-grid.directive");
        }


    }
}