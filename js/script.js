window.addEventListener('DOMContentLoaded', () => {
    scrollTo({
        triggerSel: '.arrow_down'
    });
    scrollTo({
        triggerSel: '.menu_list li:nth-child(1) a'
    });
    scrollTo({
        triggerSel: '.menu_list li:nth-child(2) a'
    });
    scrollTo({
        triggerSel: '.menu_list li:nth-child(3) a'
    });
    scrollTo({
        triggerSel: '.menu_list li:nth-child(4) a'
    });
    ibg();
    isThisPhone();
    scrollUpArrow('.up_arrow');


    function scrollUpArrow(triggerSel) {
        let trigger = document.querySelector(triggerSel);
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 300) {
                trigger.classList.add('active');
            } else {
                trigger.classList.remove('active');
            }
        });
        scrollTo({
            triggerSel: '.up_arrow'
        });

        /*Пометка об этом в learn.js*/
        trigger.addEventListener('mouseover', () => {
            trigger.style.transform = 'scale(1.4)';
        });
        trigger.addEventListener('mouseleave', () => {
            trigger.style.transform = 'scale(1)';
        });
        trigger.addEventListener('touchstart', () => {
            trigger.style.transform = 'scale(1.4)';
        });
        trigger.addEventListener('touchend', () => {
            setTimeout(() => {
                trigger.style.transform = 'scale(1)';
            }, 250)
        });
    }


    // FormOnSubmit
    (function () {
        onSubmit('.form');
        inputEvents();


        function onSubmit(formSel) {
            let form = document.querySelector(formSel);
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (areInputFilled('input[name=name]') && areInputFilled('input[name=email]')) {
                    console.log('форма отправлена');
                    form.reset();
                } else {
                    console.log('форма не отправлена');
                }
            });
        }

        function areInputFilled(inputSel) {
            let input = document.querySelector(inputSel);
            let canISend = false;
            if (input.value == '') {
                input.style.boxShadow = 'inset 0 2px 0 0 rgb(156, 0, 0), inset 0 40px 0 0 rgb(156, 0, 0, 0.3)';
                canISend = false;
            } else {
                canISend = true;
            }
            return canISend;
        }

        function inputEvents() {
            let items = document.querySelectorAll('.form_input');
            items.forEach(item => {
                let focus = false;
                item.addEventListener('mouseenter', () => {
                    if (!focus) {
                        item.style.boxShadow = 'inset 0 2px 0 0 black, inset 0 40px 0 0 rgba(0, 0, 0, 0.205)';
                    }
                });
                item.addEventListener('mouseleave', () => {
                    if (!focus) {
                        item.style.boxShadow = 'inset 0 2px 0 0 black';
                    }
                });
                item.addEventListener('focus', () => {
                    focus = true;
                    item.style.boxShadow = 'inset 0 2px 0 0 black, inset 0 40px 0 0 rgba(0, 0, 0, 0.644)';
                });
                item.addEventListener('blur', () => {
                    focus = false;
                    item.style.boxShadow = 'inset 0 2px 0 0 black';
                });
            })
        }
    }());



    // Filter
    (function () {
        filter('.porfolio_list li a');


        let noProducts = document.querySelector('.none_filter');
        noProducts.style.display = 'none';

        function filter(triggersSel) {
            let triggers = document.querySelectorAll(triggersSel);
            triggers[0].classList.add('active');
            triggers.forEach(item => {
                item.addEventListener('click', (e) => {
                    console.log(e.target);
                    triggers.forEach(item => item.classList.remove('active'));
                    e.target.classList.add('active');
                    e.preventDefault();
                    hideFilterProduct('.portfolio_bot_col');
                    setTimeout(() => {
                        showFilterProduct(e.target.textContent);
                    }, 400)
                });
            });
        }

        function hideFilterProduct(allProductsSel) {
            let products = document.querySelectorAll(allProductsSel);
            products.forEach(item => {
                item.classList.remove('showElem');
                noProducts.classList.remove('showElem');
                noProducts.classList.add('hideElem');

                item.classList.add('hideElem');
                setTimeout(() => {
                    item.style.display = 'none';
                    noProducts.style.display = 'none';
                }, 400)
            });
        }

        function showFilterProduct(productSel) {
            let products = document.querySelectorAll(`.${productSel}`);
            if (products.length > 0) {
                products.forEach(item => {
                    item.classList.remove('hideElem');
                    item.classList.add('showElem');
                    item.style.display = 'block';
                });
            } else {
                noProducts.classList.remove('hideElem');
                noProducts.classList.add('showElem');
                noProducts.style.display = 'block';
            }
        }
    }())



    function scrollTo({
        triggerSel,
        speed = 8,
        multiplySpeed = .095
    }) {
        let trigger = document.querySelector(triggerSel);
        trigger.addEventListener('click', (e) => {
            let targetScrollTo = document.querySelector(trigger.hash);
            e.preventDefault();
            let targetOffset = targetScrollTo.offsetTop;

            let speedMulti = 0;
            let timer = setInterval(() => {
                if (targetOffset > document.documentElement.scrollTop) {
                    document.documentElement.scrollTop += speed + speedMulti;
                    if (document.documentElement.scrollTop >= targetOffset ||
                        document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
                        clearInterval(timer);

                    }
                } else {
                    document.documentElement.scrollTop -= speed + speedMulti;
                    if (document.documentElement.scrollTop <= targetOffset) {
                        clearInterval(timer);
                    }
                }
                speedMulti += multiplySpeed;
            }, 1)
        });
    }



    function isThisPhone() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            inputOnMobile();
        }

        function inputOnMobile() {
            let inputs = document.querySelectorAll('.form_input');
            inputs.forEach(item => {
                item.style.boxShadow = 'inset 0 2px 0 0 black, inset 0 40px 0 0 rgba(0, 0, 0, 0.205)';
                item.addEventListener('focus', () => {
                    item.style.boxShadow = 'inset 0 2px 0 0 black, inset 0 40px 0 0 rgba(0, 0, 0, 0.644)';
                });
                item.addEventListener('blur', () => {
                    item.style.boxShadow = 'inset 0 2px 0 0 black, inset 0 40px 0 0 rgba(0, 0, 0, 0.205)';
                });
            });
        }
    }



    function ibg() {
        let ibg = document.querySelectorAll('.ibg');
        for (let i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img')) {
                ibg[i].style.backgroundImage = `url(${ibg[i].querySelector('img').getAttribute('src')})`;
            }
        }
    }
});