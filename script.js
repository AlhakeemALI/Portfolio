let mX = 0;
let mY = 0;
const z = 100;
let ripple;

// MOUSE CIRCLE
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCirclefn = (x, y) => {
  mouseCircle.style.cssText = `top:${y}px; left: ${x}px; opacity: 1`;
  mouseDot.style.cssText = `top:${y}px; left: ${x}px; opacity: 1`;
};

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

document.addEventListener("scroll", () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");
  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }
});

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});

// ANIMATED CIRCLES
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

// const animatCircles = (e, x, y) => {
//   if (x < mX) {
//     circles.forEach((circle) => {
//       circle.style.left = `${z}px`;
//     });
//     mainImg.style.left = `${z}px`;
//   } else if (x > mX) {
//     circles.forEach((circle) => {
//       circle.style.left = `-${z}px`;
//     });
//     mainImg.style.left = `-${z}px`;
//   }

//   if (y < mY) {
//     circles.forEach((circle) => {
//       circle.style.top = `${z}px`;
//     });
//     mainImg.style.top = `${z}px`;
//   } else if (y > mY) {
//     circles.forEach((circle) => {
//       circle.style.top = `-${z}px`;
//     });
//     mainImg.style.top = `-${z}px`;
//   }
//   mX = e.clientX;
//   mY = e.clientY;
// };

// document.body.addEventListener("mousemove", (e) => {
//   let x = e.clientX;
//   let y = e.clientY;
//   mouseCirclefn(x, y);
//   animatCircles(e, x, y);
// });

// document.body.addEventListener("mouseleave", () => {
//   mouseCircle.style.opacity = "0";
//   mouseDot.style.opacity = "0";
// });

// MAIN BUTTON

const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

const aboutMeText = document.querySelector(".about-me-text");

const aboutMeTextContent =
  "I am a Full Stack Developer with a passion for creating highly performant applications that solve real-world problems and provide users with an awesome experience.";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});

//Project

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });
  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });
});

// const formHeading = document.querySelector(".form-heading");
// const formInputs = document.querySelectorAll(".contact-form-input");

// formInputs.forEach((input) => () => {
//   input.addEventListener("focus", (e) => {
//     e.formHeading.style.opacity = "0";
//     setTimeout(() => {
//       e.formHeading.textContent = `Your ${input.placeholder}`;
//       formHeading.style.opacity = "1";
//     }, 300);
//   });
// });

const slideShow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideShow.firstElementChild;
  const thirdIcon = slideShow.children[3];
  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");
  firstIcon.classList.add("faded-out");
  setTimeout(() => {
    slideShow.removeChild(firstIcon);
    slideShow.appendChild(firstIcon);
    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);

const form = document.querySelector(".contact-form");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const textArea = document.getElementById("message");

const messages = document.querySelectorAll(".message");

const error = (input, message) => {
  input.nextElementSibling.classList.add("error");
  input.nextElementSibling.textContent = message;
};

const success = (input) => {
  input.nextElementSibling.classList.remove("error");
};
const cheakrequirdFields = (inputArr) => {
  inputArr.forEach((input) => {
    //console.log(input.id);
    if (input.value.trim() === "") {
      // error(input, input.id);
      error(input, `${input.id} is required`);
    } else {
      success(input);
    }
  });
};

const cheklength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id}must be at least ${min}characters`);
  }
};

const checkemail = (input) => {
  const reqEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reqEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, `Email is not valid`);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cheakrequirdFields([userName, email, subject, textArea]);
  cheklength(userName, 2);
  cheklength(subject, 2);
  cheklength(textArea, 10);
  checkemail(email);
});
