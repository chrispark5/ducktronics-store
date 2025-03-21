import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import FlowingMenu from "@/blocks/Components/FlowingMenu/FlowingMenu";

export default function CategoryCards({ categoryArray }) {
  const theme = useTheme();
  const items = categoryArray.map((category) => ({
    text: category,
    link: `/products/${category.toLowerCase()}`,
    image: `/images/${category}/${category}.jpg`,
  }));
  return (
    <Box className="relative">
      <FlowingMenu items={items} />

      {/* <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {categoryArray.map((category) => (
          <Link key={category} href={`/products/${category.toLowerCase()}`}>
            <Card
              style={{
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.background.paper,
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
                    className="max-w-80 md:text-xl lg:text-3xl font-semibold"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {category}
                  </h2>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div> */}
    </Box>
  );
}
