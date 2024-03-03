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
    },
    {
        title : "별빛이 흐르는 정원",
        date : "2024.01.01 ~ 2024.12.31",
        place : "경기도 파주시 퍼스트가든",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20220706_143%2F1657104973614IBxFK_JPEG%2F2639353_image2_1.jpg"
    },
    {
        title : "태안 빛축제",
        date : "2023.01.01 ~ 2024.12.31",
        place : "충청남도 태안군 태안빛축제",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20220704_237%2F1656902083149fC3TE_JPEG%2F2445115_image2_1.jpg"
    },
    {
        title : "마노르블랑 봄에 꽃향기축제",
        date : "2024.03.05 ~ 2024.04.14",
        place : "제주특별자치도 서귀포시 마노르블랑",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240227_234%2F1708996906993JD8lr_JPEG%2F3105868_image2_1.jpg"
    },
    {
        title : "이월드 블라썸 피크닉",
        date : "2024.03.16 ~ 2024.04.07",
        place : "대구광역시 달서구 이월드",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240221_231%2F1708500036196QDOEo_JPEG%2F8c8bfd026ab40c1c5d15ccc217e4671c.jpg"
    },
    {
        title : "궁중문화축전",
        date : "2024.04.27 ~ 2024.05.05",
        place : "서울특별시 종로구 궁중문화축전",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240223_123%2F1708651955644wcdb0_JPEG%2F110_3515656_manual_image_url_1708651955624.jpg"
    },
    {
        title : "한국의집 고호재",
        date : "2023.12.12 ~ 2024.03.10",
        place : "서울특별시 중구 한국의집",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231215_74%2F17026266596842zdS7_JPEG%2F3068426_image2_1.jpg"
    },
    {
        title : "남산봉수의식 등 전통문화 재현행사",
        date : "2024.01.01 ~ 2024.12.31",
        place : "서울특별시 종로구 보신각",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20220325_180%2F1648196677839Uo6cm_JPEG%2F110_manual_image_url_1648196677771.jpg"
    },
    {
        title : "파워풀대구페스티벌",
        date : "2024.05.10 ~ 2024.05.12",
        place : "대구광역시 중구 서성네거리",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240220_289%2F17083933334309GbkH_PNG%2F110_1908349_manual_image_url_1708393333345.png"
    },
    {
        title : "광안리 M(Marvelous) 드론 라이트쇼",
        date : "2022.04.02 ~ 2024.12.31",
        place : "부산광역시 수영구 광안리해수욕장",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230607_16%2F1686117859791c3zkK_JPEG%2F4fa408c28cbe7e9c980835292cf58566.jpg"
    },
    {
        title : "오크밸리 3D 라이팅쇼 '소나타오브라이트'",
        date : "2022.01.01 ~ 2024.12.31",
        place : "강원특별자치도 원주시 소나타 오브 라이트",
        img : "https://search.pstatic.net/common?type=n&size=138x200&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20220322_43%2F1647935910139CAHNe_JPEG%2F110_9287529_manual_image_url_1647935910109.jpg"
    }
];

let fillterList = [];
let keyword = '';

const dateFormatChange = (daydate) => {
    let thisDate =  !daydate ? new Date() : new Date(daydate);
    let year = thisDate.getFullYear(); 
    let month = (`0` + (thisDate.getMonth() + 1)).slice(-2);
    let date = (`0` + thisDate.getDate()).slice(-2);
    
    return year + '-' + month + '-' + date;
}

const swiperRender= () => {
    let swiper = new Swiper(".festival", {
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            360: {
                slidesPerView: 1,
                spaceBetween: 7,
                pagination: {
                    el: ".swiper-pagination",
                    type: 'fraction',
                },
            },
        },
      });
}

let festivialListTag = document.querySelector('#festivial_list');

  const listFilter = () => {
    fillterList = [];

    festivalList.filter(e => {
        let dates = e.date;
        let feativalDate = dates.split(' ~ ');
        let dateNow = dateFormatChange();
        let dateStart = dateFormatChange(feativalDate[0]);
        let dateEnd = dateFormatChange(feativalDate[1]);
    
        if(dateNow >= dateStart && dateNow <= dateEnd) {
            fillterList.push(e);
        }
    });

    fillterList.sort(a => {
        return a.place.indexOf(keyword) !== -1 ? -1 : 1;
    })
  }

  const festivalRender = () => {
    let listHtml = ``;

    if(fillterList.length > 0) {
        fillterList.map((f) => {
      
            return (listHtml += `
                <li class="swiper-slide">
                    <div class="info">
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
                        <span class="img">
                            <img src="${f.img}" alt="">
                        </span>
                    </div>
                </li>
            `)
        } );
    } else {
        listHtml = `
            <li class="swiper-slide">
                <div class="no_data">
                    <p>축제 정보가 없습니다.</p>
                </div>
            </li>
        `
    }

    festivialListTag.innerHTML = listHtml;
}

const festivalData = (inputValue) => {
    keyword = inputValue;

    listFilter();
    festivalRender();
    swiperRender();
}

festivalData();