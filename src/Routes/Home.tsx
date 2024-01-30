import styled from "styled-components";
import { ICategories, ICategory, IMeals, getCategories, getFoods } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "../Components/CategoryList";

const Home = () => {
  const [sortedCate, setSortedCate] = useState<ICategory[]>();

  const { data, isLoading } = useQuery<ICategories>(["categories", "cate"], () => getCategories());
  // const { data, isLoading } = useQuery<IMeals>(["categories", "cate"], () => getFoods("Seafood"));

  useEffect(() => {
    if (data) {
      let tempCate = [...data.categories];
      tempCate.sort((a, b) => Number(a.idCategory) - Number(b.idCategory));
      setSortedCate(tempCate);
    }
  }, [data]);

  return (
    <Wrapper>
      {isLoading || !sortedCate ? (
        <Loader></Loader>
      ) : (
        <Container>
          <CategoryList list={sortedCate} />
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
  width: 1080px;
`;
