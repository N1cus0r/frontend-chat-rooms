import { useContext } from "react";
import { ColorModeContext } from "../theme/AppTheme";

const useTheme = () => {
  const { mode, changeColorMode } = useContext(ColorModeContext);
  return [mode, changeColorMode];
};

export default useTheme;
