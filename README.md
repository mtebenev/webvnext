# WebVNext

This is a sandbox project demonstrating various technologies adoption and usage. The application itself is very simple: it's a typical CRUD contact manager application with
two entities: Company and Contact. The aim is to provide a sample integrating all range of libraries/techniques used in real-life applications.

## Server side stack overview

- ASPNET Core 2.1
- IdentityServer4 2.3
- YesSpa
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

## Run docker demo

```bash
docker build -f ./docker/Demo/dockerfile -t webvnext .
docker run --rm -it -p 3200:3200 -p 5200:5200 webvnext
```

Then navigate your browser to http://localhost:5200
Use alice/password credentials to log in.

## Build and run development environment

### Prerequisites

Make sure you have installed .Net Core Runtime 2.1.3
(Get from https://aka.ms/dotnet-download)

### Run in development environment

Use PowerShell to run configuration script:

```bash
.\setup-dev.ps1
```

Use separated console windows to launch API service, Identity service.

```bash
cd ServerAppApi.Web
dotnet run start
``` 

```bash
cd ServerAppIdentity.Web
dotnet run start
``` 

Run SPAs:

```bash
cd ClientApp.Angular
npx ng serve
``` 

```bash
cd ClientApp.React
npm run start
``` 
