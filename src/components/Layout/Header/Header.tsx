import { AppBar, Container, Box, styled, Toolbar, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Header.styles";
import { SocialIcon } from "react-social-icons";

const AppHeader = styled(AppBar)(styles);
type Props = {};
type Link = {
  label: string;
  machineName: string;
  uri: string;
};

const links: Link[] = [
  {
    label: "Articles",
    machineName: "articles",
    uri: "/articles",
  },
  {
    label: "Resume",
    machineName: "resume",
    uri: "/resume",
  },
];

const socialLinks: Link[] = [
  {
    label: "LinkedIn",
    machineName: "linkedin",
    uri: "https://www.linkedin.com/in/mike-dupree-02455899/",
  },
  {
    label: "Twitter",
    machineName: "twitter",
    uri: "https://twitter.com/_mdupree",
  },
  {
    label: "Github",
    machineName: "github",
    uri: "https://github.com/MikeDupree",
  },
  {
    label: "Gitlab",
    machineName: "gitlab",
    uri: "https://gitlab.com/mikedupree",
  },
];

const Header = (props: Props) => {
  return (
    <AppBar className="Header" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/Images/logo.png"
              width="75"
              height="75"
              alt="dupree.ca logo"
              style={{ borderRadius: "50%" }}
            />

            <Box
              sx={{
                margin: "0 25px",
              }}
            >
              {links.map((link: Link) => (
                <Link
                  key={link.machineName}
                  href={link.uri}
                  style={{ margin: "0 10px" }}
                >
                  <Button variant="text">{link.label}</Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1 }}></Box>

            <Box
              sx={{
                margin: "0 25px",
              }}
            >
              {socialLinks.map((link: Link) => (
                <SocialIcon
                  className={link.machineName}
                  key={link.machineName}
                  url={link.uri}
                  style={{ margin: "0 5px" }}
                />
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
