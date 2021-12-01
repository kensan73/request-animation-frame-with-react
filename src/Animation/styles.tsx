import { css } from "@emotion/core";

const sectionStyle = css`
  display: flex;
  height: 200px;
  position: relative;
`;

const circleStyle = css`
  margin: auto;
  background-color: red;
  display: inline-block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  line-height: 25px;
`;

const panel0Style = css`
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
`;

const panel1Style = css`
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

export { sectionStyle, circleStyle, panel0Style, panel1Style };
