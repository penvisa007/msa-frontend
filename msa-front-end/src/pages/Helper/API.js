
class API{

    Host_name(){

        return "https://us-central1-msa-server-db.cloudfunctions.net"
    }

    URL_User(){
        return this.Host_name() + "/api/v1/user"
    }

    URL_Event(){

        return this.Host_name() + "/api/v1/event"
    }

    URL_UpComing(){
        return this.Host_name() + "/api/v1/event-type/upcoming"
    }

    URL_Registration_url(){
         return this.Host_name() + "/api/v1/url-and-link"
    }

    URL_Guest_Receiving(){
        return this.Host_name() + '/api/v1/guest'
    }


    URL_login(){
        return this.Host_name() + "/api/v1/login"
    }

    URL_Event_Guest(){
        return this.Host_name() + "/api/v1/event/guest-registered"
    }


    URL_Event_Link_QR(){
        return this.Host_name() + "/api/event/url_link/by-event-id"
    }
    
    URL_QR_Scanner(){
        return this.Host_name() + "/api/v1/camera-authorization"
    }


    
}

export default API 