namespace task_manager_api.Extensions
{
    public static partial class ConfigureApplicationServices
    {
        public static void ConfigureCors(this IServiceCollection services,
            IConfiguration configuration) 
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
        }
    }
}
