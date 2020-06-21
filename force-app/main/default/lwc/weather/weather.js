import { LightningElement, api, track } from 'lwc';
import getWeather from '@salesforce/apex/weatherHelper.getWeather';
 
export default class Weather extends LightningElement {

    //'https://api.darksky.net/forecast/a6c047a27db8a400e982a38809aca9a9/29.584452, -81.207870?units=si'
    @track res
    @track lat
    @track long

    currently
    currentlyTemp
    currentlyRainChance
    currentlyUV


    dailySummary
    dailyIcon

    async connectedCallback(){
        
        this.getCoords()

    }

    getCoords() {

        console.log('running...get coords')

        navigator.geolocation.getCurrentPosition(
            (position) => {

              this.lat = position.coords.latitude.toString();
              this.long = position.coords.longitude.toString();


              this.init()

            },
            (e) => {
              console.log(e.message);
            },
            {
              enableHighAccuracy: true,
            }
          );
    }

    async init() {

        try {

            console.log('running...get weather')

            let weather = await getWeather({latitude: this.lat, longitude:this.long})
            this.res = JSON.parse(weather)
           
            console.log(JSON.parse(JSON.stringify(this.res)))

            this.currently              = this.res.currently.summary
            this.currentlyTemp          = this.res.currently.temperature
            this.currentlyRainChance    = this.res.currently.precipProbability
            this.currentlyUV            = this.res.currently.uvIndex

            this.dailySummary   = this.res.hourly.summary
            this.dailyIcon      = this.res.hourly.icon

        } catch (e) {
            console.log('uh ohh')
            console.log(e)
        }

    }

    success(position){
        console.log('success')
        console.log(JSON.parse(JSON.stringify(position)))
    }

    error(e){
        console.log('error')
        console.log(e)
    }

}


// handleCurrencyConversion() {
//     fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' 
//                 + this.fromCurrencyValue + '&to_currency=' + this.toCurrencyValue + '&apikey=4W7NZUQNJ061YHHF', // End point URL
//     {
//         // Request type
//         method:"GET",