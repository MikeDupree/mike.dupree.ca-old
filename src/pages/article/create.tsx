import Editor from "../../components/Editor/Editor";
import axios from "axios";

interface CreateBlogProps {
  id?: string;
}

const CreateBlog = (props: CreateBlogProps) => {
  const onSaveHandler = async (body, title, description) => {
    const toSaveData = {
      title,
      body,
      description,
      path: title.toLowerCase().replace(" ", "_"),
      tags: ["Sample", "Tech"],
      author: "mdupree",
      published: true,
    };

    console.log(toSaveData);
    axios.post(`/api/article`, toSaveData);
    //make your ajax call to send the data to your server and save it in a database
  };

  return (
    <div style={{ paddingTop: "25px" }}>
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
  console.log("ctx", context);

  return {
    props: {},
  };
}
