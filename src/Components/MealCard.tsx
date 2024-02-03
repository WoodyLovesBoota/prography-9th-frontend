import styled from "styled-components";
import { IMeal } from "../api";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MealCard = ({ meal }: IMealCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {isLoaded ? (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Image src={meal.strMealThumb} alt={"이미지"} ref={imgRef} />
          <Title>{meal.strMeal}</Title>
        </Container>
      ) : (
        <LazyLoader ref={imgRef}>Loading...</LazyLoader>
      )}
    </Wrapper>
  );
};

export default MealCard;

const Wrapper = styled(motion.div)`
  /* width: 10vw;
  width: calc(1080px / 4 - 48px); */
`;

const Container = styled(motion.div)`
  width: 100%;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;

const LazyLoader = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 100%;
`;

interface IMealCardProps {
  meal: IMeal;
}
