import { useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { IMeal, IMeals, getFoods } from "../api";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import { useRecoilState } from "recoil";
import { gridState } from "../atoms";
import { useLocation } from "react-router-dom";

const MealsContainer = ({ cateList }: IMealsContainerProps) => {
  const [meal, setMeal] = useState<IMeal[]>();
  const [isMore, setIsMore] = useState(false);
  const [grid, setGrid] = useRecoilState(gridState);

  const location = useLocation();
  const filterOption = new URLSearchParams(location.search).get("filter");

  const mealQueries = useQueries<IMeals[]>(
    cateList.map((cate) => {
      return {
        queryKey: ["meals", cate],
        queryFn: () => getFoods(cate),
      };
    })
  );

  const isAllLoaded = mealQueries.every((query) => query.isSuccess);

  useEffect(() => {
    if (isAllLoaded) {
      const meals = mealQueries.map((query) => {
        const mealData = query.data as IMeals;
        return mealData ? mealData["meals"] : [];
      });

      if (filterOption === "new") {
        const temp = meals.flat();
        temp.sort((a, b) => Number(b.idMeal) - Number(a.idMeal));
        setMeal(temp);
      } else if (filterOption === "asc") {
        const temp = meals.flat();
        temp.sort((a, b) => a.strMeal.trim().localeCompare(b.strMeal.trim()));
        setMeal(temp);
      } else if (filterOption === "desc") {
        const temp = meals.flat();
        temp.sort((a, b) => b.strMeal.trim().localeCompare(a.strMeal.trim()));
        setMeal(temp);
      } else {
        setMeal(meals.flat());
      }
    }
  }, [isAllLoaded, cateList, cateList.length, filterOption]);

  return (
    <Wrapper>
      {
        <>
          <FoodList grid={grid}>
            {meal && meal.slice(0, 20).map((singleMeal) => <MealCard key={singleMeal.idMeal} meal={singleMeal} />)}
            {isMore && meal?.slice(20).map((singleMeal) => <MealCard key={singleMeal.idMeal} meal={singleMeal} />)}
          </FoodList>
          {!isMore && (
            <MoreButton
              onClick={() => {
                setIsMore(true);
              }}
            >
              더보기
            </MoreButton>
          )}
        </>
      }
    </Wrapper>
  );
};

export default MealsContainer;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const FoodList = styled.div<{ grid: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) => (props.grid === 4 ? "repeat(4, 1fr)" : "repeat(2, 1fr)")};
  grid-gap: ${(props) => (props.grid === 4 ? "10px" : "16px")};
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MoreButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  padding: 30px;
  background: transparent;
  margin-top: 50px;
  &:hover {
    background: linear-gradient(to bottom, transparent, #fb255422);
  }
`;

interface IMealsContainerProps {
  cateList: string[];
}
