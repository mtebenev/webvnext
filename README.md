# WebVNext

This is a sandbox project demonstrating various technologies adoption and usage. The application itself is very simple: it's a typical CRUD contact manager application with
two entities: Company and Contact. The aim is to provide a sample integrating all range of libraries/techniques used in real-life applications.

## Server side stack overview

- ASPNET Core 2.0.0
- IdentityServer4 2.0.2
- NgAspNetCore 0.1.0-Preview
- AutoMapper 6.1.1
- Entity Framework Core 2.0.0
- xUnit 2.3.1
- Moq 4.7.145

## Client application (SPA)

There are two client applications in the sample: angular and react. This is outline of libraries/modules used:

| Concern                             | Angular                    | React                     |
| ----------------------------------- |----------------------------|---------------------------|
| UI components                       | @angular/material          | material-ui               |
| UI layout/utils                     | @angular/flex-layout       | react-responsive          |
| Authentication                      | angular-auth-oidc-client   | oidc-client               |
| HTTP client                         | @angular/http              | axios                     |
| Forms management/validation         | @angular/forms             | react-final-form          |
| Translations/localization           | ngx-translate              | react-i18next             |

## Installation

### Prerequisites

Make sure you have installed .Net Core Runtime 2.1.3
(Get from https://aka.ms/dotnet-download)

### Set up server app

1. Create a new MSSQL database
2. Manage user secrest in `ServerAppApi.Web` (use context menu in VS solution explorer), add the following content:
```json
{
  "connectionStrings": {
    "application": "<CONNSTR>"
  }
}
```
3. Run Entity Framework migrations
```bash
cd DataModel
dotnet ef database update
```

### Prepare angular app

1. Build `client-common-lib`:
```bash
cd client-common-lib
npm install
npm run build
``` 

2. Set up packages for angular app
```bash
cd ClientApp.Angular
npm install
``` 
## Running application locally
### Run Angular client non-embedded
Use separated console windows to launch API service, Identity service, Angular client.

```bash
cd ServerAppApi.Web
dotnet run start
``` 

```bash
cd ServerAppIdentity.Web
dotnet run start
``` 

```bash
cd ClientApp.Angular
npx ng serve
``` 
