import logo from '../asset/msa_logo_jpg.png'
import API from './API'
import CookieAndSession from './CookieAndSession'

class LocalHelper{


    Hostname_Server (){
        var api = new API()
        return api.Host_name()
    }

    Hostname_Website (){
       // return 'http://localhost:3000'
        return 'https://msa-server-db.web.app'
    }

    Token(){
        const cookieAndSession = new CookieAndSession()
        const file_login = cookieAndSession.Cookie_Get_As_Object('login')
        var token = file_login.data_server.token;
        return token
    }

    Logo_MSA(){
        return logo
    }

    AM_PM(hh){
        if(hh < 13){
            return ' AM'
        }else{
            return " PM"
        }
    }

}

export default LocalHelper