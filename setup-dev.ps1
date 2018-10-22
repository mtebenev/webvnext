param([string]$dbProviderName)

#Install-Module -Name sqlserver

Import-Module sqlserver
dotnet restore

$dbName = "webvnext"
$connStr = "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=webvnext;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
if($dbProviderName.equals("sqlite"))
{
    Write-Host "Using SQLite DB provider"
    $connStr = "Data Source=App_Data\webvnext.db"
    if(-Not (Test-Path "ServerAppApi.Web\App_Data"))
    {
        New-Item -ItemType directory -Path "ServerAppApi.Web\App_Data"
    }

    if(Test-Path "ServerAppApi.Web\App_Data\webvnext.db")
    {
        Remove-Item -Path "ServerAppApi.Web\App_Data\webvnext.db" -Force
    }
}
else
{
    Write-Host "Using MSSQL DB provider"
    $dbProviderName = "MSSQL"

    push-location -Path "SQLSERVER:\sql\(localdb)"
    $dbPath = "mssqllocaldb\databases\webvnext"
    $server = get-item MSSQLLocalDB
    
    # Drop database if already exists
    if(Test-Path $dbPath)
    {
        Write-Host "Removing existing database"
        $server.KillAllProcesses($dbName)
        $db = get-item $dbPath
        $db.Drop()
    }
    
    # Create database
    $db = New-Object -TypeName Microsoft.SqlServer.Management.Smo.Database -argumentlist $server, $dbName
    $db.Create() 
    Write-Host "Created new webvnext database"
    pop-location
}

# Set connection string in user secrets file 
Write-Host "Configuring connection string..."
dotnet user-secrets set "connectionStrings:application" $connStr --project ".\DataModel"
dotnet user-secrets set "dbProviderName" $dbProviderName --project ".\DataModel"

# Apply database migrations
dotnet ef database update -p .\DataModel -s .\ServerAppApi.Web

# Import sample data
push-location -Path ".\ServerAppApi.Web"
dotnet run import ..\Data\us-500.csv 1 $dbProviderName "$connStr"
pop-location

# Install npm packages
push-location -Path ".\client-common-lib"
npm install
npm run build
pop-location

push-location -Path ".\ClientApp.Angular"
npm install
pop-location

push-location -Path ".\ClientApp.React"
npm install
pop-location

Write-host "Done"
