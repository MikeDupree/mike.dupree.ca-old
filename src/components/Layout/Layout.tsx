import { AppBar, Box, Container } from "@mui/material";
import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header/Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Container maxWidth="xl">
      <Header />
      <Container sx={{ paddingTop: "75px" }}>{children}</Container>
    </Container>
  );
};

export default Layout;
