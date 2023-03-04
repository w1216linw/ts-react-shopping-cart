import { useRef } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useGetCategoriesQuery } from "../features/productApi/apiSlice";

const Scroller = () => {
  const { data, isFetching, isSuccess } = useGetCategoriesQuery(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  let body;
  if (isFetching) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  } else if (isSuccess) {
    body = data.map((cate: string) => (
      <div className="category" key={cate}>
        {cate}
      </div>
    ));
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft +=
        containerRef.current.getBoundingClientRect().width - 100;
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -=
        containerRef.current.getBoundingClientRect().width - 100;
    }
  };

  return (
    <article className="scroll-wrapper flex-group">
      <button className="scroll-btn left | fs-500" onClick={scrollLeft}>
        <MdArrowBackIosNew />
      </button>
      <div ref={containerRef} className="categories-container snap-inline">
        {body}
      </div>
      <button className="scroll-btn right | fs-500" onClick={scrollRight}>
        <MdArrowForwardIos />
      </button>
    </article>
  );
};

export default Scroller;
