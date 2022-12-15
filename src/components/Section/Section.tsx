import { Typography } from "@mui/material";

interface SectionProps {
  section: any;
}

const Section = ({section}: SectionProps) => {
  console.log('section', section);

  switch (section.type) {
    case 'paragraph':
      return <Typography variant="body1" className="article-paragraph">{section.data.text}</Typography>
    default:
      return <></>
  }
};

export default Section;
