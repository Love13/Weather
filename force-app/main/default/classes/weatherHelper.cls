public with sharing class weatherHelper {

    // @AuraEnabled
    // public static String getWeather(String latitude, String longitude){
    @AuraEnabled
    public static String getWeather(String latitude, String longitude){

        String url = 'https://api.darksky.net/forecast/a6c047a27db8a400e982a38809aca9a9/' + latitude + ',' + longitude + '?units=si';
        
        system.debug('url');
        system.debug(url);

        return weatherHelper.fetch(url);
    }

    public static String fetch(String url){

        HttpRequest req = new HttpRequest();
        req.setEndpoint( url );
        req.setMethod('GET');
        
        return Test.isRunningTest() ? '{ "Running": "Test" }' : new Http().send( req ).getBody();
    }

}