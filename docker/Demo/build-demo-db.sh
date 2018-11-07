connectionStrings:application="Data Source=App_Data/webvnext.db"
mkdir -p ./ServerAppApi.Web/App_Data
dotnet ef database update -p ./DataModel -s ./ServerAppApi.Web
dotnet run -p ./ServerAppApi.Web import ../Data/us-500.csv 1 sqlite "Data Source=App_Data/webvnext.db"
