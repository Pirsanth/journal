const ISO_STRING_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;


module.exports.sendError = function (res, code, message) {
    res.writeHead(code, {"Content-Type": "application/json"});
    let obj = {error: code, message: message};
    res.end(JSON.stringify(obj));
}

module.exports.consumeReadStream = function (stream, fn) {
    let data = "";

    stream.on("data", function (chunk) {
      data += chunk;
    });
    stream.on("error", function (err) {
      console.log(err);
      fn(err);
    })
    stream.on("end", function () {
      fn(null, data);
    });
}

module.exports.parseISOStringToDate = function (ISOstring) {
    let [,year, month, day, hour, minutes] = ISOstring.match(ISO_STRING_REGEX);
    return new Date(Date.UTC(year, month -1, day, hour, minutes));
};
