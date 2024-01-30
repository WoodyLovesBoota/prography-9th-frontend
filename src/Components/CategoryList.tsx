import styled from "styled-components";
import { ICategory } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedCategoryState } from "../atoms";

const CategoryList = ({ list }: ICategoryListProps) => {
  const navigate = useNavigate();
  const [selectedCate, setSelectedCate] = useRecoilState(selectedCategoryState);

  const handleCategoryClick = (cate: string) => {
    if (selectedCate.includes(cate))
      setSelectedCate((prev) => {
        let index = prev.findIndex((e) => e === cate);
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    else setSelectedCate((prev) => [...prev, cate]);
  };

  useEffect(() => {
    selectedCate.length === 0 ? navigate("/") : navigate(`/?category=${selectedCate.join(",")}`);
  }, [selectedCate]);

  return (
    <Wrapper>
      {list.map((cate) => (
        <CategoryContent
          onClick={() => handleCategoryClick(cate.strCategory)}
          isSelected={selectedCate.includes(cate.strCategory).toString()}
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
  gap: 10px;
`;

const CategoryContent = styled.h2<{ isSelected: string }>`
  border: 1px solid #222;
  padding: 7px 20px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected === "true" ? props.theme.accent + "cc" : "transparent")};
  font-weight: 400;
  color: ${(props) => (props.isSelected === "true" ? "white" : "#222")};
  border: 1px solid ${(props) => (props.isSelected === "true" ? "transparent" : "#222")};
  &:hover {
    background-color: ${(props) => props.theme.accent + "66"};
    border: 1px solid transparent;
  }
  transition: all 0.1s ease-in-out;
`;

interface ICategoryListProps {
  list: ICategory[];
}
