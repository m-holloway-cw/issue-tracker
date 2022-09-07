const axios = require('axios')
let response;

let apiKey = process.env.APIKEY;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        issueName = event["name"];
        issueType = event["type"];
        issueDesc = event["desc"];
        if(issueName == undefined || issueType == undefined || issueDesc == undefined){
            var respError = {
                'statusCode': 500,
                'body': JSON.stringify({
                    data: {"error":"Missing data values"}
                })
            }
            return respError;
        }
        var json = {'name': issueName, 'type': issueType, 'desc': issueDesc};

        var config = {
            method: 'post',
            url: 'https://mholloway.dev/api/issues',
            headers: {
                'Authorization': `${apiKey}`
            }, 
            data: json
        }
        var dataOut;
        var serverResponse = '';
        await axios(config).then(function(response){
            dataOut = response.data;
            serverResponse = {
                'statusCode': 200,
                'body': JSON.stringify({
                    data: dataOut
                })
            }
        }).catch(function(err){
            console.log(err);
            dataOut = err;
            serverResponse = {
                'statusCode': 500,
                'body': JSON.stringify({
                    data: dataOut
                })
            }
        });


    } catch (err) {
        console.log(err);
        return err;
    }

    return serverResponse
};
