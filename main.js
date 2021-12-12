"use strict";
// 스크롤 시 navbar 색상 변경
const navbar = document.getElementById("nav");
const navbarHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight - 70) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// 네비게이션 클릭 시 이동
const navbarMenu = document.querySelector(".nav__list");
navbarMenu.addEventListener("click", event => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

// scrollIntoView 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// 스크롤 했을 때 네비게이션 list의 색 변경

const sectionIds = ["#home", "#inform", "#variation", "#vaccine", "#contact"];
// sectionIds 배열의 각 항목에 해당하는 섹션을 배열로 받아온다
const sections = sectionIds.map(id => document.querySelector(id));
// 속성이 data-link인 항목(nav list)을 배열로 받아온다.
const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

// 현재 선택된 nav index
let selectedNavIndex = 0;
// 현재 선택된 nav 요소
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  // 기존에 선택되어 있던 요소의 active 클래스 제거
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  // 새롭게 선택된 요소에 active 클래스 추가
  selectedNavItem.classList.add("active");
}

// 스크롤 했을 때, section 클래스의 높이값을 받아오고, 이에 따른 네비게이션 리스트 색상 변경
const observerOptions = {
  root: null, // 기본적으로 viewport 사용
  rootMargin: "0px", // viewport의 마진은 0
  threshold: 0.3, // 0.3의 비율이 viewport에 보여진다면 함수를 실행한다.
};

//
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // 요소가 화면 밖으로 나가는 경우 && 요소가 화면 안에 보이는 경우에만 실행
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 현재 화면에 보이는 요소의 index
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라오는 경우
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1; // index 바로 다음의 섹션 선택
      } else {
        //페이지가 내려가는 경우
        selectedNavIndex = index - 1; // index 이전의 섹션 선택
      }
    }
  });
};

// observer 객체 생성
const observer = new IntersectionObserver(observerCallback, observerOptions);
// sections의 각 항목에 대해 observe 메소드 실행
sections.forEach(section => observer.observe(section));

// window에 wheel 이벤트가 발생할 경우
window.addEventListener("wheel", () => {
  // scroll이 가장 위로 되어 있을 때
  if (window.scrollY === 0) {
    // selectedNavIndex를 0으로 지정하여 home에 active 추가
    selectedNavIndex = 0;
  } else if (
    // scroll이 가장 밑에 도달 했을 경우
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    // selectedNavIndex가 navItems의 마지막 항목을 가리키도록 지정
    selectedNavIndex = navItems.length - 1;
  }
  // navItems 배열의 선택된 index에 클래스 삭제 및 추가
  selectNavItem(navItems[selectedNavIndex]);
});

// 이미지 다운로드 금지
function notDownload() {
  alert("오른쪽 클릭을 사용할 수 없습니다.");
  return false;
}

document.oncontextmenu = notDownload;

// inform 버튼 클릭 시 이동
function btnClick() {
  let ans = prompt("페이지를 이동하시겠습니까? (Y/N)");
  if (ans === "N" || ans === "n") {
    alert("페이지 이동을 취소합니다.");
    return false;
  } else if (ans === "Y" || ans === "y") {
    window.open("http://ncov.mohw.go.kr/");
  } else {
    alert("잘못 입력하셨습니다.");
    return false;
  }
}

// 변이 바이러스 출력

// variation 클래스 생성
class variation {
  constructor(direction, time, title, content) {
    this.direction = direction;
    this.time = time;
    this.title = title;
    this.content = content;
  }

  // list 태그를 생성하는 함수
  createList() {
    var cardWrapper = document.querySelector(".card-wrapper__list");
    var newList = document.createElement("li");
    newList.innerHTML =
      '<div class="card ' +
      this.direction +
      '"> <h2 class="date">' +
      this.time +
      "</h2> <h1>" +
      this.title +
      "</h1> <p>" +
      this.content +
      "<br /><br /> </p> </div>";

    cardWrapper.appendChild(newList);
  }
}

// variation 클래스를 사용하여 객체 생성하기
const alpha = new variation(
  "left",
  "England, ‘20.9",
  "Alpha-coronavirus",
  "전파력 1.5배 증가<br /> 백신을 회피하는 돌연변이 특성 E484K를 획득하고, 69, 70번스파이크의 소멸로 백신을 회피하는 능력 보유"
);
const beta = new variation(
  "right",
  "RSA, ‘20.5",
  "Beta-coronavirus",
  "알파 변이와 마찬가지로 돌연변이 보유하여 백신을 회피<br />+ 면역력을 감소시키는 능력도 보유하여 인체에서 자동으로 생성되는 항체는 물론 항체 약물의 효과까지 감소시킴<br /><br />전염성이 낮은 편에 속하여 현재는 다른 변이와의 경쟁에서 밀려나 감염세가 하락함"
);
const gamma = new variation(
  "left",
  "Brazil, ‘20.11",
  "Gamma-coronavirus",
  "알파 변이의 감염력, 베타 변이의 항체 파괴력을 모두 보유<br />+ 일반 코로나 바이러스의 전염성 +150%, 치사율 +45%<br><br> 감마 변이까지는 <span>기존의 바이러스와 동일한 증상</span>을 보임"
);
const delta = new variation(
  "right",
  "India, ‘20.10",
  "Delta-coronavirus",
  "2배 이상의 전염률, 2배의 입원가능성, 4배의 중증악화율, 2.5배의 사망률을 보임<br />+ 1200배에 달하는 바이러스 양, 뉴클리오캡시드 단백질 변이로 인해 돌파 감염 발생<br /><br /><span>기침, 콧물, 두통, 재채기</span>를 유발하는 것으로 기존의 증상과는 차이를 보임"
);
const omicron = new variation(
  "left",
  "Botswana, ‘21.11",
  "Omicron-coronavirus",
  "스파이크 단백질에 32개의 변이가 있어 약물저항이 가장 높을 것으로 보이고,<br> 전파력 또한 델타 바이러스의 2배 정도일 것으로 보임<br><br>기존의 증상과는 달리 인후통과 후각, 미각의 상실이 없고,<br> <span>마른 기침과 열, 그리고 극심한 피로감</span>이 증상의 양상"
);

// 클래스 메소드를 통해 list 태그 생성
alpha.createList();
beta.createList();
gamma.createList();
delta.createList();
omicron.createList();

// 최종 수정 시간
const now = document.getElementsByClassName("now");
var time = document.lastModified;

// 클래스가 now인 태그의 내용을 최종 수정시간으로 변경
function changeToHour() {
  now[0].innerHTML = time;
  now[0].style.left = 45.2 + "%";
}

// 클래스가 now인 태그의 내용을 'NOW'로 변경
function changeToNow() {
  now[0].innerHTML = "NOW";
  now[0].style.left = 48.8 + "%";
}

// 백신 아이콘 마우스 오버 시 정보 제공
// 화이자
const vaccinePf = document.getElementsByClassName("vaccine__question__pf");
const contentPf = document.getElementsByClassName("vaccine__content--pf");
const titlePf = document.getElementsByClassName("pf__title--h3");

vaccinePf[0].addEventListener("mouseover", () => {
  contentPf[0].style.display = "block";
  titlePf[0].style.borderBottom = "3px solid #ff7657";
});

vaccinePf[0].addEventListener("mouseout", () => {
  contentPf[0].style.display = "none";
  titlePf[0].style.borderBottom = "none";
});

// 모더나
const vaccineMdn = document.getElementsByClassName("vaccine__question__mdn");
const contentMdn = document.getElementsByClassName("vaccine__content--mdn");
const titleMdn = document.getElementsByClassName("mdn__title--h3");

vaccineMdn[0].addEventListener("mouseover", () => {
  contentMdn[0].style.display = "block";
  titleMdn[0].style.borderBottom = "3px solid #ff7657";
});

vaccineMdn[0].addEventListener("mouseout", () => {
  contentMdn[0].style.display = "none";
  titleMdn[0].style.borderBottom = "none";
});

// 아스트라제네카
const vaccineAz = document.getElementsByClassName("vaccine__question__az");
const contentAz = document.getElementsByClassName("vaccine__content--az");
const titleAz = document.getElementsByClassName("az__title--h3");

vaccineAz[0].addEventListener("mouseover", () => {
  contentAz[0].style.display = "block";
  titleAz[0].style.borderBottom = "3px solid #ff7657";
});

vaccineAz[0].addEventListener("mouseout", () => {
  contentAz[0].style.display = "none";
  titleAz[0].style.borderBottom = "none";
});

// 얀센
const vaccineJs = document.getElementsByClassName("vaccine__question__js");
const contentJs = document.getElementsByClassName("vaccine__content--js");
const titleJs = document.getElementsByClassName("js__title--h3");

vaccineJs[0].addEventListener("mouseover", () => {
  contentJs[0].style.display = "block";
  titleJs[0].style.borderBottom = "3px solid #ff7657";
});

vaccineJs[0].addEventListener("mouseout", () => {
  contentJs[0].style.display = "none";
  titleJs[0].style.borderBottom = "none";
});
