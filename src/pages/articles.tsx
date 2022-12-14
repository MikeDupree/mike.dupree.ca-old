import { Grid, Typography, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { ObjectId } from "mongodb";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

interface ArticleData {
  _id: ObjectId;
  title: string;
  description?: string;
  body: any;
  tags: string[];
  path: string;
  author: string;
  published: boolean;
}

const Articles = ({ articles }: { articles: ArticleData[] }) => {
  console.log("Articles", articles);

  return (
    <div className={styles.container}>
      <Head>
        <title>mike.dupree.ca | Articles</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Articles
      </Typography>

      <Grid container spacing={4}>
        {articles.map((article: ArticleData) => (
          <Grid key={article._id.toString()} item xs={12} md={6}>
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {article.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {article?.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <Link href={`/article/${article.path}`}>Read more</Link>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151, marginLeft: 'auto' }}
                image="https://source.unsplash.com/random"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("context", context);
  const articlesResponse = await axios
    .get(`http://localhost:3000/api/article`)
    .catch((err) => {
      console.log("error", err);
    });
  console.log("articles", articlesResponse?.data);
  return {
    props: {
      articles: articlesResponse?.data?.articles ?? [],
    },
  };
};
