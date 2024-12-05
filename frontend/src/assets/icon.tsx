import MuiSvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

export type SvgComponent = React.FC<SvgIconProps>;

export const IconSpinLoading: SvgComponent = (props) => {
  return (
    <MuiSvgIcon
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      sx={{ mx: 'auto', display: 'block', shapeRendering: 'auto', color: 'primary.main', ...props.sx }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(30 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(60 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(150 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(210 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(300 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="rotate(330 50 50)">
        <rect x="45" y="8.5" rx="5" ry="5.5" width="10" height="11">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
        </rect>
      </g>
    </MuiSvgIcon>
  );
};
