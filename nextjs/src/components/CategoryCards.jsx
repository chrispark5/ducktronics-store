import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import Box from "@mui/material/Box";

export default function CategoryCards({ categoryArray }) {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {categoryArray.map((category) => (
          <Link key={category} href={`/products/${category.toLowerCase()}`}>
            <Card
              style={{
                backgroundColor: "#00BFFF",
                borderColor: "#FFFFFF",
                borderWidth: "3px",
                borderStyle: "solid",
              }}
            >
              <CardActionArea>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2
                    className="max-w-80 md:text-xl lg:text-3xl font-semibold "
                    style={{ color: "#FFD700" }}
                  >
                    {category}
                  </h2>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>
    </Box>
  );
}
