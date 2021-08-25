import { styled } from "@material-ui/core/styles";
import { compose, spacing, borders } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";

const Button = styled(MuiButton)(compose(spacing, borders));

export default Button;
