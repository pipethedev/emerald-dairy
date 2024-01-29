import { RefObject } from "react";

export const checkInView = ({
  containerRef,
  elementRef,
}: {
  containerRef: RefObject<HTMLElement>;
  elementRef: RefObject<HTMLElement>;
}) => {
  let elementTop,
    elementBottom,
    elementLeft,
    elementRight = 0;
  let containerTop,
    containerBottom,
    containerLeft,
    containerRight = 0;

  let inViewVertical,
    inViewHorizontal = false;

  const elementCurrentRef = elementRef?.current;
  const containerCurrentRef = containerRef?.current;

  if (!(elementCurrentRef && containerCurrentRef)) return;

  elementTop = elementRef.current?.offsetTop;

  if (elementTop) {
    elementBottom = elementTop + elementCurrentRef?.clientHeight;
    containerTop = containerCurrentRef?.scrollTop;
  }

  if (containerTop) {
    containerBottom = containerTop + containerCurrentRef?.clientHeight;
  }
  elementLeft = elementCurrentRef?.offsetLeft;
  if (elementLeft) {
    elementRight = elementLeft + elementCurrentRef?.clientWidth;
    containerLeft = containerCurrentRef?.scrollLeft;
  }
  if (containerLeft) {
    containerRight = containerLeft + containerCurrentRef?.clientWidth;
  }

  let offsetVertical: "top" | "bottom" | undefined = undefined;
  if (elementBottom && containerTop && containerBottom) {
    if (elementBottom < containerTop) offsetVertical = "top";
    if (elementTop > containerBottom) offsetVertical = "bottom";
  }

  let offsetHorizontal: "top" | "bottom" | undefined = undefined;
  if (containerLeft) {
    if (elementRight < containerLeft) offsetHorizontal = "top";
    if (elementLeft > containerRight) offsetHorizontal = "bottom";
  }

  if (containerTop && containerBottom && elementBottom)
    inViewVertical =
      (elementTop >= containerTop && elementBottom <= containerBottom) ||
      (elementTop < containerTop && containerTop < elementBottom) ||
      (elementTop < containerBottom && containerBottom < elementBottom);

  if (containerLeft && elementRight && containerRight)
    inViewHorizontal =
      (elementLeft >= containerLeft && elementRight <= containerRight) ||
      (elementLeft < containerLeft && containerLeft < elementRight) ||
      (elementLeft < containerRight && containerRight < elementRight);

  return {
    inViewVertical,
    offsetVertical,
    inViewHorizontal,
    offsetHorizontal,
  };
};

// LOCAL_STORAGE
export const addItemToLocalStorage = ({
  name,
  item,
}: {
  name: string;
  item: any;
}) => {
  localStorage.setItem(name, item);
};

export function getItemFromLocalStorage(name: string) {
  return localStorage.getItem(name);
}

export const removeItemFromLocalStorage = (name: string) => {
  console.log("removing");
  return localStorage.clear();
};
