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
        temp.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        setMeal(temp);
      } else if (filterOption === "desc") {
        const temp = meals.flat();
        temp.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
        setMeal(temp);
      } else {
        setMeal(meals.flat());
      }
    }
  }, [isAllLoaded, cateList, cateList.length, filterOption]);

  return (
    <Wrapper>
      <FoodList grid={grid}>{meal && meal.map((singleMeal) => <MealCard key={singleMeal.idMeal} meal={singleMeal} />)}</FoodList>
    </Wrapper>
  );
};

export default MealsContainer;

const Wrapper = styled.div`
  margin-top: 50px;
`;

const FoodList = styled.div<{ grid: number }>`
  display: grid;
  grid-template-columns: ${(props) => (props.grid === 4 ? "repeat(4, 1fr)" : "repeat(2, 1fr)")};
  grid-gap: ${(props) => (props.grid === 4 ? "10px" : "16px")};
  justify-content: space-between;
`;

interface IMealsContainerProps {
  cateList: string[];
}
