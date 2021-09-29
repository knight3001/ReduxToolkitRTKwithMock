import { styled } from "@mui/material/styles";
import { compose, spacing, borders } from "@mui/system";
import MuiButton from "@mui/material/Button";

const Button = styled(MuiButton)(compose(spacing, borders));

export default Button;
