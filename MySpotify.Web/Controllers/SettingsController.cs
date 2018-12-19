using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySpotify.Web.ViewModels;

namespace MySpotify.Web.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private readonly IConfiguration _configuration;

        public SettingsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public SpotifySettingsViewModel GetSpotifySettings()
        {
            var spotifySection = _configuration.GetSection("spotify");

            return new SpotifySettingsViewModel
            {
                SpotifyAccountsUrl = spotifySection["AccountsUrl"],
                SpotifyBaseUrl = spotifySection["BaseUrl"],
                SpotifyClientId = spotifySection["ClientId"]
            };
        }
    }
}
