export default async function getUserCoord(userLatLng, setUserLatLng, navigate) {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!userLatLng) {
            setUserLatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        (error) => {
          if (error.code === 1) {
            alert(
              "Allow access to Windows Location \n Go to Windows settings > Location > Enable location + Enable apps can access location"
            );
            getLocation();
          } else {
            console.error("Error getting user location:", error);
            getLocation();
          }
          console.error("Error getting user location:", error);
          getLocation();
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      navigate("/");
    }
  }
  getLocation();
}
