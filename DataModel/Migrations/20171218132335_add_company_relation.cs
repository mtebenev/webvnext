using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Mt.WebVNext.DataModel.Migrations
{
    public partial class add_company_relation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "App_Contact",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_App_Contact_CompanyId",
                table: "App_Contact",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_App_Contact_App_Company_CompanyId",
                table: "App_Contact",
                column: "CompanyId",
                principalTable: "App_Company",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_Contact_App_Company_CompanyId",
                table: "App_Contact");

            migrationBuilder.DropIndex(
                name: "IX_App_Contact_CompanyId",
                table: "App_Contact");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "App_Contact");
        }
    }
}
