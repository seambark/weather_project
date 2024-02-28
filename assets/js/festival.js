const festivalList = [
    {
        title : "강진청자축제",
        date : "2024.02.23 ~ 2024.03.03",
        place : "대구면 고려청자요지",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240215_267%2F1707961369844mPtbk_JPEG%2F110_24695740_manual_image_url_1707961369220.jpg"
    },
    {
        title : "네이처파크 스윗윈터페스티벌",
        date : "2024.01.08 ~ 2024.03.03",
        place : "네이처파크",
        img : "https://search.pstatic.net/common?type=n&size=174x250&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240126_55%2F1706232339698syHAa_JPEG%2F3089059_image2_1.jpg"
    },
    {
        title : "홍성남당항 새조개축제",
        date : "2024.01.20 ~ 2024.03.30",
        place : "홍성남당항 일원",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240109_265%2F17047642212977TAql_JPEG%2F110_1909048_manual_image_url_1704764221280.jpg"
    },
    {
        title : "이월드 라라랜드",
        date : "2024.02.24 ~ 2024.05.31",
        place : "이월드",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240219_109%2F1708305232120pGAx9_PNG%2F3100279_image2_1.png"
    },
    {
        title : "청도 프로방스 빛축제",
        date : "2024.02.19 ~ 2024.11.17",
        place : "청도프로방스",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240221_83%2F1708480545007wNENr_JPEG%2F3102592_image2_1.jpg"
    },
    {
        title : "만수천 빛의거리",
        date : "2024.02.01 ~ 2024.12.31",
        place : "인천광역시 남동구 만수복개천2 공영 주차장",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240219_192%2F1708305778064Ikdja_JPEG%2F3099892_image2_1.jpg"
    },
    {
        title : "서창별빛거리",
        date : "2024.01.03 ~ 2024.12.07",
        place : "인천광역시 남동구",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231205_8%2F1701746524343VfwMK_JPEG%2F110_29568231_manual_image_url_1701746524305.jpg"
    },
    {
        title : "생생국가유산 중랑구 체험학습 (생생문화재)",
        date : "2024.01.03 ~ 2024.12.07",
        place : "서울특별시 중랑구 망우 역사 문화공원",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240105_133%2F1704438493056UGadP_JPEG%2F110_26445692_manual_image_url_1704438493036.jpg"
    }

];


let festivialListTag = document.querySelector('#festivial_list');

var swiper = new Swiper(".festival_area", {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    breakpoints: {
        1024: {
            slidesPerView: 5,
            spaceBetween: 10,
        },
        769: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        360: {
            slidesPerView: 1,
            spaceBetween: 5,
            pagination: {
                el: ".swiper-pagination",
                type: 'fraction',
            },
        },
    },
  });

  const festivalData = () => {

    // 날짜 체크
    festivalRender()
  }


  const festivalRender = () => {
    let listHtml = ``;

    festivalList.map((f) => {
        console.log(f)
        return (listHtml += `
            <li class="swiper-slide">
                <div class="info">
                    <span class="img">
                        <img src="${f.img}" alt="">
                    </span>
                    <span class="txt">
                        <dl>
                            <dt class="title">${f.title}</dt>
                            <dd>
                                <span class="subtitle">기간</span>
                                <span class="description">${f.date}</span>
                            </dd>
                            <dd>
                                <span class="subtitle">장소</span>
                                <span class="description">${f.place}</span>
                            </dd>
                        </dl>
                    </span>
                </div>
            </li>
        `)
    } )

    festivialListTag.innerHTML = listHtml;
}

festivalData();