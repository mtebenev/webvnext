rem dotnet run does not accept msbuild params, check https://github.com/dotnet/cli/issues/7229 for more details
dotnet clean
dotnet build /p:BuildEnvironment=Demo
dotnet run --no-build --launch-profile=DevEmbedded

