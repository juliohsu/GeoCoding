document.querySelector("#form").addEventListener("submit", search);

function search(e) {
  e.preventDefault();

  var location = document.querySelector("#search-input").value;

  axios
    .get("http://api.positionstack.com/v1/forward", {
      params: {
        access_key: "9480b94c7c88a79c5c4e7eb2fb99f0ef",
        query: location,
      },
    })
    .then(function (response) {
      var output = "";

      var data = response.data.data;

      data.forEach(function (location) {
        output += `
        <div class="card text-white bg-secondary mb-3" id="card">
        <div class="card-header">${location.continent}, ${location.country}</div>
        <div class="card-body">
          <h4 class="card-title">${location.name} - ${location.region_code}</h4>
          <p class="card-text">
          Type of location: ${location.type}<br>
          Lat: ${location.latitude}<br>
          Lng: ${location.longitude}<br><br>
          ${location.label}</p>
        </div>
        </div>
        `;
      });

      document.querySelector(".display-div").innerHTML = output;
    })
    .catch(function (e) {
      console.log(e);
    });

  document.querySelector("#search-input").value = "";
}
