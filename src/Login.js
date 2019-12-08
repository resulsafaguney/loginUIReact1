import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props){
        //component çağırıldığında ilk olarak constructerina girer ve özellikleini nereden alacağını belirler
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl= React.createRef();
        this.login = this.login.bind(this);
        this.singup = this.singup.bind(this);
    }
    login = event =>{
        event.preventDefault();

        //inputtan değerini alırsın
        const username=this.usernameEl.current.value; 
        const password=this.passwordEl.current.value; 

        //inputlarını doluluğunu kontrol edersin
        if(username === "" || password === "" ){
            document.getElementById("durum").innerHTML = "Kullanıcı adı veya şifre Boş Geçilemez";
            return;
        }
        //istek atılacak restfull services url si tanımlanır
        var uri=`http://localhost:6139/api/Customer?customerId=${username}&Password=${password}`

        //restfull services 'e GET isteği atar
        var response= fetch(uri,{method:'GET',body:null,headers:{'Content-Type':'Application/json'}}).then(processResponse)
        .then(res => {
        const { statusCode, data } = res;
        document.getElementById("durum").innerHTML = data.Message;
        }) .catch(error => {
        document.getElementById("durum").innerHTML = "Network Error";
        return { name: "network error", description: "" };
        });;
    
        //yukarıda then bloğunda çağırılacaktır ve geri dönen statuscode ve message'i almaya yarar
        function processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
              statusCode: res[0],
              data: res[1]
            }));
          }
        };

    singup = event =>{

        event.preventDefault();
        
        //inputtan değerini alırsın
        const username=this.usernameEl.current.value;
        const password=this.passwordEl.current.value;

        
        //inputlarını doluluğunu kontrol edersin
        if(username === "" || password === "" ){
            document.getElementById("durum").innerHTML = "Kullanıcı adı veya şifre Boş Geçilemez";
            return;
        }

        //istek atılacak restfull services url si tanımlanır
        var uri=`http://localhost:6139/api/Customer`

        //istekte gönderilecek body i tanımlarsın
        var body=`{"customerId":"${username}","Password":"${password}"}`

        //restfull services 'e POST isteği atar
        var response= fetch(uri,{method:'POST',body:body,headers:{'Content-Type':'Application/json'}}).then(processResponse)
            .then(res => {
            const { statusCode, data } = res;
            document.getElementById("durum").innerHTML = data.Message;
            }) .catch(error => {
            document.getElementById("durum").innerHTML = "Network Error";
            return { name: "network error", description: "" };
        });
    
        
        //yukarıda then bloğunda çağırılacaktır ve geri dönen statuscode ve message'i almaya yarar
        function processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
              statusCode: res[0],
              data: res[1]
            }));
        }
    };

    render() {
        return (
            <div class="login" id="form">
                <h1>Login</h1>
                <form method="post" id="form" >
                    <input type="text" name="u" placeholder="Username" required="required" ref={this.usernameEl}/>
                    <input type="password" name="p" placeholder="Password" required="required" ref={this.passwordEl}/>
                    <button type="submit" class="btn btn-primary btn-block btn-large" id="login" onClick={this.login}>Login</button>
                    <a id="durum"></a>
                    <hr></hr>
                    <button type="submit" class="btn btn-primary btn-block btn-large" id="singup"  onClick={this.singup}>SingUp</button>
                </form>
            </div>
        );
    }
}
export default Login;