import { useEffect } from "react";
import axios from "axios";

declare global {
  interface Window {
    ymaps: any; // Определяем ymaps как глобальную переменную
  }
}

function App() {
  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(init);
    }

    function init() {
      // Создание карты.
      const mapT = new window.ymaps.Map("map", {
        // Координаты центра карты.
        center: [53.902365, 27.561709],
        controls: [],
        // Уровень масштабирования.
        zoom: 7,
      });

      axios
        .get("https://test.acdn.by/api/v1/map/pharmacies")
        .then((res) => {
          // alert(JSON.stringify(res));
          (res.data as { Coordinates: [string, string] }[]).map((p) => {
            mapT.geoObjects.add(
              new window.ymaps.Placemark(
                p.Coordinates,
                {
                  balloonContent: "<strong>серобуромалиновый</strong> цвет",
                },
                {
                  preset: "islands#dotIcon",
                  iconColor: "#735184",
                }
              )
            );
          });
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    }
  }, []);

  return <div id="map" className="flex flex-1"></div>;
}

export default App;
