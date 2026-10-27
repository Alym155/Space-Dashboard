var sideBarToggle = document.getElementById("sidebar-toggle");
var sideBar = document.querySelector("#sidebar");
var apodImg = document.getElementById("apod-image");
var apodDate = document.getElementById("apod-date-input");
var apodTitle = document.getElementById("apod-title")
var apodDateDetail = document.getElementById("apod-date-detail");
var apodCopyright = document.getElementById("apod-copyright")
var apodExplanation = document.getElementById("apod-explanation")
var apodDateInfo = document.getElementById("apod-date-info")
var apodDateHeading = document.getElementById("apod-date")
var launchesPage = document.getElementById("launches")
var featuredLaunch = document.getElementById("featured-launch")
var launchGrid = document.getElementById("launches-grid")
var planetsCards = document.querySelectorAll(".planet-card")
var planetImg = document.getElementById("planet-detail-image")
var planetName= document.getElementById("planet-detail-name")
var planetDescription= document.getElementById("planet-detail-description")
var planetDistance= document.getElementById("planet-distance")
var planetRadius= document.getElementById("planet-radius")
var planetMass= document.getElementById("planet-mass")
var planetDenisty= document.getElementById("planet-density")
var planetPeriod= document.getElementById("planet-orbital-period")
var planetRotation= document.getElementById("planet-rotation")
var planetMoons= document.getElementById("planet-moons")
var planetGravity= document.getElementById("planet-gravity")
var planetDiscover= document.getElementById("planet-discoverer")
var planetDiscoverDate= document.getElementById("planet-discovery-date")
var planetBody= document.getElementById("planet-body-type")
var planetVolume= document.getElementById("planet-volume")
var planetPerihelion= document.getElementById("planet-perihelion")
var planetAphelion= document.getElementById("planet-aphelion")
var planetEccentricity= document.getElementById("planet-eccentricity")
var planetInclination= document.getElementById("planet-inclination")
var planetAxialTilt= document.getElementById("planet-axial-tilt")
var planetTemp= document.getElementById("planet-temp")
var planetEscape= document.getElementById("planet-escape")

// set date input to today (local time) in yyyy-MM-dd format
var today = new Date();
apodDate.value =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

// show the selected date in the visible label, e.g. "Oct 26, 2026"
var apodDateText = document.getElementById("apod-date-text");
function showDate() {
  if (!apodDate.value) return; // "Clear" empties the input
  var d = new Date(apodDate.value + "T00:00");
  apodDateText.textContent = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
showDate();
apodDate.addEventListener("change", showDate);


// toggle sidebar
sideBarToggle.addEventListener("click", () => {
  sideBar.classList.add("sidebar-open");
});

document.addEventListener("click", (e) => {
  const clickedInside = sideBar.contains(e.target);
  const clickedMenuBtn = sideBarToggle.contains(e.target);
  if (!clickedInside && !clickedMenuBtn)
    sideBar.classList.remove("sidebar-open");
});

// switch pages from the sidebar links
var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".app-section");

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    e.preventDefault(); // stop href="#" jumping to the top
    var name = this.dataset.section;

    // hide all sections, then show the clicked one
    for (var j = 0; j < sections.length; j++) {
      if (sections[j].dataset.section == name) {
        sections[j].classList.remove("hidden");
      } else {
        sections[j].classList.add("hidden");
      }
    }

    sideBar.classList.remove("sidebar-open");
  });
}

// get img
fetch(
  "https://api.nasa.gov/planetary/apod?api_key=fg78fTL6rgtmCnD6hfRGMmWJCdnpTPW89dkLmLqN",
)
  .then((response) => {
    if (!response.ok) throw new Error("NASA API error: " + response.status);
    return response.json();
  })
  .then((result) => {
    apodImg.src = result.url;
    apodTitle.textContent = result.title
    apodDateDetail.innerHTML = '<i class="far fa-calendar mr-2"></i>' + result.date
    apodExplanation.textContent = result.explanation
    apodDateInfo.textContent = result.date
    // "2024-03-14" -> "March 14, 2024"
    var longDate = new Date(result.date + "T00:00").toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    apodDateHeading.textContent = "Astronomy Picture of the Day - " + longDate
    // apodCopyright.textContent = result.copyright ? "© " + result.copyright : "Public Domain"
  })
  .catch((error) => console.log("error", error));


// launches 
async function getLaunches() {
    try{
        let responce = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10")
        let data = await responce.json()
        // console.log(data.results[0]);
        return data.results;
    }catch(error){
        console.log(error);
    }
}

async function displayLaunches(params) {
    var launchDate = new Date(params[0].net);
    var dateText = launchDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    var timeText = launchDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }) + " UTC";
    var daysLeft = Math.ceil((launchDate - new Date()) / 86400000);

    featuredLaunch.innerHTML = `<div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${params[0].status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${params[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${params[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${params[0].rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${daysLeft}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${dateText}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${timeText}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${params[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${params[0].pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${params[0].mission?.description || ""}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    ${params[0].image
                      ? `<img src="${params[0].image.image_url}" alt="${params[0].name}" class="w-full h-full min-h-[400px] object-cover" />`
                      : `<div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>`}
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>


              </div>`

    launchGrid.innerHTML = "";

    for(let i = 1 ; i < params.length ; i++) {
              var cardDate = new Date(params[i].net);
              var cardDateText = cardDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              var cardTimeText = cardDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";

              launchGrid.innerHTML+=`<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                ${params[i].image
                  ? `<img src="${params[i].image.image_url}" alt="${params[i].name}" class="w-full h-full object-cover" />`
                  : `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`}
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${params[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${params[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${params[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${cardDateText}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${cardTimeText}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${params[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${params[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`
    }
}

// planets
async function getPlanets() {
    try{
        let responce = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
        let data = await responce.json()
        console.log(data.bodies[0]);
        return data.bodies;
    }catch(error){
        console.log(error);
    }
}

async function displayPlanets(params) {
    for(let i = 0 ; i< planetsCards.length ; i++){
        planetsCards[i].addEventListener("click",function(e){
            const clickedPlanet = this.dataset.planetId
            console.log(clickedPlanet);

            // find the index of the clicked planet in the API data
            // card ids are English ("earth"), API ids are French ("terre"), so match on englishName
            let index = -1
            for(let j = 0 ; j < params.length ; j++){
                if(params[j].englishName.toLowerCase() == clickedPlanet){
                    index = j
                }
            }
            if(index == -1) return

            // display the data of that planet
            planetImg.src = params[index].image
            planetImg.alt = params[index].englishName
            planetName.textContent = params[index].englishName
            planetDescription.textContent = params[index].description
            planetDistance.textContent = (params[index].semimajorAxis / 1000000).toFixed(1) + "M km"
            planetRadius.textContent = Math.round(params[index].meanRadius).toLocaleString() + " km"
            planetMass.innerHTML = params[index].mass.massValue.toFixed(2) + " × 10<sup>" + params[index].mass.massExponent + "</sup> kg"
            planetDenisty.textContent = params[index].density.toFixed(2) + " g/cm³"
            planetPeriod.textContent = params[index].sideralOrbit.toLocaleString() + " days"
            planetRotation.textContent = params[index].sideralRotation + " hours"
            planetMoons.textContent = params[index].moons ? params[index].moons.length : 0
            planetGravity.textContent = params[index].gravity + " m/s²"
            planetDiscover.textContent = params[index].discoveredBy || "Known since antiquity"
            planetDiscoverDate.textContent = params[index].discoveryDate || "Ancient"
            planetBody.textContent = params[index].bodyType
            planetVolume.innerHTML = params[index].vol.volValue.toFixed(2) + " × 10<sup>" + params[index].vol.volExponent + "</sup> km³"
            planetPerihelion.textContent = (params[index].perihelion / 1000000).toFixed(1) + "M km"
            planetAphelion.textContent = (params[index].aphelion / 1000000).toFixed(1) + "M km"
            planetEccentricity.textContent = params[index].eccentricity
            planetInclination.textContent = params[index].inclination.toFixed(2) + "°"
            planetAxialTilt.textContent = params[index].axialTilt.toFixed(2) + "°"
            // avgTemp is in Kelvin, 0 means no data
            planetTemp.textContent = params[index].avgTemp ? Math.round(params[index].avgTemp - 273.15) + "°C" : "N/A"
            planetEscape.textContent = (params[index].escape / 1000).toFixed(1) + " km/s"
        })
    }
}

async function init() {
    const launches = await getLaunches()
    const palnets = await getPlanets()
    displayLaunches(launches);
    displayPlanets(palnets)

    
}

init()
