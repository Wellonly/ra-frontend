import React from "react";
import {Divider, DividerProps/* , Box */} from "@material-ui/core";

interface SeparatorProps extends DividerProps {
    basePath?: string;
    className?: string;
    style?: object;
    color?: string;
}

export default function ({color='gray', absolute, flexItem, light, orientation, variant, style={backgroundColor: color}, ...rest}: SeparatorProps) {
    return (<Divider absolute={absolute} flexItem={flexItem} light={light} orientation={orientation} variant={variant} style={style} />);
}

// export default function ({color='gray', absolute, flexItem, light, orientation, variant, style={backgroundColor: color}, ...rest}: SeparatorProps) {
//     return (<Divider absolute={absolute} flexItem={flexItem} light={light} orientation={orientation} variant={variant} style={style} {...rest} />);
// } //style={{backgroundColor: color}}

// export default function ({width = "100%", border=0.5, basePath, className, margin, ...rest}: SeparatorProps) {
//     // console.log("..zv: Separator: props:",width, border, basePath, className, margin, rest);
//     return (<Box width={width} border={border} className={className} margin={margin} />);
// }
