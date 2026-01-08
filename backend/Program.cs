using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using Scalar.AspNetCore;
using task_manager_api.Extensions;


DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureCors(builder.Configuration);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
app.UseCors("CorsPolicy");


if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
    /*app.UseSwagger();
    app.UseSwaggerUI();*/
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();

