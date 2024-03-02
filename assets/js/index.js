let openSearch = document.querySelector(".open_search");
let header = document.querySelector(".header");

openSearch.addEventListener("click", function(){
    header.classList.toggle("active");
});

let locationInput, searchButton;

  locationInput = document.getElementById('location');
  searchButton = document.getElementById('searchButton');


  locationInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  searchButton.addEventListener('click', async () => {
    const city = locationInput.value.trim();

    if (!city) {
      alert('도시 이름을 입력해 주세요.', {
        title: '알림',
        icon: 'warning',
      });
      return;
    }

    try {
      const coordinates = await getCoordinates(city);
      if (!coordinates) {
        alert('도시를 찾을 수 없습니다.', {
          title: '알림',
          icon: 'warning',
        });
        return;
      }
      // call 5 day rendering
      call5DayRender();
      // styling rendering

      // airPollution rendering

      // festival renndering
      


    } catch (error) {
      console.error(error);
      alert('날씨 정보를 불러오는데 실패했습니다. 다시 시도해 주세요', {
        title: '알림',
        icon: 'warning',
      });
    }
  });