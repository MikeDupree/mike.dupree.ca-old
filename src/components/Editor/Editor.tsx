"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Input,
  Textarea,
  Checkbox,
  Row,
  Col,
} from "@nextui-org/react";
import { styled } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./Editor.styles";
import axios from "axios";
import { EditorProps } from "./Editor.types";

const StyledEditor = styled("div")(styles);
const Editor = ({ editable = true, content }: EditorProps) => {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: true,
    editable,
  });

  const onSaveHandler = async () => {
    if (!editor) return;
    try {
      const content = editor.getJSON();
      if (!title || title === "")
        throw new Error("Title cannot be empty. Please enter title");

      axios
        .post("/api/article", {
          title,
          content,
          tags: ["test"],
          path: title.toLowerCase().replaceAll(" ", "-"),
          published: false,
        })
        .then((res) => {
          console.log("Success!", res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const inputStyle = {
    maxWidth: "500px",
    marginBottom: "20px",
    height: "30px",
  };

  return (
    <StyledEditor style={{ display: "flex", flexDirection: "column" }}>
      <Container gap={0}>
        <Row gap={1}>
          <Col>
            <Input
              labelPlaceholder="Your Blog Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Col>
          <Col>
            <div style={{ display: "flex" }}>
              <Button ghost color="secondary" onClick={onSaveHandler}>
                Save
              </Button>
              <Button contained color="primary" disabled>
                Publish
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorContent editor={editor} />
          </Col>
        </Row>
      </Container>
    </StyledEditor>
  );
};

export default Editor;
