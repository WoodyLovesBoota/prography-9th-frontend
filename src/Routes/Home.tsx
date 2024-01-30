import styled from "styled-components";
import { ICategories, IMeals, getCategories, getFoods } from "../api";
import { useQuery } from "react-query";

const Home = () => {
  // const { data, isLoading } = useQuery<ICategories>(["categories", "cate"], () => getCategories());
  const { data, isLoading } = useQuery<IMeals>(["categories", "cate"], () => getFoods("Seafood"));

  return (
    <Wrapper>
      {data?.meals.map((e) => (
        <div>{e.strMeal}</div>
      ))}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;
