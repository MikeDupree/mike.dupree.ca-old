import { AppBar, Container, Box, styled, Toolbar, Button, IconButton, Avatar} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Header.styles";
import { SocialIcon } from "react-social-icons";
import { useSession, signIn, signOut } from "next-auth/react"

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
  const { data: session } = useSession()

  return (
    <AppBar className="Header" position="static" style={{backgroundImage:'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Image
              src="/Images/logo.png"
              width="75"
              height="75"
              alt="dupree.ca logo"
              style={{ borderRadius: "50%" }}
            />
            {links.map((link) => (
              <Link key={link.label} href={link.uri}>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              {socialLinks.map((link: Link) => (
  
                <SocialIcon
                  className={link.machineName}
                  key={link.machineName}
                  url={link.uri}
                  style={{ margin: "0 5px", width: '25px', height: '25px' }}
                  />
              ))}

            {session ? (
<button onClick={() => signOut()}>Sign out</button>
            ) : (
            <button onClick={() => signIn()}>Sign in</button> 
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
