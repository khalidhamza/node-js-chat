const moment = require('moment');

/**
 * Message Format
 * 
 * @param string username 
 * @param string message 
 * 
 * @return object messageFormat
 */
function messageFormat(username, message){
    return {
        username,
        text:message,
        time: moment().format('hh:mm A'),
    }
}

module.exports  = messageFormat;