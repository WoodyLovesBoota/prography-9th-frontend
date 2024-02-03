# 프로그라피 9기 사전과제

## 기술 스택

React, Typescript <br />
Recoil, React-Query, Styled-Components

## 구현

### 전체 카테고리 목록

API를 통해 데이터를 가져온 후 idCategory를 기준으로 오름차순 Sort 한 후 사용하였다. 

useLocation / URLSearchParams를 이용하여 클릭 시 쿼리를 제어하였다. 

- 클릭 : "category"에 해당 카테고리 추가
- 한번 더 클릭 : "category"에서 해당 카테고리 제거

### 음식 화면

URLSearchParams를 통해 유효한 카테고리에 포함된 모든 음식을 가져와 나타내었다. 

<br />

**- 768px 이하 (모바일)** <br />
한줄에 한개의 음식 : flex 레이아웃 통해 구현
<br />

**- 769px 이상** <br />
사용자가 설정 레이아웃 : grid 레이아웃 통해 구현 (한줄에 2개 / 4개)

### lazy loading

useRef()와 IntersectionObserver를 통해 lazy loading을 구현하였다. <br />
사용자의 뷰포트 안에 들어올 때만 img를 렌더링 하고 그 전까진 빈 box를 렌더링 하는 방식으로 구현하였다. 

### 필터링

최신 순, 오름차순, 내림차순을 선택하는 토글을 구현하여 쿼리에 filter을 포함하였다. 

useEffect를 이용하여 filter query 값이 바뀔 때 마다 각각의 옵션에 맞게 데이터를 정렬하였다. 


