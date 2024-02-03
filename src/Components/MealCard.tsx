import styled from "styled-components";
import { IMeal } from "../api";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { gridState } from "../atoms";

const MealCard = ({ meal }: IMealCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const grid = useRecoilValue(gridState);

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
          <Image src={meal.strMealThumb} alt={"이미지"} ref={imgRef} animate={{ y: 0 }} whileHover={{ y: -10 }} />
          <Title>{meal.strMeal}</Title>
        </Container>
      ) : (
        <LazyLoader grid={grid} ref={imgRef}>
          Loading...
        </LazyLoader>
      )}
    </Wrapper>
  );
};

export default MealCard;

const Wrapper = styled(motion.div)``;

const Container = styled(motion.div)`
  width: 100%;
`;

const Image = styled(motion.img)`
  border-radius: 10px;
  width: 100%;
  height: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
  @media screen and (max-width: 1600px) {
    font-size: 16px;
  }
`;

const LazyLoader = styled.div<{ grid: number }>`
  background-color: lightgray;
  width: 100%;
  height: grid;
`;

interface IMealCardProps {
  meal: IMeal;
}
