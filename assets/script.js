// get data
const X = (data) => { window.data = data.data; }

// set logic to create products' structure
const products = (data) => {
    const $divRef = document.createElement('div');
    $divRef.classList.add('product-box');	

    const $link = document.createElement('a');
    $link.setAttribute('href', 'https://' + data.detailUrl);
    $divRef.appendChild($link);
        
    const $divImg = document.createElement('div');
    $divImg.classList.add('product-img');
    $link.appendChild($divImg);
        
    const $img = document.createElement('img');
    $img.src = 'https://' + data.imageName;
    $divImg.appendChild($img);

    const $divTitle = document.createElement('div');
    $divTitle.textContent = data.name.length > 80 ? data.name.substring(0, 80) + '...' : data.name
    $link.appendChild($divTitle);

    if (data.oldPrice > data.price) {
        const $divOldPrice = document.createElement('div');
        $divOldPrice.textContent = data.oldPrice;
        $divOldPrice.classList.add('old-price');
        $link.appendChild($divOldPrice);
    }

    const $divNewPrice = document.createElement('div');
    $divNewPrice.textContent = data.price;
    $divNewPrice.classList.add('new-price', 'font-red');
    $divNewPrice.style.fontWeight = 800;
    $link.appendChild($divNewPrice);
        
    const $divPayment = document.createElement('div');
    $divPayment.innerHTML = data.productInfo.paymentConditions + "<br/><span>sem juros</span>";
        
    const $divInfo = document.createElement('div');
    $divInfo.appendChild($divPayment);
    $divInfo.classList.add('font-red');
    $link.appendChild($divInfo);

    return $divRef;
}

// set logic to recommendations
const productsRecommendations = (data) => {
    const $divRecommendations = document.createElement('div');
    let index = 0;
    while (data[index]) {
        $divRecommendations.appendChild(products(data[index]));
        index+=1;
    }
    return $divRecommendations;
}

// set logic to change the slides
const slide = (slider, pos) => {
    const $products = slider.getElementsByTagName('div')[0].getElementsByClassName('product-box');
    let index = 0;
    while ($products[index]) {
        let className = $products[index].className;
        className = removeClass(className, 'p1 p2 p3 p4 p5 right left');
        if (index < pos ) {
            className += ' left';
        } else if (index === pos) {
            className += ' p1';
        } else if(index === pos+1) {
            className += ' p2';
        } else if (index === pos+2) {
            className += ' p3';
        } else if (index === pos+3) {
            className += ' p4';
        } else if (index > pos+3) {
            className += ' right';
        }
        $products[index].className = className;
        index+=1;
    }	
    return $products;
}

// logic to change slides
const removeClass = (className, remove) => {
    const list = remove.split(' ');
    const classArray = className.split(' ');
    const clearClass = [];
    let index = 0;
    while (classArray[index]) {
        if (list.indexOf(classArray[index]) === -1 ) clearClass.push(classArray[index]);
        index+=1;
    }
    return clearClass;
}

window.addEventListener('load', function() {
    try {
        document.getElementById('reference').appendChild(products(window.data.reference.item));
        window.positionSlider = 0;
        const recommendations = document.getElementById('recommendations');
        recommendations.appendChild(productsRecommendations(window.data.recommendation));
        window.products = slide(recommendations, window.positionSlider);
    } catch(e) {
        console.log(e);
    }
    
	document.getElementsByClassName('arrow-left')[0].addEventListener('click',function() {
		if (window.positionSlider <= 0) return false;
		window.positionSlider-=1;
		slide(recommendations, window.positionSlider);
	});

	document.getElementsByClassName('arrow-right')[0].addEventListener('click',function() {
		if (window.positionSlider >= window.products.length - 4) return false;
		window.positionSlider+=1;
		slide(recommendations, window.positionSlider);
	});
});
