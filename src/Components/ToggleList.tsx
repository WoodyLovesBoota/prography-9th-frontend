import { useRecoilState } from "recoil";
import styled from "styled-components";
import { filterState, gridState } from "../atoms";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const ToggleList = () => {
  const [grid, setGrid] = useRecoilState(gridState);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
  const filterOption = new URLSearchParams(location.search).get("filter");

  const navigate = useNavigate();

  const onGridToggleClick = () => {
    setIsGridOpen((prev) => !prev);
  };

  const onGridClick = (grid: number) => {
    setGrid(grid);
    setIsGridOpen(false);
  };

  const onFilterToggleClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const onFilterClick = (filter: string) => {
    setFilter(filter);
    setIsFilterOpen(false);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("filter", filter);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    setFilter(filterOption || "default");
  }, [filterOption]);

  return (
    <Wrapper>
      <Toggle>
        <ToggleTitle onClick={onFilterToggleClick}>
          {filter === "default" ? "정렬 방식" : filter === "new" ? "최신 순" : filter === "asc" ? "오름차순" : "내림차순"}
        </ToggleTitle>
        {isFilterOpen &&
          (filter === "new" ? (
            <Hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <HiddenTitle onClick={() => onFilterClick("asc")}>오름차순</HiddenTitle>
              <HiddenTitle onClick={() => onFilterClick("desc")}>내림차순</HiddenTitle>
            </Hidden>
          ) : filter === "asc" ? (
            <Hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <HiddenTitle onClick={() => onFilterClick("desc")}>내림차순</HiddenTitle>
              <HiddenTitle onClick={() => onFilterClick("new")}>최신 순</HiddenTitle>
            </Hidden>
          ) : filter === "desc" ? (
            <Hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <HiddenTitle onClick={() => onFilterClick("new")}>최신 순</HiddenTitle>
              <HiddenTitle onClick={() => onFilterClick("asc")}>오름차순</HiddenTitle>
            </Hidden>
          ) : (
            <Hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <HiddenTitle onClick={() => onFilterClick("new")}>최신 순</HiddenTitle>
              <HiddenTitle onClick={() => onFilterClick("asc")}>오름차순</HiddenTitle>
              <HiddenTitle onClick={() => onFilterClick("desc")}>내림차순</HiddenTitle>
            </Hidden>
          ))}
      </Toggle>
      <Toggle>
        <ToggleTitle onClick={onGridToggleClick}>{grid}개씩 보기</ToggleTitle>
        {isGridOpen &&
          (grid === 4 ? (
            <Hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <HiddenTitle onClick={() => onGridClick(2)}>2개씩 보기</HiddenTitle>
            </Hidden>
          ) : (
            <Hidden>
              <HiddenTitle onClick={() => onGridClick(4)}>4개씩 보기</HiddenTitle>
            </Hidden>
          ))}
      </Toggle>
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
  width: 100px;
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
