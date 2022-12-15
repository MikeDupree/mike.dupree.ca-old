import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongo";
import {Article, EditorData} from "../../index.types"
const COLLECTION = "Articles";

type Data = {
  message: string;
  articles?: Article[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    return getArticles(req, res);
  }
  if (req.method === "POST") {
    return createArticle(req, res);
  }
}

const getArticles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { path } = req.query;
  const db = await connectToDatabase();
  console.log("path", path);
  const filter = path ? { path } : {};
  console.log('filter', filter)
  try {
    const articles = (await db
      .collection(COLLECTION)
      .find(filter)
      .toArray()) as Article[];
    return res.status(200).json({
      message: "Articles",
      articles,
    });
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      message: "Error loading articles",
      articles: [],
    });
  }
};

/**
 * GET Articles handler
 */
const createArticle = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { title, content, tags, path, published } = req.body;
  // TODO Setup validation for fields not empty, etc...
  try {
    const db = await connectToDatabase();
    db.collection(COLLECTION).insertOne({
      title,
      content,
      tags,
      path,
      author: "mdupree",
      published,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating article",
    });
  }

  return res.status(200).json({
    message: "Article Created",
  });
};
