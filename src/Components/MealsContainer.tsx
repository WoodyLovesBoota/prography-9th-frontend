import { useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { IMeal, IMeals, getFoods } from "../api";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import { useRecoilState } from "recoil";
import { gridState } from "../atoms";

const MealsContainer = ({ cateList }: IMealsContainerProps) => {
  const [meal, setMeal] = useState<IMeal[]>();
  const [grid, setGrid] = useRecoilState(gridState);

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

      setMeal(meals.flat());
    }
  }, [isAllLoaded, cateList, cateList.length]);

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
