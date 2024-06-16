const bottleImg = document.querySelector('.bottle-img');
const textElement = document.querySelector('.image1-container');
let initialWidth = 32;
let topValue = 50;

let initialRotation = 358; // Starting rotation
let maxRotation = 360; // Maximum rotation to reach vertical alignment
let minRotation = 0; // Minimum rotation to reach vertical alignment
let scrollThreshold = 500; // Threshold to stop rotation

let transformValue = 0;
console.log(
  'document.documentElement.scrollHeight',
  document.documentElement.scrollHeight
);

let previousScrollY = window.scrollY;
let differenceWithinRange = true;
let lastScrollY = window.scrollY;
let lastTopValue = 0;
window.addEventListener('scroll', () => {
  const textRect = textElement.getBoundingClientRect();
  const bottleRect = bottleImg.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const scrollPercentage =
    scrollTop / (document.documentElement.scrollHeight - viewportHeight);

  let newRotation = initialRotation - scrollPercentage * 18;
  let newWidth = initialWidth - scrollPercentage * 15;

  // let newTop = Number.parseInt(window.scrollY);
  let newTop = Number.parseInt(window.scrollY) + scrollPercentage * 20 + 100;
  // console.log('window', window.innerHeight, { textRect }, { bottleRect });
  topValue = newTop; // Adjust topValue based on scroll position

  // let verticalDifference = bottleRect.bottom - textRect.top;
  // console.log({ verticalDifference });
  // // if (
  // //   verticalDifference <= 40 ||
  // //   (verticalDifference > 40 && scrollTop < previousScrollY)
  // // ) {
  // //   topValue = newTop;
  // //   bottleImg.style.top = `${topValue}px`;
  // // }

  // if (verticalDifference < 40) {
  //   topValue = newTop;
  //   bottleImg.style.top = `${topValue}px`;
  // }

  if (newRotation > 346) transformValue = `rotate(${newRotation}deg)`;
  bottleImg.style.cssText += `transform: ${transformValue} !important;`;

  let verticalDifference = bottleRect.bottom - textRect.top;
  // if (verticalDifference <= 40) {
  //   differenceWithinRange = true;
  // }
  if (verticalDifference < 30 && differenceWithinRange) {
    // let direction = scrollTop - lastScrollY;
    // topValue += direction > 0 ? 1 : -1;
    bottleImg.style.top = `${topValue}px`;
    bottleImg.style.cssText += `width:${newWidth}% !important`;
    console.log(
      'IF',
      window.scrollY,
      bottleRect,
      textRect,
      topValue,
      'newWidth',
      newWidth,
      verticalDifference
    );
    lastTopValue = topValue;
  } else {
    differenceWithinRange = false;
    console.log(
      'ELSE',
      window.scrollY,
      bottleRect,
      textRect,
      verticalDifference
    );
  }

  // if (
  //   window.scrollY < lastScrollY &&
  //   bottleRect.top >= 0 &&
  //   bottleRect.bottom < window.innerHeight
  // ) {
  //   let direction = scrollTop - lastScrollY;
  //   console.log(
  //     { direction },
  //     { lastTopValue },
  //     window.innerHeight - window.scrollY,
  //     window.innerHeight - lastTopValue,
  //     lastTopValue - window.scrollY
  //   );
  // }

  if (window.scrollY < lastScrollY && window.scrollY <= lastTopValue) {
    console.log('PAKDA');
    // topValue = lastTopValue;
    let lastTopValue =
      Number.parseInt(window.scrollY) + scrollPercentage * 20 + 100;
    bottleImg.style.top = `${lastTopValue}px`;
    bottleImg.style.cssText += `width:${newWidth}% !important`;
    differenceWithinRange = true;
  }

  lastScrollY = scrollTop;

  // if (parseInt(bottleRect.bottom - textRect.top) < 40) {
  //   bottleImg.style.top = `${topValue}px`;
  //   console.log(
  //     'IF',
  //     window.scrollY,
  //     bottleRect,
  //     textRect,
  //     parseInt(bottleRect.bottom - textRect.top)
  //   );
  // } else {
  //   console.log(
  //     'ELSE',
  //     window.scrollY,
  //     bottleRect,
  //     textRect,
  //     parseInt(bottleRect.bottom - textRect.top)
  //   );
  // }
  // previousScrollY = scrollTop; // Update the previous scroll position
});
