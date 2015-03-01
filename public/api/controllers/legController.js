exports.newRegistration = function (req, res, next) {

};

exports.getRegistrations = function (req, res, next) {

};

exports.getAllLegs = function (req, res, next) {
    var legData =[{
        name: 1,
        distance: 1100,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK1Sthans.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK1Sthans.png"
    }, {
        name: 2,
        distance: 1070,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK2Sthans.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK2Sthans.png"
    }, {
        name: 3,
        distance: 600,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK3.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK3.png"
    }, {
        name: 4,
        distance: 1840,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK4.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK4.png"
    }, {
        name: 5,
        distance: 1260,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK5.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK5.png"
    }, {
        name: 6,
        distance: 1240,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK6.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK6.png"
    }, {
        name: 7,
        distance: 1790,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK7.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK7.png"
    }, {
        name: 8,
        distance: 1810,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK8.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK8.png"
    }, {
        name: 9,
        distance: 630,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK9.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK9.png"
    }, {
        name: 10,
        distance: 2840,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK10.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK10.png"
    }, {
        name: 11,
        distance: 1530,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK11.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK11.png"
    }, {
        name: 12,
        distance: 370,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK12.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK12.png"
    }, {
        name: 13,
        distance: 1080,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK13.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK13.png"
    }, {
        name: 14,
        distance: 840,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK14.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK14.png"
    }, {
        name: 15,
        distance: 610,
        link: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK15.png",
        image: "http://holmenkollstafetten.no/wp-content/uploads/2014/11/HK15.png"
    }];
    res.send(legData);
};