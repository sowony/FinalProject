/**
 * http://usejsdoc.org/
 */

window.onload = () => {

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e)=>{

        e.preventDefault();

        const mid = e.target.mid.value;
        const mpw = e.target.mpw.value;

        const data = { mid, mpw };

        xhrLoad('post','login','login',data);

    });


};

