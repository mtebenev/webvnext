# This script is used only during build stage.
# Notice double underscores which Asp.Net Core uses on Linux for ':' in environment variabls
export connectionStrings__application="Data Source=/app/ServerAppApi.Web/out/App_Data/webvnext.db"
export dbProviderName=sqlite
mkdir -p /app/ServerAppApi.Web/out/App_Data
dotnet ef database update -p ./DataModel -s ./ServerAppApi.Web
dotnet run -p ./ServerAppApi.Web import ../Data/us-500.csv 1 sqlite "Data Source=/app/ServerAppApi.Web/out/App_Data/webvnext.db"
