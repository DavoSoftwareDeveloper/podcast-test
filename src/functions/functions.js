
export function convertText(txtData) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    txtData = txtData.replace(urlRegex, '<a href="$1">$1</a>');

    var urlRegex2 =/(\b(\swww).[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    txtData = txtData.replace(urlRegex2, ' <a href="$1">$1</a>');

    var urlRegex3 =/(>\swww)/ig;
    txtData = txtData.replace(urlRegex3, '>www');

    var urlRegex4 =/(\"\swww)/ig;
    txtData = txtData.replace(urlRegex4, '"http://www');

    return txtData;
}


  export const handleTime = (date) => {
    let millisHours = (date / 1000 / 60 / 60).toString()
    let hours = millisHours.split(".")[0]

    let hoursRest = hours * 60 * 60 * 1000
    let minutes = ((date - hoursRest)/ 1000 / 60 ).toString().split(".")[0] 

    let restaMinutes = date - (minutes*60*1000)
    let seconds = (restaMinutes / 1000).toString()

    return (
     `${hours}:${minutes.length < 2 ?`0${minutes}`:minutes }:${seconds.length < 2 ?`0${seconds}`:seconds.substring(0,2)}`
    )
  }

  export const handleTitle = (title) => {
    const barra = title.indexOf("|")
    const barraInclinada = title.indexOf("/")

    if ( barraInclinada > 0 ) { return title.split("/")[1]}
    else if ( barra > 0 ) {  return title.split("|")[1]}
    else return title
  }
