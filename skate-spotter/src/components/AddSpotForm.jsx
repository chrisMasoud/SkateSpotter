import React from "react";

export default function AddSpotForm() {
  return (
    <form>
      <input type="text" placeholder="Enter Spot Name" />
      <input type="number" placeholder="Enter Latitude" />
      <input type="number" placeholder="Enter Longitude" />
      <input type="number" placeholder="Enter Spot Rating" />
      <textarea placeholder="Enter Spot Description" />
      <label htmlFor="spotImage">Upload Spot Image: </label>
      <input type="file" id="spotImage" name="spotImage" accept="image/*" />
      <input type="submit" value="Submit" />
    </form>
  );
}
