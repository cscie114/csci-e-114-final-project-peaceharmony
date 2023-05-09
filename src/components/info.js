import * as React from "react";

// Adding an additional nested Custom Component...

const Info = function(props) {

  let info = "";
  if (props.pageSection === "top") {
    info = "* IMDB Top Movies + Rotten Tomatoes = Overall Sort Order *";
  } else if (props.pageSection === "bottom") {
    info = "Credit: IMDB and Rotten Tomatoes are trademark names of their respective companies. Thanks :-)";
  }

  return (
    <div className="info">
      {info}
    </div>
  );

}

export default Info;
