import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* ~~~~~~ Styles ~~~~~~~ */

const ColorBoxDivWrapper = styled.div`
  padding: 3px;
  margin: 20px 3px 20px 3px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid black;
  }
`;

const ColorBoxDiv = styled.div`
  height: 28px;
  width: 58px;
  padding: 1px;
  cursor: pointer;
`;

/* ~~~~~~ Components ~~~~~~~ */

const ColorBoxes = props => (
  <ColorBoxDivWrapper>
    <ColorBoxDiv
      style={{ backgroundColor: props.color }}
      onMouseOver={props.hover}
      onFocus={props.hover}
    />
  </ColorBoxDivWrapper>
);

ColorBoxes.propTypes = {
  color: PropTypes.string.isRequired,
  hover: PropTypes.func.isRequired
};

export default ColorBoxes;