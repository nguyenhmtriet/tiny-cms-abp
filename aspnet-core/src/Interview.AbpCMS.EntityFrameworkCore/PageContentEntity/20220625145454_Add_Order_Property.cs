using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Interview.AbpCMS.PageContentEntity
{
    public partial class Add_Order_Property : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "PageContent",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "PageContent");
        }
    }
}
