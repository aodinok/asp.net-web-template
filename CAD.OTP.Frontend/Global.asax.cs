using System.Web.Mvc;
using System.Web.Routing;

namespace CAD.OTP.Frontend
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

#if DEBUG
            // This hack is used to start webpack-dev-server from VS in dev mode
            if (System.Diagnostics.Process.GetProcessesByName("cmd").Length == 0)
            {
                var startInfo = new System.Diagnostics.ProcessStartInfo
                {
                    WorkingDirectory = Server.MapPath("app"),
                    FileName = "cmd",
                    Arguments = "/K npm start"
                };
                System.Diagnostics.Process.Start(startInfo);
            }
#endif
        }
    }
}
