using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace CAD.OTP.Frontend
{
    public static class Settings
    {
        public static bool UseWebpackDevServer => "true".Equals(ConfigurationManager.AppSettings["UseWebpackDevServer"], StringComparison.InvariantCultureIgnoreCase);

        public static string WebpackDevServerRoot => ConfigurationManager.AppSettings["WebpackDevServerRoot"];
    }
}