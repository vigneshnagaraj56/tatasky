//=============================================================================================
environment = "live";
//=============================================================================================
tataConfig = {
    getCustomerDetails: {
        local:"Endpoint",
        live:"Endpoint",
        functionName:"test"
    }
}
//=============================================================================================
zappyconfig = {"environment":environment}
//=============================================================================================
if(zappyconfig.environment == "live")
{
    var tatasky =
    { 
        getCustomerDetails: function (req_data)
        {
            return new Promise(function(resolve, reject)
		    {
                 ZOHO.CRM.FUNCTIONS.execute(getCustFunc, req_data).then(function (apidata) {
                     resolve(apidata);
                 })
                .catch(function(error)
                {
                    reject(error);
                });
            })
        },
        // find device using customer id
        findDeviceUsingCID: function (req_data)
        {
            return new Promise(function(resolve, reject)
		    {
                ZOHO.CRM.HTTP.post(req_data).then(function (apidata) {
                     resolve(apidata);
                 })
                .catch(function(error)
                {
                    reject(error);
                });
            })
        }
    }
}