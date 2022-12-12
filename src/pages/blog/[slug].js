import Output from 'editorjs-react-renderer';
import axios from 'axios';
import {Container, Row, Col, Text, User } from '@nextui-org/react';

const BlogDetail = (props) => {
  const { data, error } = props;

  if (error) {
    console.log(error);
    return null;
  }
  console.log("data", data)
  return (
    <Container>
      <Row>
        <Col>
          <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >{data.title}</Text>
        </Col>
        <Col>
          <User
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            name={data.author}
          />
        </Col>
      </Row>
    <Row>
      <Col>
        <div style={{ marginBottom: '3rem' }}>{data.description}</div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Output
            data={data.body}
          />
        </div>
      </Col>
    </Row>
    </Container>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;

  //make an ajax call to get your blog
  const response = await axios.get(`http://localhost:3000/api/article?path=${slug}`).catch(err => {
    console.log("<:error fetching article:>", err);
  });
  console.log('res data', response.data.articles);
  //sample return for testing. Here you will want to return the blog received through ajax call.
  return {
    props: {
      data: response?.data?.articles?.[0] || {}
    },
  };
}

export default BlogDetail;
