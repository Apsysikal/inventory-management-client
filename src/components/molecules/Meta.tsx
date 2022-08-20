import { Typography } from "@mui/material";

const Meta: React.FC<{
  title: string;
  text: string;
}> = ({ title, text }) => {
  return (
    <>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2">{text}</Typography>
    </>
  );
};

export { Meta };
