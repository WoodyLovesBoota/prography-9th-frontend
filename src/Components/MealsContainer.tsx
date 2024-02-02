import { useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { IMeal, IMeals, getFoods } from "../api";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";

const MealsContainer = ({ cateList }: IMealsContainerProps) => {
  const [meal, setMeal] = useState<IMeal[]>();

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

  return <Wrapper>{meal && meal.map((singleMeal) => <MealCard key={singleMeal.idMeal} meal={singleMeal} />)}</Wrapper>;
};

export default MealsContainer;

const Wrapper = styled.div``;

interface IMealsContainerProps {
  cateList: string[];
}
