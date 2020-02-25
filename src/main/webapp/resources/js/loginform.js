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

        const xhr = new XMLHttpRequest();

        xhr.open('post', 'login');

        xhr.onreadystatechange = function(){
            let {readyState, status, responseText} = xhr;
            if(readyState === xhr.DONE){
                if(status === 200){
                    if(responseText){
                        location.reload();
                    }
                }
            }
        };

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

    });


};

