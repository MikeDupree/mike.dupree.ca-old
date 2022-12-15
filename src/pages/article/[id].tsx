import Editor from '../../components/Editor'
import { useRouter } from 'next/router'
import {GetStaticProps} from 'next';
import axios, { AxiosError } from 'axios';
import {Article as ArticleData} from '../../index.types';
import SectionFactory from '../../components/Section'
import { Typography } from "@mui/material";

interface ArticleProps {
  article: ArticleData;
}

const Article = ({article}: ArticleProps) => {
  const router = useRouter()
  const { id } = router.query
  console.log('article', article)
  return <>

    <Typography variant="h3" sx={{textAlign: 'center'}}>{article.title}</Typography>


    {article.body.blocks.map((section: any) => (
      <SectionFactory key={section.id} section={section} />
    ))}
  </>
}

export default Article;

export async function getStaticPaths() {
  const articleResponse = await axios.get('http://localhost:3000/api/article').catch((err: AxiosError) => {
    console.log("Error in /articles/[id] : getStaticPaths", err);
  })

  let paths = [];
  paths = articleResponse?.data?.articles?.map((article: ArticleData) => (
    {
      params: {id: article.path}
    }
  ));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const articlesResponse = await axios
    .get(`http://localhost:3000/api/article?path=${params?.id}`)
    .catch((err) => {
      console.log("error", err);
    });

  console.log("articles", articlesResponse?.data);
  return {
    props: {
      article: articlesResponse?.data?.articles?.pop() ?? [],
    },
  };
};
