import styled from "styled-components";
import { ICategories, ICategory, getCategories } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryList from "../Components/CategoryList";
import MealsContainer from "../Components/MealsContainer";

import ToggleList from "../Components/ToggleList";

const Home = () => {
  const [sortedCate, setSortedCate] = useState<ICategory[]>();
  const [foods, setFoods] = useState<string[]>();

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("category");

  const { data, isLoading } = useQuery<ICategories>(["categories", "cate"], () => getCategories());

  const navigate = useNavigate();

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

  const onLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <Wrapper>
      <Header>
        <Logo src="./logo.png" onClick={onLogoClick} />
      </Header>
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
  padding: 150px 0;
`;

const Header = styled.header`
  width: 100vw;
  position: fixed;
  top: 0px;
  padding: 10px 50px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5.9px);
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 100px;
`;

const Loader = styled.div``;

const Container = styled.div`
  width: 1440px;
  @media screen and (max-width: 1600px) {
    width: 90vw;
  }
`;
