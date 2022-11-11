import {getUserInput,} from "./modules/getUserInput.js";
import {switchTheme,} from "./modules/theme.js";
import {switchDisplay,} from "./modules/display.js";


import "./style.scss";
import settingsIcon from "./assets/settingsIcon.svg";
import closeIcon from "./assets/closeIcon.svg";


switchDisplay();
switchTheme();
getUserInput();