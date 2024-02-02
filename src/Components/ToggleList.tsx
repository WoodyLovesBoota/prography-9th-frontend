import { useRecoilState } from "recoil";
import styled from "styled-components";
import { gridState } from "../atoms";
import { useState } from "react";
import { motion } from "framer-motion";

const ToggleList = () => {
  const [grid, setGrid] = useRecoilState(gridState);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const onGridToggleClick = () => {
    setIsGridOpen((prev) => !prev);
  };

  const onGridClick = (grid: number) => {
    setGrid(grid);
    setIsGridOpen(false);
  };

  return (
    <Wrapper>
      <Toggle>
        <ToggleTitle onClick={onGridToggleClick}>{grid}개씩 보기</ToggleTitle>
        {isGridOpen &&
          (grid === 4 ? (
            <Hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <HiddenTitle onClick={() => onGridClick(2)}>2개씩 보기</HiddenTitle>
              {/* <HiddenTitle onClick={() => onGridClick(4)}>4개씩 보기</HiddenTitle> */}
            </Hidden>
          ) : (
            <Hidden>
              <HiddenTitle onClick={() => onGridClick(4)}>4개씩 보기</HiddenTitle>
              {/* <HiddenTitle onClick={() => onGridClick(2)}>2개씩 보기</HiddenTitle> */}
            </Hidden>
          ))}
      </Toggle>
      <Toggle></Toggle>
    </Wrapper>
  );
};

export default ToggleList;

const Wrapper = styled.div`
  display: flex;
  margin: 50px 0;
  justify-content: flex-end;
`;

const Toggle = styled.div`
  cursor: pointer;
  position: relative;
`;

const ToggleTitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.accent};
`;

const Hidden = styled(motion.div)`
  position: absolute;
`;

const HiddenTitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;
