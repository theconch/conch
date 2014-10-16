using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Routing;
using Microsoft.AspNet.Security.Cookies;
using Microsoft.Data.Entity;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;
using Conch.Models;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Conch
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            // Setup configuration sources
            var configuration = new Configuration();
            configuration.AddJsonFile("config.json");
            configuration.AddEnvironmentVariables();

            app.UseErrorPage();

            // Set up application services
            app.UseServices(services =>
            {
                services.AddSignalR()
                    .SetupOptions(options =>
                    {
                        options.Hubs.EnableDetailedErrors = true;
                    });

                // Add EF services to the services container
                services.AddEntityFramework()
                    .AddSqlServer();

                // Configure DbContext
                services.SetupOptions<DbContextOptions>(options =>
                {
                    options.UseSqlServer(configuration.GetConnectionString("Data:DefaultConnection:ConnectionString"));
                });
                
                // Add Identity services to the services container
                services.AddIdentitySqlServer<ApplicationDbContext, ApplicationUser>()
                    .AddAuthentication();

                // Add MVC services to the services container
                services.AddMvc()
                    .SetupOptions<MvcOptions>(options =>
                    {
                        options.OutputFormatters.Replace(new JsonOutputFormatter(new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }, false));
                    });
            });

            // Enable Browser Link support
            app.UseBrowserLink();

            // Add static files to the request pipeline
            app.UseStaticFiles();

            // Add cookie-based authentication to the request pipeline
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = ClaimsIdentityOptions.DefaultAuthenticationType,
                LoginPath = new PathString("/Account/Login"),
            });

            app.UseSignalR();

            // Add MVC to the request pipeline
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "present",
                    template: "present/{deckName}",
                    defaults: new { controller = "Present", action = "Index" });

                routes.MapRoute(
                    name: "presentSlides",
                    template: "present/{deckName}/slides",
                    defaults: new { controller = "Present", action = "Slides" });

                routes.MapRoute(
                    name: "watch",
                    template: "watch/{deckName}",
                    defaults: new { controller = "Watch", action = "Index" });

                routes.MapRoute(
                    name: "watchslides",
                    template: "watch/{deckName}/slides",
                    defaults: new { controller = "Watch", action = "Slides" });

                routes.MapRoute(
                    name: "default", 
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "api",
                    template: "{controller}/{id?}");
            });
        }
    }
}
