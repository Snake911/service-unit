function init() {
    
    let zoom = 3.2;

    if(window.innerWidth < 1000) {
        zoom = 2.7;
    } else if(window.innerWidth < 1250) {
        zoom = 3.2;
    }

    // Создаем карту.
    var map = new ymaps.Map('projects_map', {
        center: [70, 105],
        zoom,
        type: null,
        controls: []
    }, {
        // restrictMapArea: true,
        suppressMapOpenBlock: true,
        avoidFractionalZoom: false,
    });

    // map.events.add('boundschange', function(e){
    //     const newZoom = e.get('newZoom'); 
    //     const oldZoom = e.get('oldZoom'); 
    //     if (newZoom !== oldZoom) {
    //         if(newZoom < oldZoom && newZoom - zoom < 1) {
    //             map.setZoom(zoom)
    //         }            
    //     }
    // })

    // map.behaviors.disable('scrollZoom');
    // Добавляем фон.
    var pane = new ymaps.pane.StaticPane(map, {
        zIndex: 100, css: {
            width: '100%', height: '100%', backgroundColor: '#fff'
        }
    });
    map.panes.append('greyBackground', pane);   

    // Загружаем и добавляем регионы России на карту.
    ymaps.borders.load('RU', {
        lang: 'ru'
    }).then(function (result) {
        regions = new ymaps.GeoObjectCollection(null, {
            fillColor: '#F3F3F3',
            strokeColor: '#8F8F8F',
            hasHint: false,
            cursor: 'default'
        });
        for (var i = 0; i < result.features.length; i++) {
            regions.add(new ymaps.GeoObject(result.features[i]));
        }

        map.geoObjects.add(regions);
    });
    
    // const placemarkers = JSON.parse(sessionStorage.getItem("placemarkersProjects"));

    const placemarkers = {
        "0": {
            "LAT": "55.562816",
            "LON": "41.992175",
            "NAME": "АО Муромский стрелочный завод",
            "TEXT": "Производство стрелочной продукции для железнодорожного транспорта 3xJGS420",
            "LINK": "/projects/detail.html"
        }
    }

    for(key in placemarkers) {
        if(placemarkers[key].LAT && placemarkers[key].LON) {
            var placemarker = new ymaps.Placemark([placemarkers[key].LAT, placemarkers[key].LON], {                
                balloonContentHeader: placemarkers[key].NAME,
                balloonContentBody: `<div style="padding-bottom: 15px">${placemarkers[key].TEXT}</div>`,
                balloonContentFooter: `<a href="${placemarkers[key].LINK}" class="more">Подробнее</a>`,
            }, 
            {
                iconLayout: 'default#image',
                iconImageHref: 'images/placemarker.svg',
                iconImageSize: [20, 30],
                iconImageOffset: [0, -42],
                balloonPanelMaxMapArea: 0,
                balloonMaxWidth: 270,
            }
            );
            map.geoObjects.add(placemarker);
        }
    }

    map.events.add('click', function (e) {
        map.balloon.close();       
    });
}

ymaps.ready().then(init);
