import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import Head from 'next/head';
import Editor from '../../components/Editor/Editor';
import axios from 'axios';

const CreateBlog = (props) => { 

  const onSaveHandler = async (body, title, description) => {

    const toSaveData = {
      title,
      body,
      description,
      path: title.toLowerCase().replace(' ', '_'),
      tags: ['Sample', 'Tech'],
      author: 'mdupree',
      published: true
    };

    console.log(toSaveData);
    axios.post(`/api/article`, toSaveData)
    //make your ajax call to send the data to your server and save it in a database
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Head>
        <title>Create new blog</title>
      </Head>
      <h1>Create Blog</h1>
      <Editor
        onSave={(editorData, title, description) =>
          onSaveHandler(editorData, title, description)
        }
      />
    </div>
  );
};

export default CreateBlog;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
