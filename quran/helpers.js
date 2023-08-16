function display(page) {
    document.querySelector('#main-page').style.display = 'none';
    document.querySelector('#student-page').style.display = 'none';

    document.querySelector(`#${page}-page`).style.display = 'block';
}

export {display};