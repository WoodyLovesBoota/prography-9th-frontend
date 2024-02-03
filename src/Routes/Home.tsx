import styled from "styled-components";
import { ICategories, ICategory, getCategories } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryList from "../Components/CategoryList";
import MealsContainer from "../Components/MealsContainer";

import ToggleList from "../Components/ToggleList";

const Home = () => {
  const [sortedCate, setSortedCate] = useState<ICategory[]>();
  const [foods, setFoods] = useState<string[]>();

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("category");

  const { data, isLoading } = useQuery<ICategories>(["categories", "cate"], () => getCategories());

  useEffect(() => {
    if (data) {
      let tempCate = [...data.categories];
      tempCate.sort((a, b) => Number(a.idCategory) - Number(b.idCategory));
      setSortedCate(tempCate);
    }
  }, [data]);

  useEffect(() => {
    setFoods(keyword?.split(","));
  }, [keyword]);

  return (
    <Wrapper>
      {isLoading || !sortedCate ? (
        <Loader></Loader>
      ) : (
        <Container>
          <CategoryList list={sortedCate} />
          <ToggleList />
          {foods && <MealsContainer cateList={foods} />}
        </Container>
      )}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 0;
`;

const Loader = styled.div``;

const Container = styled.div`
  width: 1440px;
  @media screen and (max-width: 1600px) {
    width: 90vw;
  }
`;
