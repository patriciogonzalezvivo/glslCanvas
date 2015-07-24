export function isCanvasVisible(_canvas){
	return	((_canvas.getBoundingClientRect().top + _canvas.height) > 0) && 
			(_canvas.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight));
};

export function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
};

export function nextHighestPowerOfTwo(x) {
    --x;
    for (var i = 1; i < 32; i <<= 1) {
        x = x | x >> i;
    }
    return x + 1;
};

/*
 *	Fetch for files
 */
export function fetchHTTP(url, methood){
	var request = new XMLHttpRequest(), response;

	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			response = request.responseText;
		}
	}
	request.open(methood ? methood : 'GET', url, false);
	request.overrideMimeType("text/plain");
	request.send();
	return response;
}

export function FormatNumberLength(_num, _length) {
    var r = "" + _num;
    while (r.length < _length) {
        r = "0" + r;
    }
    return r;
}

export function getMousePos(_canvas, _evt) {
	var rect = _canvas.getBoundingClientRect();
	return {
		x: _evt.clientX - rect.left,
		y: _evt.clientY - rect.top
	};
}

export function isDiff(a, b) {
	if (a && b) {
		return a.toString() !== b.toString();
	}
    return false;
}