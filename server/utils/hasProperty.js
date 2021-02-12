function hasValidProperty(name){
    return name.hasOwnProperty('valid');
}

function hasStatusProperty(name){
    return name.hasOwnProperty('status');
}

function hasErrorProperty(name){
    console.log(name);
    return name.hasOwnProperty('error');
}

exports.hasValidProperty = hasValidProperty;
exports.hasStatusProperty = hasStatusProperty;
exports.hasErrorProperty = hasErrorProperty;