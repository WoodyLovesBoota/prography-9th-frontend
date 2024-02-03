import styled from "styled-components";
import { ICategory } from "../api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedCategoryState } from "../atoms";

const CategoryList = ({ list }: ICategoryListProps) => {
  const navigate = useNavigate();
  const [selectedCate, setSelectedCate] = useRecoilState(selectedCategoryState);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("category");

  const handleCategoryClick = (cate: string) => {
    console.log(keyword);
    if (selectedCate.includes(cate))
      setSelectedCate((prev) => {
        let index = prev.findIndex((e) => e === cate);
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    else setSelectedCate((prev) => [...prev, cate]);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    selectedCate.length > 0 && searchParams.set("category", selectedCate.join(","));
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [selectedCate]);

  useEffect(() => {
    keyword && setSelectedCate(keyword?.split(","));
  }, [keyword]);

  return (
    <Wrapper>
      {list.map((cate, ind) => (
        <CategoryContent
          key={ind}
          onClick={() => handleCategoryClick(cate.strCategory)}
          selected={selectedCate.includes(cate.strCategory)}
        >
          {cate.strCategory}
        </CategoryContent>
      ))}
    </Wrapper>
  );
};

export default CategoryList;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryContent = styled.h2<{ selected: Boolean }>`
  border: 1px solid #222;
  padding: 7px 20px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? props.theme.accent + "cc" : "transparent")};
  font-weight: 400;
  color: ${(props) => (props.selected ? "white" : "#222")};
  border: 1px solid ${(props) => (props.selected ? "transparent" : "#222")};
  &:hover {
    background-color: ${(props) => props.theme.accent + "66"};
    border: 1px solid transparent;
  }
  transition: all 0.1s ease-in-out;
`;

interface ICategoryListProps {
  list: ICategory[];
}
