import styled from "styled-components";
import { IMeal } from "../api";
import { useEffect, useRef, useState } from "react";

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
    <Wrapper>
      {isLoaded ? (
        <img src={meal.strMealThumb} alt={"이미지"} ref={imgRef} />
      ) : (
        <div ref={imgRef} style={{ height: "200px", background: "lightgray" }}>
          Loading...
        </div>
      )}
    </Wrapper>
  );
};

export default MealCard;

const Wrapper = styled.div``;

interface IMealCardProps {
  meal: IMeal;
}
